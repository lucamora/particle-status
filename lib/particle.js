const phin = require('phin');

class Particle {
	constructor() {
		this.monitoring = [];

		this.COMMUNITY = 0;
		this.WEBSITE = 1;
		this.BUILD = 2;
		this.CONSOLE = 3;
		this.API = 4;
		this.DOCS = 5;
		this.LOGIN = 6;
		this.DEVICE_SERVICE = 7;
		this.COMPILE_SERVICE = 8;
		this.MOBILE_CARRIERS = 9;
		this.WEBHOOKS = 10;
		this.STORE = 11;
	}

	monitor(list) {
		this.monitoring = list;
	}

	status(cb) {
		phin({
			url: 'https://status.particle.io/index.json',
			parse: 'json'
		}, (err, res) => {
			if (err) {
				return cb(err);
			}

			let status = {
				operational: true,
				components: {
					operational: [],
					outage: []
				}
			};

			for (let i = 0; i < res['body']['components'].length; i++) {
				if (this.monitoring.includes(i)) {
					let component = res['body']['components'][i];

					let operational = component['status'] == 'operational';

					if (!operational) {
						status['operational'] = false;
					}

					status['components'][operational ? 'operational' : 'outage'].push({
						status: component['status'],
						name: component['name'],
					});
				}
			}

			cb(null, status);
		});
	}
}

module.exports = Particle;