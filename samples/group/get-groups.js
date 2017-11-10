/*global require:false*/

/**
* Refer to http://testenvironment.edge10hosted.com/swagger/ui/index#!/Entity/getGroups
*/
((require) => {
	const request = require('../edge10-request');

	/**
	* Gets all groups that are visible to the authenticated in the system
	*/
	const getAllGroups = () => {
		return request({
			url: '/api/entity/group'
		});
	}

	getAllGroups()
		.then((groups) => {
			groups
				.map((e) => { name = e.name, description = e.descripton; })
				.forEach((group) => { console.log(`${name} ${description}`); });
		});
})(require);