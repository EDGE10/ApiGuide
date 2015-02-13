/*global require:false*/

(function(require, module) {
	var request = require('request-promise');
	var Promise = require('es6-promise').Promise;
	var config = require('./sample-config');
	var _ = require('underscore');

	/**
	 * Helper function that includes default settings and authentication
	 * headers from the sample-config.js file.
	 * @param options
	 * @returns {Promise}
	 */
	function e10Request(options) {
		options.url = config.siteUrl + options.url;

		if (!config.apiKey) {
			console.error('Couldn`t find an API key stored in the config file.  Have you updated it?');
			return;
		}

		return request(_.extend({
			method: 'GET',
			json: true,
			headers: {
				'X-ApiKey': config.apiKey
			}
		}, options)).then(null, function(error) {
			return Promise.reject(error.response && error.response.body && error.response.body.exceptionMessage || error.message);
		});
	}

	module.exports = e10Request;
}(require, module));