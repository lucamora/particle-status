const expect = require('chai').expect;
const nock = require('nock');
const particle = require('../index');

describe('zeus client tests', function () {
	before(function () {
		nock('https://status.particle.io')
			.get('/index.json')
			.replyWithFile(200,
				__dirname + '/replies/fully-operational.json',
				{ 'Content-Type': 'application/json' }
			);
	});

	it('fully operational', function (done) {
		particle.monitor([2, 6, 7]);

		particle.status(function (err, status) {
			expect(err).to.equal(null);
			expect(status).to.deep.equal(require('./statuses/fully-operational.json'));

			done();
		});
	});


	before(function () {
		nock('https://status.particle.io')
			.get('/index.json')
			.replyWithFile(200,
				__dirname + '/replies/ignored-outage.json',
				{ 'Content-Type': 'application/json' }
			);
	});

	it('ignored outage', function (done) {
		particle.monitor([2, 3, 4]);

		particle.status(function (err, status) {
			expect(err).to.equal(null);
			expect(status).to.deep.equal(require('./statuses/ignored-outage.json'));
			done();
		});
	});


	before(function () {
		nock('https://status.particle.io')
			.get('/index.json')
			.replyWithFile(200,
				__dirname + '/replies/monitored-outage.json',
				{ 'Content-Type': 'application/json' }
			);
	});

	it('monitored outage', function (done) {
		particle.monitor([2, 6, 7]);

		particle.status(function (err, status) {
			expect(err).to.equal(null);
			expect(status).to.deep.equal(require('./statuses/monitored-outage.json'));
			done();
		});
	});
});