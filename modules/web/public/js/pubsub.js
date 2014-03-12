/*
	Lightweight PUBLISH / SUBSCRIBE Class
	
	Original code from: <http://blog.bobcravens.com/2011/01/loosely-coupled-javascript-using-pubsub/>
	
	Can be initialized on other Objects to provide pub/sub functionality within that object
	
	ex: this.events = new PubSub();
*/
 
var PubSub = function(){
    this.init();
}
 
PubSub.prototype = {
 
	constructor: PubSub,
	
	init: function(){
		this.cache = {};
	},
	
	publish: function(/* String */topic, /* Array? */args){
	    
	    if(this.cache[topic] === undefined) return;
	    
	    try{
	        $.each(this.cache[topic], function(){
	            this.apply($, args || []);
	        });
	    } catch (err) {
	        // handle this error
	        console.log(err);
	    }
	},
	
	subscribe: function(/* String */topic, /* Function */callback){
	    if(!this.cache[topic]){
	        this.cache[topic] = [];
	    }
	    this.cache[topic].push(callback);
	    return [topic, callback]; // Array
	},
	
	unsubscribe: function(/* Array */handle){
	    var t = handle[0], cache = this.cache;
	    cache[t] && $.each(cache[t], function(idx){
	        if(this == handle[1]){
	            cache[t].splice(idx, 1);
	        }
	    });
	}
	
};