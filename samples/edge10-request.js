/*global require:false*/

((require, module) => {
	const request = require('request-promise');
	const Promise = require('es6-promise').Promise;
	const config = require('./sample-config');
	const _ = require('underscore');

	/**
	* Helper  that includes default settings and authentication
	* headers from the sample-config.js file.
	* @param options
	* @returns {Promise}
	*/
	const e10Request = (options) => {
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
		}, options)).then(null, (error) => {
			return Promise.reject(error.response && error.response.body && error.response.body.exceptionMessage || error.message);
		});
	};

	module.exports = e10Request;
})(require, module);