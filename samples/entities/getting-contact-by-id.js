/*global require:false*/

(function(require) {
  var request = require('../edge10-request');

  /**
   * Gets a contact by a specific Id
   */
  function getContactById(contactId) {
    return request({
      url: '/api/entity/contact/' + contactId
    });
  }

  getContactById('contact Id')
    .then(function(contact) {
      console.log(contact.id + ' ' + firstName);
    });
}(require));