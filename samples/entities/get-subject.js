/*global require:false*/

/**
 *  Refer to http://testenvironment.edge10hosted.com/swagger/ui/index#/Entity
 */
(function(require) {
	var request = require('../edge10-request');
	
	/**
   * Gets a subject with the specified Id
   */
	function getSubject(subjectId) {
		return require({
			url: '/api/entity/subject/' + subjectId
		});
	}

	getSubject('[subjectId]')
		.then(function(subject) {
			console.log(`Retrieved subject: ${subject.subjectId}`);
			return subject;
		});
}(require));