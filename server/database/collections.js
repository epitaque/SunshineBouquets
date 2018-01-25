var con = require('./init').connection;

module.exports.addCollection = function (collection) {
	return new Promise((resolve, reject) => {
		var collectionData = {
			name: collection.name,
			description: collection.description,
			date_added: new Date(),
		}
		if (collection.image) {
			collectionData.image = collection.image;
		}
		con.query('INSERT INTO collections SET ?', collectionData, function (error, result) {
			if (error) {
				console.log('Error adding collection to database: ' + error);
				reject(error);
			}
			else {
				resolve(result.insertId);
			}
		});
	});
}


module.exports.removeCollection = function (collectionId) {
	return new Promise((resolve, reject) => {
		con.query('DELETE FROM collections WHERE collection_id = ?', collectionId, function (error, reuslt) {
			if (error) {
				reject(error);
			}
			else {
				resolve();
			}
		});
	});
}

module.exports.updateCollection = function (collection) {
	return new Promise((resolve, reject) => {
		var collectionData = {
			name: collection.name,
			description: collection.description,
		};

		if (collection.image != null) {
			collectionData.image = collection.image;
		}
		con.query('UPDATE collections SET ? WHERE collection_id = ?', [collectionData, collection.collection_id], function (error, result) {
			if (error) {
				console.log('error editing collection: ' + JSON.stringify(error));
				reject(error);
			} else {
				console.log("Successfully edited collection " + collection.collection_id);
				resolve();
			}
		});
	});
}

module.exports.getCollections = function () {
	return new Promise((resolve, reject) => {
		con.query('SELECT * FROM collections', function (error, rows) {
			if (error) {
				reject(error);
			}
			else {
				resolve(rows);
			}
		});
	}).then(collections => {

		return new Promise((resolve, reject) => {
			con.query('SELECT * FROM collection_items', function (error, items) {
				if(error) {
					reject(error);
				}
				else {
					for(var i = 0; i < collections.length; i++) {
						collections[i].collection_items = [];
					}
					for(var i = 0; i < items.length; i++) {
						for(var j = 0; j < collections.length; j++) {
							if(collections[j].collection_id == items[i].collection_id) {
								collections[j].collection_items.push(items[i]);
								break;
							}
						}
					}
					resolve(collections);
				}
			});
		});
	});
}

module.exports.getCollection = function (collectionId) {
	return new Promise((resolve, reject) => {
		console.log('getCollection called with collectionId: ' + collectionId);
		con.query('SELECT * FROM collections WHERE collection_id = ?', collectionId, function (error, rows) {
			if (error) {
				console.log('rejecting getCollection with error: ' + error);
				reject(error);
			}
			else {
				console.log('resolving getCollection with: ' + JSON.stringify(rows[0]));
				resolve(rows[0]);
			}
		});
	}).then(collection => {
		return module.exports.getCollectionItems(collection.collection_id).then(items => {
			collection.collection_items = items;
			return collection;
		});
	});
}

module.exports.getCollectionItems = function (collectionId) {
	return new Promise((resolve, reject) => {
		console.log("getting colleciton items " + collectionId);
		con.query('SELECT * FROM collection_items WHERE collection_id = ?', collectionId, function (error, rows) {
			console.log("inside adsfadsf");
			if(error) {
				console.log("rejecting due to error"  + error);
				reject(error);
			}
			else {
				console.log("resolving rows: " + rows);
				resolve(rows);
			}
		});
	});
}

module.exports.addCollectionItem = function (collectionItem) {
	return new Promise((resolve, reject) => {
		if (!collectionItem.collection_id) {
			console.log('Error adding collection item: ' + 'No collection id provided');
			return reject("No collection id provided.");
		}
		var collectionItemData = {
			collection_id: collectionItem.collection_id,
			bouquet_id: collectionItem.bouquet_id,
		}
		con.query('INSERT INTO collection_items SET ?', collectionItemData, function (error, result) {
			if (error) {
				console.log('Error adding collection item: ' + error);
				reject(error);
			}
			else {
				resolve(result.insertId);
			}
		});

	});
}

module.exports.removeCollectionItems = function (collectionId) {
	return new Promise((resolve, reject) => {
		con.query('DELETE FROM collection_items WHERE collection_id = ?', collectionId, function (error, result) {
			if (error) {
				reject(error);
			}
			else {
				resolve();
			}
		});
	});
}

module.exports.removeCollectionItemByIds = function(collectionId, bouquetId) {
	return new Promise((resolve, reject) => {
		con.query('DELETE FROM collection_items WHERE collection_id = ? AND bouquet_id = ?', [collectionId, bouquetId], function (error, result) {
			if (error) {
				reject(error);
			}
			else {
				resolve();
			}
		});
	});
}

module.exports.removeCollectionItem = function (collectionItemId) {
	return new Promise((resolve, reject) => {
		con.query('DELETE FROM collection_items WHERE collection_item_id = ?', collectionItemId, function (error, result) {
			if (error) {
				reject(error);
			}
			else {
				resolve();
			}
		});
	});
}