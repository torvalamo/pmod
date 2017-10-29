const util = require('util');

module.exports = new Proxy({}, {
	get: (cache, module) => {
		if (!(module in cache)) {
			let original    = require(module);
			let promisified = Object.assign(Object.create(null), original);
			try {
				let methods  = require(`./lib/${module}`);
				handleModule(original, promisified, methods);
			} catch (e) {
				return original;
			}
			
			cache[module] = promisified;
		}
		return cache[module];
	}
});

function handleModule(original, promisified, methods) {
	// All the standardly promisifyable module methods
	methods.default && methods.default.forEach(name => {
		let orig = original[name];
		promisified[name] = promiseNoCallback(orig, defaultExecutor);
	});

	// Methods that report errors (only?) in events
	methods.event && methods.event.forEach(name => {
		let orig = original[name];
		promisified[name] = promiseNoCallback(orig, eventErrorExecutor);
	});
	
	// Methods that always resolve
	methods.resolve && methods.resolve.forEach(name => {
		let orig = original[name];
		promisified[name] = promiseNoCallback(orig, alwaysResolveExecutor);
	});

	// Methods that have different argument order or values
	// These require a custom executorFactory (see fs.exists)
	for (name in methods.custom) {
		let orig = original[name];
		promisified[name] = promiseNoCallback(orig, methods.custom[name]);
	}
	
	// Classes, may have several levels, therefore recursive
	for (c in methods.classes) {
		handleModule(original[c].prototype, 
					 promisified[c].prototype, 
					 methods.classes[c]);
	}
}

function promiseNoCallback(func, executorFactory) {
	return function() {
		if (typeof arguments[arguments.length - 1] == 'function') {
			return func.apply(this, arguments);
		}
		return new Promise(executorFactory.call(this, func, ...arguments));
	};
}

function defaultExecutor(func, ...args) {
	return (resolve, reject) => {
		args.push((err, ...args2) => {
			if (err) reject(err);
			else resolve(...args2);
		});
		func.apply(this, args);
	};
}

function eventErrorExecutor(func, ...args) {
	return (resolve, reject) => {
		args.push((err, ...args2) => {
			if (err) reject(err);
			else resolve(...args2);
		});
		func.apply(this, args).on('error', reject);
	};
}

function alwaysResolveExecutor(func, ...args) {
	return resolve => {
		args.push(resolve);
		func.apply(this, args);
	};
}