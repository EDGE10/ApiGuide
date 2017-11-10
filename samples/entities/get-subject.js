/*global require:false*/

/**
*  Refer to http://testenvironment.edge10hosted.com/swagger/ui/index#/Entity
*/
((require) => {
	const request = require('../edge10-request');

	/**
	* Gets a subject with the specified Id
	*/
	const getSubject = (subjectId) => {
		return require({
			url: `/api/entity/subject/${subjectId}`
		});
	}

	getSubject('[subjectId]')
		.then((subject) => {
			console.log(`Retrieved subject: ${subject.subjectId}`);
			return subject;
		});
})(require);