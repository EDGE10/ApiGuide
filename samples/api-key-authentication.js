/*global require:false*/

((require) => {
	const request = require('request-promise');
	const Promise = require('es6-promise').Promise;
	const config = require('./sample-config.js');

	/**
	* Request an API key from the server
	* @param username The user for which to request an API key
	* @param password The password for the user
	* @returns {Promise}
	*/
	const getApiKey = (username, password) => {
		console.log('Requesting API key');
		return request({
			method: 'POST',
			url: `${config.siteUrl}/api/auth?name=ApiSamples&lifetime=00:01:00`,
			auth: {
				user: username,
				pass: password
			},
			json: true
		});
	}

	/**
	* For the demo, this const just logs the retrieved key to the console
	* @param apiKey
	* @returns {Promise}
	*/
	const storeApiKey = (apiKey) => {
		//this const should store the requested ApiKey somewhere
		//for later use

		//this example is just going to log it to the console
		console.log(`Received key:${apiKey}`);

		return Promise.resolve(apiKey);
	}

	/**
	* For the demo, this const makes an example API call to get a list
	* of all visible entities
	* @param apiKey
	* @returns {Promise}
	*/
	const useApiKey = (apiKey) => {
		//now you can use the ApiKey to make a request

		return request({
			method: 'GET',
			url: `${config.siteUrl}/api/entity`,
			headers: {
				'X-ApiKey': apiKey
			},
			json: true
		});
	}

	getApiKey(config.username, config.password)
		.then(storeApiKey)
		.then(useApiKey)
		.then((entities) => {
			console.log('Found ' + entities.length + ' entities');
		});
})(require);