/*global require:false*/

/**
* Refer to http://testenvironment.edge10hosted.com/swagger/ui/index#/Entity
*/
(function(require) {
  var request = require('../edge10-request');

  /**
   * Creates a new subject with the specified data
   */
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

  /**
   * Updates the subject data for the subject with an Id of 'subjectId'
   */
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
      console.log('Created subject: ' + subject.name);      
      
      updateSubjectById(subject.id);
      console.log('Updated subject: ' + subject.name);
      
      return getSubject(subject.id);
    })
    .then(function(subjectData) {
      console.log('Retrieved subject: ');
      console.log(subjectData);
    });

}(require));