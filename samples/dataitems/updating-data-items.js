/*global require:false*/

/**
* Refer to http://testenvironment.edge10hosted.com/swagger/ui/index#/Attribute/save
*/
(function(require) {
  var request = require('../edge10-request');

  /**
   * Updates the data item with the specified ID based on the new definition.
   */
  function updateDataItem(dataItemId) {
    return request({
      method: 'PUT',
      url: '/api/attribute' + dataItemId,
      body: {
        id: '[data item id]',
        name: 'Updated name',
        description: 'Updated description'
      }
    });
  }

  updateDataItem('[data item id]')
  .then(function(dataItem) {
    console.log(`Updated successfully ${dataItem.id}`);
    return dataItem;
  });
}(require));