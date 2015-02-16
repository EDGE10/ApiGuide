/*global require:false*/

(function(require) {
	var request = require('./edge10-request');

	function getQueryResults(queryName) {
		return request({
			url: '/api/query?entityType=AllSubjects&dateRangeType=offset&dateoffset=-365&queryName=' + queryName
		});
	}

	/**
	 * Prints out the table of results
	 * @param table
	 */
	function printTable(table) {
		table.rows.forEach(function(row) {
			console.log(row.cells.map(function(cell) {
				return cell.lookupValues && cell.lookupValues[0] && cell.lookupValues[0].value || cell.value;
			}).reduce(function(a,b) { return a + '\t' + b }, ''));
		});
	}

	getQueryResults('[query name]')
		.then(function(results) {
			//1 result returned for each entity - in this case, each subject
			results.forEach(function(table) {
				console.log('Entity: ' + table.metadata['contact-id']);
				printTable(table);
			});
		});
}(require));