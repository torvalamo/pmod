module.exports = {
	classes: {
		Http2Session: {
			resolve: [ 'shutdown' ]
		},
		ServerHttp2Stream: {
			resolve: [ 'pushStream' ]
		},
		Http2ServerResponse: {
			default: [ 'write' ],
			resolve: [ 'end', 'createPushResponse' ]
		}
	}
};