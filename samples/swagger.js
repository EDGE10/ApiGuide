/*global require:false*/

(function(require) {
	var client = require('swagger-client');
	var config = require('./sample-config');

	client.authorizations.add('apiKey', new client.ApiKeyAuthorization('api_key', config.apiKey, 'query'));

	new client.SwaggerClient({
		url: config.siteUrl + '/swagger/docs/v1',
		success: function() {

			//send API information to the log
			this.apis.Entity.help();

			//make an API call
			console.log('\nRunning test for Entity.get...');
			this.Entity.get({}, function(response) {
				var entities = response.obj;
				console.log('Found ' + entities.length + ' entities');
			});
		}
	});

}(require));