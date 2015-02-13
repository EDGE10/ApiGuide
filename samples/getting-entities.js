/*global require:false*/

(function(require) {
	var request = require('./edge10-request');

	function getAllEntities() {
		return request({
			url: '/api/entity'
		});
	}

	getAllEntities()
		.then(function(entities) {
			entities
				.map(function(e) { return e.firstName + ' ' + e.lastName; })
				.forEach(function(name) { console.log(name); })
		});
}(require));