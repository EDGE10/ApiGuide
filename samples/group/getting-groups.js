/*global require:false*/

(function(require) {
  var request = require('../edge10-request');

  /**
   * Gets all groups that are visibile to the authenticated in the system
   */
  function getAllGroups() {
    return request({
      url: '/api/entity/group'
    });
  }

  getAllGroups()
    .then(function(groups) {
      groups
        .map(function(e) { return { name = e.name, description = e.descripton } })
        .forEach(function(group) { console.log(name + ' ' + description); })
    });
}(require));