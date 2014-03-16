define(['node_stack_selector'], function( NodeStackSelector )
{	

	NodeStackEvent.status = {
		OK: 'ok',
		ERROR: 'error'
	}

	function NodeStackEvent()
	{

		/**
		 * Status of the event
		 * @type {CONST}
		 */
		this.status = NodeStackEvent.status.OK;

		/**
		 * Actual data of the event
		 * This can for example be a measurement of a sensor
		 * @type {mixed}
		 */
		this.data = null;

		/**
		 * Destination selector
		 * This can be used if the event only needs to be handled by a specific node or group
		 * @type {NodeStackSelector}
		 */
		this.destination = new NodeStackSelector();

		/**
		 * The actual event topic that was fired with the this as event object
		 * This is usefull if you want to subscribe to multiple events with one callback fuction
		 * this way you can do a switch case using NodeStackEvent.topic
		 * @type {string}
		 */
		this.topic = null;
	}

	/**
	 * Construct current object with a JSON string
	 * @param  {string} json 
	 * @return {void}      
	 */
	NodeStackEvent.prototype.fromJSON = function( json ) {

	}

	/**
	 * The reason we don't just use the JSON stringify to do this
	 * is so that we can do some minification on the object
	 * For example we shorten the key names
	 * @return {string}
	 */
	NodeStackEvent.prototype.toJSON = function() {

	}


	NodeStackEvent.prototype.isOK = function() {
		return (this.status === NodeStackEvent.status.OK) ? true : false;
	}

	NodeStackEvent.prototype.isError = function() {
		return (this.status === NodeStackEvent.status.ERROR) ? true : false;
	}

	return NodeStackEvent;
});