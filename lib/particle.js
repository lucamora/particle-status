const phin = require('phin').unpromisified;

class Particle {
	constructor(list) {
		this.monitoring = [];

		if (list && Array.isArray(list)) {
			this.monitoring = list;
		}
	}

	monitor(list) {
		this.monitoring = list;
	}

	status(cb) {
		phin({
			url: 'https://status.particle.io/index.json',
			parse: 'json',
			timeout: 4000
		}, (err, res) => {
			if (err) {
				return cb((err instanceof Error) ? err : new Error(err));
			}

			// check status code and response error
			if (res.statusCode != 200 || res['body']['error']) {
				let e = new Error('Response error with status ' + res['statusCode']);
				e.body = res['body'];
				return cb(e);
			}

			let status = {
				operational: true,
				components: {
					operational: [],
					outage: [],
					minor: []
				}
			};

			for (let i = 0; i < res['body']['components'].length; i++) {
				if (this.monitoring.includes(i)) {
					let component = res['body']['components'][i];

					let operational = component['status'] != 'outage';

					if (!operational) {
						status['operational'] = false;
					}

					let list = 'outage';
					if (component['status'] == 'operational') {
						list = 'operational';
					}
					else if (component['status'] == 'degraded_performance') {
						list = 'minor';
					}

					status['components'][list].push({
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