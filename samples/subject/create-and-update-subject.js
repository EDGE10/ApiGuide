/*global require:false*/

(function(require) {
  var request = require('../edge10-request');

  function createSubject() {
    return request({
      method: 'POST',
      url: '/api/entity/subject',
      body: {
        id: '[subject id]',
        contactType: '1',
        firstName: 'string',
        lastName: 'string',
        emailAddress: 'string',
        mobileNumber: 'string',
        username: 'string',
        profile: {}
      }
    });
  }

  function getSubject(subjectId) {
    return require({
      url: '/api/entity/subject/' + subjectId
    });
  }

  function updateSubjectById(subjectId) {
    return request({
      method: 'PUT',
      url: '/api/entity/subject/' + subjectId,
      body: {
        firstName: 'Updated First Name',
        lastName: 'Updated Last Name'
      }
    });
  }

  createSubject()
    .then(function(subject) {
      return getSubject(subject.id);
    })
    .then(function(subject) {
      return updateSubjectById(subject.id);
    })
    .then(function(subjectData) {
      console.log('Retrieved subject: ');
      console.log(subjectData);
    });

}(require));