module.exports = {
	event: [ 'get' ],
	classes: {
		Agent: {
			default: [ 'createConnection' ]
		},
		ClientRequest: {
			resolve: [ 'end', 'write' ]
		},
		Server: {
			default: [ 'close' ]
		},
		ServerResponse: {
			default: [ 'write' ],
			resolve: [ 'end' ]
		}
	}
};