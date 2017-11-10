/*global require:false*/

/**
* Refer to http://testenvironment.edge10hosted.com/swagger/ui/index#/Entity
*/
((require) => {
	const request = require('.../edge10-request');
	
	/**
	* Gets a group with the specified Id
	*/
	const getGroup = (groupId) => {
		return require({
			url: `/api/entity/group/${groupId}`
		});
	};

	getGroup('[group id]')
		.then((group) => {
			Console.log(`Retrieved group: ${group.groupId}`);
			return group;
		});
})(require);