module.exports = {
	default: [
		'access', 'appendFile', 'chmod', 'chown', 'close', 'copyFile', 
		'fchmod', 'fchown', 'fdatasync', 'fstat', 'fsync', 
		'ftruncate', 'futimes', 'lchmod', 'lchown', 'link', 'lstat', 
		'mkdir', 'mkdtemp', 'open', 'read', 'readdir', 'readFile', 
		'readlink', 'realpath', 'rename', 'rmdir', 'stat', 'symlink', 
		'truncate', 'unlink', 'utimes', 'write', 'writeFile'
	],
	custom: {
		exists: function(func, ...args) {
			return (resolve, reject) => {
				args.push((x) => {
					if (!x) reject();
					else resolve();
				});
				func.apply(this, args);
			};
		}
	}
};