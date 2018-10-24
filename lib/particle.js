const phin = require('phin');

class Particle {
	constructor() {
		this.monitoring = [];
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