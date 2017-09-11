/*global require:false*/

(function(require) {
  var request = require('../edge10-request');

  /**
   * Updates the user with the specified ID based on the new definition.
   */
  function updateUserById(entityId) {
    return request({
      method: 'PUT',
      url: '/api/entity/user/' + entityId,
      body: {
        firstName: 'Updated First Name',
        lastName: 'Updated Last Name',
        emailAddress: 'email.test@email.com',
        mobileNumber: '0123456789',
        username: 'username',
        profile: {}
      }
    });
  }

  updateUserById('[user id]')
    .then(function() {
      console.log('Updated successfully');
    });
}(require));