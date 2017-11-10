/*global require:false*/

/**
* Refer to http://testenvironment.edge10hosted.com/swagger/ui/index#/Entity/saveUser
*/
((require) => {
	const request = require('../edge10-request');

	/**
	* Updates the user with the specified ID based on the new definition.
	*/
	const updateUserById = (entityId) => {
		return request({
			method: 'PUT',
			url: `/api/entity/user/${entityId}`,
			body: {
				firstName: 'Updated First Name',
				lastName: 'Updated Last Name',
				emailAddress: 'email.test@email.com',
				mobileNumber: '0123456789',
				username: 'username',
				profile: {}
			}
		});
	};

	updateUserById('[user id]')
		.then(() => {
			console.log('Updated successfully');
		});
})(require);