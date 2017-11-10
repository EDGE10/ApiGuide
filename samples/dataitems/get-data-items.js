/*global require:false*/

/**
* Refer to http://testenvironment.edge10hosted.com/swagger/ui/index#/Attribute/get
*/
((require) => {
	const request = require('../edge10-request');

	/**
	* Gets all visible data items in the system
	*/
	const getAllDataItems = () => {
		return request({
			url: '/api/attribute'
		});
	};

	/**
	* Gets a specific data item based on it's name or ID
	* @param nameOrId The name or ID of the data item
	*/
	const getDataItemByNameOrId = (nameOrId) => {
		return request({
			url: '/api/attribute/' + nameOrId
		});
	};

	getAllDataItems()
		.then((dataItems) => {
			dataItems
				.map((d) => { return d.name; })
				.forEach((name) => { console.log(name); });
		});

	getDataItemByNameOrId('[nameOrId]')
		.then((dataItem) => {
			console.log(`Retrieved DataItem : ${dataItem.id}`);
			return dataItem;
		});
})(require);