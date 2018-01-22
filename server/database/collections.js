var con = require('./init').connection;

module.exports.addCollection = function (collection) {
	return new Promise((resolve, reject) => {
		var collectionData = {
			name: collection.name,
			description: collection.description,
			date_added: new Date(),
		}
		if (collection.banner_image) {
			collectionData.banner_image = collection.banner_image;
		}
		con.query('INSERT INTO collections SET ?', collectionData, function (error, result) {
			if (error) {
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

		if (collection.banner_image != null) {
			collectionData.banner_image = collection.banner_image;
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
		con.query('SELECT * FROM collections', function (err, rows) {
			if (err) {
				reject(err);
			}
			else {
				console.log("Resolving rows: " + JSON.stringify(rows));
				resolve(rows);
			}
		});
	}).then(collections => {

		console.log("collections: " + JSON.stringify(collections));

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
					console.log("returning collections: " + JSON.stringify(collections));
					resolve(collections);
				}
			});
		});
	});
}

module.exports.getCollection = function (collectionId) {
	return new Promise((resolve, reject) => {
		con.query('SELECT * FROM collections WHERE collection_id = ', collectionId, function (err, rows) {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows[0]);
			}
		});
	}).then(collection => {
		module.exports.getCollectionItems(collection.collection_id).then(items => {
			collection.collection_items = items;
			return collection;
		});
	});
}

module.exports.getCollectionItems = function (collectionId) {
	return new Promise((resolve, reject) => {
		con.query('SELECT * FROM collection_items WHERE collection_id = ', collectionId, function (err, rows) {
			if(error) {
				reject(error);
			}
			else {
				resolve(rows);
			}
		});
	});
}

module.exports.addCollectionItem = function (collectionItem) {
	return new Promise((resolve, reject) => {
		if (!collectionItem.collection_id) {
			return reject("No collection id provided.");
		}
		var collectionItemData = {
			collection_id: collectionItem.collection_id,
			bouquet_id: collectionItem.bouquet_id,
		}
		con.query('INSERT INTO collection_items SET ?', collectionData, function (error, result) {
			if (error) {
				reject(error);
			}
			else {
				resolve(result.insertId);
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