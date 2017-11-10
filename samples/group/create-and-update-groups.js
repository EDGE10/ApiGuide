/*global require:false*/

/**
* Refer to http://testenvironment.edge10hosted.com/swagger/ui/index#/Entity
*/
((require) => {
	const request = require('.../edge10-request');

	/**
	* Creates a new group with the specified data
	*/
	const createGroup = () => {
		return request({
			method: 'POST',
			url: '/api/entity/group',
			body: {
				id: '[group Id]',
				name: 'string',
				description: 'string',
				subjects: [
					{
						contactType: 'User',
						title: 'string',
						groupIds: [
							'[group Ids]'
						],
						firstName: 'string',
						lastName: 'string'
					}
				]
			}
		});
	}

	const getGroup = (groupId) => {
		return require({
			url: `/api/entity/group/${groupId}`
		});
	}

	/**
	* Updates an existing group specified by groupId
	*/
	const updateGroupById = (groupId) => {
		return request({
			method: 'PUT',
			url: `/api/entity/group/${groupId}`,
			body: {
				name: 'Updated Name',
				description: 'Updated Description'
			}
		});
	}

	createGroup()
		.then((group) => {
			console.log(`Created group: ${group.name}`);

			updateGroupById(group.id);
			console.log(`Updated group: ${group.name}`);

			return group;
		});
})(require);