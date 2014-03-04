//require('./node_modules/node-libnmap').nmap();

console.log(require('./node_modules/node-libnmap').nmap());

require('./node_modules/node-libnmap').nmap('discover', {
	nmap: '/usr/local/bin/nmap',
	range: ['localhost'],
    ports: '1-1024',
  callback: function(err, report){
    if (err) throw err
    console.log(report)
  }
})