/*global require:false*/

/**
* Refer to http://testenvironment.edge10hosted.com/swagger/ui/index#/Session
*/
((require) => {
	const request = require('../edge10-request');

	/**
	* Creates a new session with the specified data
	*/
	const createSession = () => {
		return request({
			method: 'POST',
			url: '/api/session',
			body: {
				sessionDetails: {
					name: 'session name',
					start: '2015-01-01T09:00',
					end: '2015-01-01T10:30',
					sessionTypeId: '[session type ID]'
				},
				contacts: [
					{ contactType: 'User', contactId: '[user`s ID]' }
				]
			}
		});
	};

	/**
	* Updates an existing session specified by sessionId
	*/
	const updateSessionById = (sessionId) => {
		return request({
			method: 'PUT',
			url: `/api/session/${sessionId}`,
			body: {
				sessionDetails: {
					name: 'session name',
					start: '2015-01-01T09:00',
					end: '2015-01-01T10:30'
				}
			}
		});
	};

	const getSession = (sessionId) => {
		return require({
			url: `/api/session/${sessionId}`
		});
	};

	createSession()
		.then((session) => {
			console.log(`Created session: ${session.sessionDetails.name}`);

			updateSessionById(session.sessionDetails.name);
			console.log(`Updated session: ${session.sessionDetails.name}`);

			return session;
		});
})(require);