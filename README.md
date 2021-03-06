# pmod

Get your node modules with functions that return promises if you don't give them a callback.

If you request a module that is not supported, it will give you the default module instead.

These modules are currently supported: child_process, cluster, crypto, dgram,
dns, fs, http, http2, https, inspector, net, realine, stream, timers, tls, zlib

PS: Currently not all functions are tested. But should work in theory. :-D

## Install

	npm install pmod --save

## Use

	const fs = require('pmod').fs;
	
	fs.readFile('myfile', 'utf8').then(data => {
		// do stuff with data
		console.log(data);
	}).catch(err => {
		// do stuff with err
		console.log(err);
	});

The functions work as normal as well!

	const fs = require('pmod').fs;
	
	fs.readFile('myfile', 'utf8', (err, data) => {
		if (err) {
			// do stuff with err
			console.log(err);
		} else {
			// do stuff with data
			console.log(data);
		}
	});

### Module classes

Classes inside of modules have their prototype functions also modified.

This means that you can use promises in their async versions.

	const fs = require('pmod').fs;
	
	let stream = fs.createWriteStream('myfile'); // returns a fs.WriteStream object
	
	stream.write('test')
		.then(() => stream.write('next'))
		.then(() => stream.write('last'))
		.then(() => stream.end())
		.catch(err => console.log(err));

## Known issues

There may be some class methods that have been forgotten, simply due to the fact that inherited class methods aren't usually listed in the node documentation.

Please create an issue and/or a pull request on github if that is the case.