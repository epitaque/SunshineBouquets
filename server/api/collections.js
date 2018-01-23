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

	for (var i = 0; i < req.body.newCollectionItems.length; i++) {
		var reqItem = JSON.parse(req.body.newCollectionItems[i]);
		var item = {
			bouquet_id: reqItem.bouquet_id,
			collection_id: req.body.collectionId
		}
		promises.push(db.addCollectionItem(item));
	}

	var collection = {
		name: req.body.name,
		description: req.body.description,
		collection_d: collectionId
	}
	if (req.body.pictureRemoved == 'true' || req.body.pictureChanged == 'true') {
		collection.image = req.body.imageIndex == -1 ? '' : req.files[req.body.imageIndex].path;
		promises.push(db.getCollection(collectionId).then(dbCollection => {
			return utility.deleteImage(dbCollection.image);
		}).then(_ => {
			return db.updateCollection(collection);
		}));
	}
	else {
		promises.push(db.updateCollection(collection));
	}

	var deletedCollectionItems = JSON.parse(req.body.deletedCollectionItems);
	for (var i = 0; i < deletedCollectionItems.length; i++) {
		var deletedCollectionItemId = Number(deletedCollectionItems[i]);
		promises.push(deleteCollectionItem(collectionId));
	}

	Promise.all(promises).then(values => {
		res.status(200).json({ id: collectionId });
	}).catch(error => {
		res.status(500).json({ error });
	});

}

module.exports.removeCollection = function (req, res) {

}

module.exports.addCollectionItem = function (req, res) {

}

module.exports.removeCollectionItem = function (req, res) {

}

function deleteCollectionItem(collectionId) {
	return new Promise((resolve, reject) => {
		return db.getCollection(collectionId).then(collection => {
			if (collection.image) {
				return utility.deleteImage(collection.image);
			}
		}).then(db.deleteCollectionItem(collectionId));
	})
}
