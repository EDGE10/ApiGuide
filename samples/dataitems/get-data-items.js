/*global require:false*/

(function(require) {
  var request = require('../edge10-request');

  /**
   * Gets all visible data items in the system
   */
  function getAllDataItems() {
    return request({
      url: '/api/attribute'
    });
  }

  /**
   * Gets a specific data item based on it's name or ID
   * @param nameOrId The name or ID of the data item
   */
  function getDataItemByNameOrId(nameOrId) {
    return request({
      url: '/api/attribute/' + nameOrId
    });
  }

  getAllDataItems()
    .then(function(dataItems) {
      dataItems
        .map(function(d) { return d.name; })
        .forEach(function(name) { console.log(name); })
    });

  getDataItemByNameOrId('data item name')
    .then(function(dataItem) {
      console.log(dataItem);
    });
}(require));