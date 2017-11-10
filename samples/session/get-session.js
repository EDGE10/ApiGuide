/*global require:false*/

/**
* Refer to http://testenvironment.edge10hosted.com/swagger/ui/index#/Session
*/
((require) => {
	const request = require('../edge10-request');

	/**
	* Gets a session with the specified Id
	*/
	const getSession = (sessionId) => {
		return require({
			url: `/api/session/${sessionId}`
		});
	};

	getSession('[sessionId]')
		.then((session) => {
			console.log(`Retrieved session ${session.sessionId}`);
			return session;
		});
})(require);