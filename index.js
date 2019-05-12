const Particle = require('./lib/particle');

module.exports = function (list) {
	return new Particle(list);
};

// define constants
module.exports.COMMUNITY = 0;
module.exports.WEBSITE = 1;
module.exports.BUILD = 2;
module.exports.CONSOLE = 3;
module.exports.API = 4;
module.exports.DOCS = 5;
module.exports.LOGIN = 6;
module.exports.DEVICE_SERVICE = 7;
module.exports.COMPILE_SERVICE = 8;
module.exports.MOBILE_CARRIERS = 9;
module.exports.WEBHOOKS = 10;
module.exports.STORE = 11;