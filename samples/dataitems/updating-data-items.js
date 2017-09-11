/*global require:false*/

(function(require) {
  var request = require('../edge10-request');

  /**
   * Updates the data item with the specified ID based on the new definition.
   */
  function updateDataItem(dataItemId, newDefinition) {
    return request({
      method: 'PUT',
      url: '/api/attribute' + dataItemId,
      body: newDefinition
    });
  }

  updateDataItem('[data item id]', {
    id: '[data item id]',
    name: 'Updated name',
    description: 'Updated description'
  })
  .then(function() {
    console.log('Updated successfully');
  });
}(require));