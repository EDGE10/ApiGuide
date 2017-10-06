/*global require:false*/

/**
* Refer to http://testenvironment.edge10hosted.com/swagger/ui/index#/Entity
*/
(function(require) {
	var request = require('.../edge10-request');
	
	/**
   * Gets a group with the specified Id
   */
	function getGroup(groupId) {
			return require({
				url: '/api/entity/group/' + groupId
			});
		}

	getGroup('[group id]')
		.then(function(group){
				Console.log(`Retrieved group: ${group.groupId}`);
				return group;
		});
}(require));