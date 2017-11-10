/*global require:false*/

/**
* Refer to http://testenvironment.edge10hosted.com/swagger/ui/index#/Entity/getAll
*/
((require) => {
	const request = require('../edge10-request');

	/**
	* Gets all available entities in the system
	*/
	const getAllEntities = () => {
		return request({
			url: '/api/entity'
		});
	};

	getAllEntities()
		.then((entities) => {
			entities
				.map((e) => { return `${e.firstName} ${e.lastName}`})
				.forEach((name) => { console.log(name); });
		});
})(require);