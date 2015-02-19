/*global require:false*/

(function(require) {
  var request = require('./edge10-request');

  /**
   * Gets all available entities in the system
   */
  function getAllEntities() {
    return request({
      url: '/api/entity'
    });
  }

  getAllEntities()
    .then(function(entities) {
      entities
        .map(function(e) { return e.firstName + ' ' + e.lastName; })
        .forEach(function(name) { console.log(name); })
    });
}(require));