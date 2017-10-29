module.exports = {
	default: [
		'deflate', 'deflateRaw', 'gunzip', 'gzip', 
		'inflate', 'inflateRaw', 'unzip'
	],
	classes: {
		Zlib: {
			default: [ 'flush', 'params' ]
		}
	}
};