var db = require('../database/bouquets');
var utility = require('../utility');

module.exports.addBouquet = function (req, res) {
	var srps = [];
	for (var i = 0; i < req.body.srps.length; i++) {
		var reqSrp = JSON.parse(req.body.srps[i]);
		srps.push({
			image: reqSrp.imageIndex == -1 ? '' : req.files[reqSrp.imageIndex].path,
			name: reqSrp.name,
			stems: reqSrp.stems,
			date_added: new Date(),
			srp: parseFloat(reqSrp.srp)
		});
	}

	var bouquet = {
		name: req.body.name,
		description: req.body.description,
		pack_size: req.body.pack_size,
		image: req.body.imageIndex == -1 ? '' : req.files[req.body.imageIndex].path,
		collections: req.body.collections,
		tags: req.body.tags,
		srps
	};

	db.addBouquet(bouquet).then(({ id, srpResults }) => {
		res.status(200).json({ id });
	}).catch(err => {
		res.status(500).json({ error: "Unable to add bouquet: " + err });
	});
}

module.exports.editBouquet = function (req, res) {
	console.log("editBouquet request. req.body stringified: " + JSON.stringify(req.body));

	var promises = [];

	for (var i = 0; i < req.body.srps.length; i++) {
		var reqSrp = JSON.parse(req.body.srps[i]);
		console.log("Editing SRP[" + i + "]: " + JSON.stringify(reqSrp))
		promises.push(updateSrp(reqSrp, req.body.bouquet_id, req.files));
	}

	var bouquet = {
		name: req.body.name,
		collections: req.body.collections,
		pack_size: req.body.pack_size,
		tags: req.body.tags,
		bouquet_id: req.body.bouquet_id
	};

	var bouquetUpdatePromise;
	if (req.body.pictureRemoved == 'true' || req.body.pictureChanged == 'true') {
		bouquet.image = req.body.imageIndex == -1 ? '' : req.files[req.body.imageIndex].path;
		bouquetUpdatePromise = db.getBouquet(bouquet.bouquet_id).then(dbBouquet => {
			return utility.deleteImage(dbBouquet.image);
		}).then(_ => {
			return db.updateBouquet(bouquet);
		});
	}
	else {
		bouquetUpdatePromise = db.updateBouquet(bouquet);
	}
	promises.push(bouquetUpdatePromise);

	var deletedSrps = JSON.parse(req.body.deletedSrps);
	for (var i = 0; i < deletedSrps.length; i++) {
		var deletedSrpId = Number(deletedSrps[i]);
		promises.push(deleteSrp(deletedSrpId));
	}

	Promise.all(promises).then(values => {
		console.log("Successfully edited bouquet");
		res.status(200).json({ id: bouquet.bouquet_id });
	}).catch(err => {
		console.log("Unsuccessfully edited bouquet: " + err);
		res.status(500).json({ error: "Unable to edit bouquet: " + err });
	});
}

function deleteSrp(srpId) {
	return db.getSrp(srpId).then(srp => {
		if (srp.image) {
			return utility.deleteImage(srp.image);
		}
	}).then(db.deleteSrp(srpId));
}

function updateSrp(reqSrp, bouquet_id, files) {
	var promise;
	var srpData = {
		bouquet_id: bouquet_id,
		name: reqSrp.name,
		srp: reqSrp.srp,
		stems: reqSrp.stems,
	}

	if (reqSrp.pictureRemoved == true || reqSrp.pictureChanged == true) {
		srpData.image = reqSrp.imageIndex == -1 ? '' : files[reqSrp.imageIndex].path;
		console.log("Detected picture changed! New path: " + srpData.image);
	}

	if (reqSrp.new) {
		console.log("Adding new srp as part of request...");
		promise = db.addSrp(srpData);
	}
	else {
		srpData.srp_id = reqSrp.srp_id;
		console.log("Boutta update srp, data: ...");
		if (reqSrp.pictureRemoved == true || reqSrp.pictureChanged == true) {
			promise = db.getSrp(reqSrp.srp_id).then(srp => {
				var imageUrl = srp.image;
				console.log("SRP image: " + imageUrl);
				if (!imageUrl || imageUrl == '') {
					return;
				}
				return utility.deleteImage(imageUrl);
			}).then(_ => {
				return db.editSrp(srpData);
			});
		}
		else {
			promise = db.editSrp(srpData);
		}
	}

	return promise;
}

module.exports.getBouquets = function (req, res) {
	db.getBouquets().then(bouquets => {
		var promises = [];
		for (var i = 0; i < bouquets.length; i++) {
			promises.push(addBouquetSrps(bouquets[i], bouquets));
		}

		//console.log("stringified bouquets: " + JSON.stringify(bouquets));
		Promise.all(promises).then(_ => {
			res.status(200).json(bouquets);
		});
	}).catch(err => {
		res.status(500).json({ error: err });
	})
}

function addBouquetSrps(bouquet, bouquets) {
	bouquet.srps = [];

	return db.getBouquetSrps(bouquet.bouquet_id).then(rows => {
		for (var j = 0; j < rows.length; j++) {
			bouquet.srps.push(rows[j]);
		}
		return;
	});
}

module.exports.removeBouquet = function (req, res) {
	console.log("removeBouquet called");
	if (!req.body || !req.body.id) {
		return res.status(500).json({ error: 'Unable to delete bouquet; no ID supplied' });
	}
	var srpPromises = [];
	srpPromises.push(
		db.getBouquetSrps(req.body.id).then(srps => {
			for (var i = 0; i < srps.length; i++) {
				var srp = srps[i];
				if (srp.image) {
					srpPromises.push(utility.deleteImage(srp.image));
				}
			}
		})
	);

	Promise.all(srpPromises)
		.then(db.getBouquet(req.body.id)
			.then(bouquet => {
				return utility.deleteImage(bouquet.image);
			}).then(
			db.removeBouquet(req.body.id)
			).catch(err => {
				res.status(500).json({ error: err });
			}));
}

