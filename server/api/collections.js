var db = require('../database/collections');
var utility = require('../utility');

module.exports.getCollections = function (req, res) {
	console.log("Getting collections");
	db.getCollections().then(collections => {
		console.log('Collections: ' + JSON.stringify(collections));
		res.status(200).json(collections);
	}).catch(err => {
		console.log("Error getting collections: " + err);
		res.status(500).json({ error: err });
	})
}

module.exports.addCollection = function (req, res) {
	var collectionItems = [];
	if(req.body.collectionItems) {
		for (var i = 0; i < req.body.collectionItems.length; i++) {
			var reqItem = JSON.parse(req.body.collectionItems[i]);
			collectionItems.push({
				bouquet_id: reqItem.bouquet_id
			});
		}
	}

	var collection = {
		name: req.body.name,
		description: req.body.description,
		image: req.body.imageIndex == -1 ? '' : req.files[req.body.imageIndex].path,
	}

	var collectionId_;

	db.addCollection(collection).then(collectionId => {
		collectionId_ = collectionId;
		var promises = [];
		for (var i = 0; i < collectionItems.length; i++) {
			collectionItems[i].collection_id = collectionId;
			promises.push(db.addCollectionItem(collectionItems[i]));
		}
		return Promise.all(promises);
	}).then(values => {
		res.status(200).json({ id: collectionId_ });
	}).catch(error => {
		console.log('Error adding collection: ' + error);
		res.status(500).json({ error })
	});
}

module.exports.editCollection = function (req, res) {
	var collectionId = req.body.collection_id;
	var promises = [];
	try {
		var deletedBouquetIds = JSON.parse(req.body.deletedBouquetIds);
		for(var i = 0; i < deletedBouquetIds.length; i++) {
			var reqItem = deletedBouquetIds[i];
			console.log("reqItem: " + reqItem);
			promises.push(db.removeCollectionItemByIds(collectionId, reqItem));
		}
	} catch(error) {
		console.log("Error editing collection: " + error);
		res.status(500).json({ error });
		return;
	}

	Promise.all(promises).then(_ => {
		var newPromises = [];

		var addedBouquetIds = JSON.parse(req.body.addedBouquetIds);
		for (var i = 0; i < addedBouquetIds.length; i++) {
			var reqItem = addedBouquetIds[i];
			var item = {
				bouquet_id: reqItem,
				collection_id: collectionId
			}
			newPromises.push(db.addCollectionItem(item));
		}
	
	
		var collection = {
			name: req.body.name,
			description: req.body.description,
			collection_id: collectionId
		}
		if (req.body.pictureRemoved == 'true' || req.body.pictureChanged == 'true') {
			collection.image = req.body.imageIndex == -1 ? '' : req.files[req.body.imageIndex].path;
			newPromises.push(db.getCollection(collectionId).then(dbCollection => {
				return utility.deleteImage(dbCollection.image);
			}).then(_ => {
				return db.updateCollection(collection);
			}));
		}
		else {
			promises.push(db.updateCollection(collection));
		}
		
		return Promise.all(newPromises);
	}).then(values => {
		console.log("Sending 200 status");
		res.status(200).json({ id: collectionId });
	}).catch(error => {
		console.log("Sending 500 status");
		res.status(500).json({ error });
	});	
}

module.exports.removeCollection = function (req, res) {
	var collection_id = Number(req.body.id);
	console.log("deleting collection...");

	deleteCollection(collection_id).then(_ => {
		console.log('sending 200 status');
		res.sendStatus(200);
	}).catch(error => {
		console.log("Error deleting collection: " + error);
		res.status(500).json({ error });
	});
	//
}

function deleteCollection(collectionId) {
	console.log('deleting collection: ' + collectionId + "type: " + typeof(collectionId));
	return db.removeCollectionItems(collectionId)
	.then(_ => db.getCollection(collectionId))
	.then(collection => { utility.deleteImage(collection.image);})
	.then(_ => db.removeCollection(collectionId));
}

function deleteCollectionItem(collectionItemId) {
	return db.deleteCollectionItem(collectionItemId);
}
