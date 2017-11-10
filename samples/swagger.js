/*global require:false*/

((require) => {
	const client = require('swagger-client');
	const config = require('./sample-config');

	client.authorizations.add('apiKey', new client.ApiKeyAuthorization('api_key', config.apiKey, 'query'));

	new client.SwaggerClient({
		url: config.siteUrl + '/swagger/docs/v1',
		success: () => {

			//send API information to the log
			this.apis.Entity.help();

			//make an API call
			console.log('\nRunning test for Entity.get...');
			this.Entity.get({}, (response) => {
				const entities = response.obj;
				console.log(`${entities.length} entities`);
			});
		}
	});

})(require);