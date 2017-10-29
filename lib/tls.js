module.exports = {
	classes: {
		Server: {
			default: [ 'close' ]
		},
		TLSSocket: {
			default: [ 'renegotiate', 'write' ]
		}
	}
};