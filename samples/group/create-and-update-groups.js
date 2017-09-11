/*global require:false*/

(function(require) {
  var request = require('.../edge10-request');

  function createGroup() {
    return request({
      method: 'POST',
      url: '/api/entity/group',
      body: {
        id: '[group Id]',
        name: 'string',
        description: 'string',
        singleAssignments: true,
        subjects: [
          {
            contactType: 'User',
            dateOfBirth: '2017-09-11T10:38:38.239Z',
            title: 'string',
            gender: 'string',
            profession: 'string',
            groupIds: [
              '[group Ids]'
            ],
            address: 'string',
            city: 'string',
            region: 'string',
            postcode: 'string',
            country: 'string',
            id: 'string',
            firstName: 'string',
            lastName: 'string',
            emailAddress: 'string',
            mobileNumber: 'string',
            username: 'string',
            profile: {}
          }
        ],
        users: [
          {
            contactType: 'Unknown',
            accessLevel: 'Standard',
            id: '[user`s ID]',
            firstName: 'string',
            lastName: 'string',
            emailAddress: 'string',
            mobileNumber: 'string',
            username: 'string',
            profile: {}
          }
        ],
        permissionLevel: 'None'
      }
    });
  }

  function getGroup(groupId) {
    return require({
      url: '/api/entity/group/' + groupId
    });
  }

  function updateGroupById(groupId) {
    return request({
      method: 'PUT',
      url: '/api/entity/group/' + groupId,
      body: {
        name: 'Updated Name',
        description: 'Updated Description'
      }
    });
  }

  createGroup()
    .then(function(group) {
      return getGroup(group.id);
    })
    .then(function(group) {
      return updateGroupById(group.id);
    })
    .then(function(groupData) {
      console.log('Retrieved group: ');
      console.log(groupData);
    });

}(require));