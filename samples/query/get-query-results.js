/*global require:false*/

/**
* Refer to http://testenvironment.edge10hosted.com/swagger/ui/index#/Query/getDefinition
*/
((require) => {
	const request = require('../edge10-request');

	getQueryResults = (queryName) => {
		return request({
			url: `/api/query?entityType=AllSubjects&dateRangeType=offset&dateoffset=-365&queryName=${queryName}`
		});
	};

	/**
	* Prints out the table of results
	* @param table
	*/
	printTable = (table) => {
		table.rows.forEach((row) => {
			console.log(row.cells.map((cell) => {
				return cell.lookupValues && cell.lookupValues[0] && cell.lookupValues[0].value || cell.value;
			}).reduce((a, b) => { return a + '\t' + b }, ''));
		});
	};

	getQueryResults('[query name]')
		.then((results) => {
			//1 result returned for each entity - in this case, each subject
			results.forEach((table) => {
				console.log(`Entity:${table.metadata[contact - id]}`);
				printTable(table);
			});
		});
})(require);