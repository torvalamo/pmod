module.exports = {
	classes: {
		Writable: {
			default: [ 'end' ],
			event: [ 'write' ]
		},
		Duplex: {
			default: [ 'end' ],
			event: [ 'write' ]
		},
		Transform: {
			default: [ 'end' ],
			event: [ 'write' ]
		}
	}
};