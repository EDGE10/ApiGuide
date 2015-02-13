/*global require:false*/

(function(require) {
	var request = require('request-promise');
	var config = require('./sample-config.js');

	if (!config.apiKey) {
		console.log('Couldnt find an API key stored in the config file.  Have you updated it?');
		return;
	}

	function getAllEntities() {
		return request({
			method: 'GET',
			url: config.siteUrl + '/api/entity',
			headers: {
				'X-ApiKey': config.apiKey
			},
			json: true
		});
	}

	getAllEntities()
		.then(function(entities) {
			entities
				.map(function(e) { return e.firstName + ' ' + e.lastName; })
				.forEach(function(name) { console.log(name); })
		});
}(require));