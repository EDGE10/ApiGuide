/*global require:false*/

/**
* Refer to http://testenvironment.edge10hosted.com/swagger/ui/index#/Session
*/
(function (require) {
	var request = require('../edge10-request');
    
	/**
 	* Gets a session with the specified Id
 	*/
	function getSession(sessionId) {
			return require({
				url: '/api/session/' + sessionId
			});
		}

	getSession('[sessionId]')
		.then(function(session){
				console.log(`Retrieved session ${session.sessionId}`);
				return session;
		});
}(require));