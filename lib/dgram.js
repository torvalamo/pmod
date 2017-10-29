module.exports = {
	classes: {
		Socket: {
			default: [ 'send' ],
			event: [ 'bind' ],
			resolve: [ 'close' ]
		}
	}
};