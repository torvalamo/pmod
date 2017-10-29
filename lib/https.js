module.exports = {
	event: [ 'get' ],
	classes: {
		Agent: {
			default: [ 'createConnection' ]
		},
		Server: {
			default: [ 'close' ]
		}
	}
};