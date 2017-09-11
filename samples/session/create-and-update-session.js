/*global require:false*/

(function(require) {
  var request = require('../edge10-request');

  function createSession() {
    return request({
      method: 'POST',
      url: '/api/session',
      body: {
        sessionDetails: {
          name: 'session name',
          start: '2015-01-01T09:00',
          end: '2015-01-01T10:30',
          sessionTypeId: '[session type ID]'
        },
        contacts: [
          { contactType: 'User', contactId: '[user`s ID]' }
        ]
      }
    });
  }

  function getSession(sessionId) {
    return require({
      url: '/api/session/' + sessionId
    });
  }

  createSession()
    .then(function(session) {
      return getSession(session.sessionDetails.id);
    })
    .then(function(sessionData) {
      console.log('Retrieved session: ');
      console.log(sessionData);
    });

}(require));