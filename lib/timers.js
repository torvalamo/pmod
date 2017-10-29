module.exports = {
	custom: {
		setImmediate: timerExecutor,
		setInterval: timerExecutor,
		setTimeout: timerExecutor
	}
};

function timerExecutor(func, ...args) {
	return resolve => {
		args.unshift(resolve);
		func.apply(this, args);
	};
}