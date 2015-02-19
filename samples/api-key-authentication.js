/*global require:false*/

(function(require) {
  var request = require('request-promise');
  var Promise = require('es6-promise').Promise;
  var config = require('./sample-config.js');

  /**
   * Request an API key from the server
   * @param username The user for which to request an API key
   * @param password The password for the user
   * @returns {Promise}
   */
  function getApiKey(username, password) {
    console.log('Requesting API key');
    return request({
      method: 'POST',
      url: config.siteUrl + '/api/auth?name=ApiSamples&lifetime=00:01:00',
      auth: {
        user: username,
        pass: password
      },
      json:true
    });
  }

  /**
   * For the demo, this function just logs the retrieved key to the console
   * @param apiKey
   * @returns {Promise}
   */
  function storeApiKey(apiKey) {
    //this function should store the requested ApiKey somewhere
    //for later use

    //this example is just going to log it to the console
    console.log('Received key: ' + apiKey);

    return Promise.resolve(apiKey);
  }

  /**
   * For the demo, this function makes an example API call to get a list
   * of all visible entities
   * @param apiKey
   * @returns {Promise}
   */
  function useApiKey(apiKey) {
    //now you can use the ApiKey to make a request

    return request({
      method: 'GET',
      url: config.siteUrl + '/api/entity',
      headers: {
        'X-ApiKey': apiKey
      },
      json: true
    });
  }

  getApiKey(config.username, config.password)
    .then(storeApiKey)
    .then(useApiKey)
    .then(function(entities) {
      console.log('Found ' + entities.length + ' entities');
    });
}(require));