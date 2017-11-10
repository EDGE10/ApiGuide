/*global require:false*/

/**
* Refer to http://testenvironment.edge10hosted.com/swagger/ui/index#/Entity/getContact
*/
((require) => {
	const request = require('../edge10-request');

	/**
	* Gets a contact by a specific Id
	*/
	const getContactById = (contactId) => {
		return request({
			url: `/api/entity/contact/${contactId}`
		});
	}

	getContactById('contact Id')
		.then((contact) => {
			console.log(`Retrieved contact ${contact.id}, ${firstName}`);
			return contact;
		});
})(require);