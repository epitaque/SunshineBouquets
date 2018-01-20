var db = require('../database/bouquets');
var fs = require('fs');
const path = require('path');

module.exports.addBouquet = (req, res, next) => {
		var srps = [];
		console.log("req.body: " + JSON.stringify(req.body));
		for(var i = 0; i < req.body.srps.length; i++) {
			console.log("	srps[" + i + "]: " + req.body.srps[i]);
			var reqSrp = JSON.parse(req.body.srps[i]);
			var srp = {};
			srp.image = reqSrp.imageIndex == -1 ? '' : req.files[reqSrp.imageIndex].path;
			srp.name = reqSrp.name;
			srp.stems = reqSrp.stems;
			srp.date_added = new Date();
			srp.srp = parseFloat(reqSrp.srp);
			console.log("	srp: " + JSON.stringify(srp));
			srps[i] = srp;		
		}
		//console.log("req.files[0].path: " + JSON.stringify(req.files[0].path));
		db.addBouquet({
			name: req.body.name,
			description: req.body.description,
			pack_size: req.body.pack_size,
			image: req.body.imageIndex == -1 ? '' : req.files[req.body.imageIndex].path,
			collections: req.body.collections,
			tags: req.body.tags,
			date_added: new Date(),
			srps
		}).then(({id, srpResults}) => {
			res.status(200).json({id});
		}).catch(err => {
			res.status(500).json({error: "Unable to add bouquet: " + err});	
		});
}

module.exports.editBouquet = (req, res, next) => {
	console.log("editBouquet request. req.body stringified: " + JSON.stringify(req.body));

	var promises = [];

	for(var i = 0; i < req.body.srps.length; i++) {
		var reqSrp = JSON.parse(req.body.srps[i]);
		console.log("Editing SRP[" + i + "]: " + JSON.stringify(reqSrp))
		promises.push(updateSrp(reqSrp, req.body.bouquet_id, req.files));
	}

	var bouquetData = {
		name: req.body.name,
		collections: req.body.collections,
		pack_size: req.body.pack_size,
		tags: req.body.tags,
		bouquet_id: req.body.bouquet_id
	};

	var bouquetUpdatePromise;
	if(req.body.pictureRemoved == 'true' || req.body.pictureChanged == 'true') {
		bouquetData.image = req.body.imageIndex == -1 ? '' : req.files[req.body.imageIndex].path;
		bouquetUpdatePromise = db.getBouquet(bouquetData.bouquet_id).then(dbBouquet => {
			return deleteImage(dbBouquet.image);
		}).then(_ => {
			return db.updateBouquet(bouquetData);
		});
	}
	else {
		bouquetUpdatePromise = db.updateBouquet(bouquetData);
	}
	promises.push(bouquetUpdatePromise);

	var deletedSrps = JSON.parse(req.body.deletedSrps);
	for(var i = 0; i < deletedSrps.length; i++) {
		var deletedSrpId = Number(deletedSrps[i]);
		promises.push(deleteSrp(deletedSrpId));
	}

	Promise.all(promises).then(values => {
		console.log("Successfully edited bouquet");
		res.status(200).json({ id: bouquetData.bouquet_id });
	}).catch(err => {
		console.log("Unsuccessfully edited bouquet: " + err);		
		res.status(500).json({error: "Unable to edit bouquet: " + err});		
	});
}

function deleteSrp(srpId) {
	return db.getSrp(srpId).then(srp => {
		if(srp.image) {
			return deleteImage(srp.image);
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

	if(reqSrp.pictureRemoved == true || reqSrp.pictureChanged == true) {
		srpData.image = reqSrp.imageIndex == -1 ? '' : files[reqSrp.imageIndex].path;
		console.log("Detected picture changed! New path: " + srpData.image);
	}

	if(reqSrp.new) {
		console.log("Adding new srp as part of request...");
		promise = db.addSrp(srpData);
	}
	else {
		srpData.srp_id = reqSrp.srp_id;
		console.log("Boutta update srp, data: ...");
		if(reqSrp.pictureRemoved  == true || reqSrp.pictureChanged == true) {
			promise = db.getSrp(reqSrp.srp_id).then(srp => {
				var imageUrl = srp.image;
				console.log("SRP image: " + imageUrl);
				if(!imageUrl || imageUrl == '') {
					return;
				} 
				return deleteImage(imageUrl);
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

module.exports.getBouquets = (req, res) => {
	db.getBouquets().then(bouquets => {
		var promises = [];
		for(var i = 0; i < bouquets.length; i++) {
			promises.push(addBouquetSrps(bouquets[i], bouquets));
		}
		
		//console.log("stringified bouquets: " + JSON.stringify(bouquets));
		Promise.all(promises).then(_ => {
			res.status(200).json(bouquets);
		});
	}).catch(err => {
		res.status(500).json({error: err});
	})
}

function addBouquetSrps(bouquet, bouquets) {
	bouquet.srps = [];

	return db.getBouquetSrps(bouquet.bouquet_id).then(rows => {
		for(var j = 0; j < rows.length; j++) {
			bouquet.srps.push(rows[j]);
		}
		return;
	});
}

module.exports.removeBouquet = (req, res) => {
	console.log("removeBouquet called");
	if(!req.body || !req.body.id) {
		return res.status(500).json({error: 'Unable to delete bouquet; no ID supplied'});
	}
	var srpPromises = [];
	srpPromises.push(
		db.getBouquetSrps(req.body.id).then(srps => {
			for(var i = 0; i < srps.length; i++) {
				var srp = srps[i];
				if(srp.image) {
					srpPromises.push(deleteImage(srp.image));
				}
			}
		})
	);

	Promise.all(srpPromises)
	.then(db.getBouquet(req.body.id)
	.then(bouquet => {
		return deleteImage(bouquet.image);
	}).then(
		db.removeBouquet(req.body.id)
	).catch(err => {
		res.status(500).json({error: err});
	}));
}

function deleteImage(incompletePath) {
	return new Promise((resolve, reject) => {
		var url = path.join(__dirname, '../../', incompletePath);
		
		fs.unlink(url, function(err) {
			if(err && err.code == 'ENOENT') {
				// file doens't exist
				resolve();
				console.info("File at url " + url + " doesn't exist, won't remove it.");
			} else if (err) {
				// other errors, e.g. maybe we don't have enough permission
				console.error("Error occurred while trying to remove file at url " + url + ": " + err);
				resolve(err);
			} else {
				resolve();
				console.info(`removed file at url ` + url);
			}
		});
	});
}