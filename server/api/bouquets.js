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
	console.log("editBouquet request done. req.body stringified: " + JSON.stringify(req.body));
	
	var newBouquet = {
		name: req.body.name,
		price: req.body.price,
		packSize: req.body.packSize,
		collections: req.body.collections,
		tags: req.body.tags,
		id: req.body.id
	};

	console.log("req.body: " + JSON.stringify(req.body));	
	if(req.body.pictureRemoved == 'true') {
		console.log("Setting image to ''");
		deleteBouquetImage(req.body.id).then(_ => {
			newBouquet.image = '';		
			updateBouquet(newBouquet, res);			
		});		
	}
	else if(req.body.pictureChanged == 'true' && req.file != null) {
		console.log("Changing image path, because req.body.pictureChanged = " + req.body.pictureChanged);

		deleteBouquetImage(req.body.id).then(_ => {
			newBouquet.image = req.file.path;
			updateBouquet(newBouquet, res);			
		});
	}
	else {
		updateBouquet(newBouquet, res);
	}
}

function updateBouquet (newBouquet, res) {
	db.editBouquet(newBouquet).then(id_ => {
		console.log("Successfully edited bouquet");
		res.status(200).json({ id: id_ });
	}).catch(err => {
		console.log("Unsuccessfully edited bouquet: " + err);		
		res.status(500).json({error: "Unable to edit bouquet: " + err});	
	});
}

module.exports.getBouquets = (req, res) => {
	db.getBouquets().then(bouquets => {
		res.status(200).json(bouquets);
	}).catch(err => {
		res.status(500).json({error: err});
	})
}

module.exports.removeBouquet = (req, res) => {
	console.log("removeBouquet called");
	deleteBouquetImage(req.body.id).then(_ => {
		db.removeBouquet(req.body.id).then(_ => {
			console.log("In bouquets.js, sending 200 status");
			res.sendStatus(200).json({id: req.body.id});
		}).catch(err => {
			console.log("In bouquets.js, sending 500 status due to error: " + JSON.stringify(err));		
			res.status(500).json({error: err});
		});	
	});	
}

function deleteBouquetImage (bouquetId) {
	return new Promise((resolve, reject) => {
		db.getBouquet(bouquetId).then(res => {
			console.log("Dirname: " + __dirname);
			console.log("Image: " + res.image);			
			var url = path.join(__dirname, '../../', res.image);
	
			fs.unlink(url, function(err) {
				if(err && err.code == 'ENOENT') {
					// file doens't exist
					resolve();
					console.info("File at url " + url + " doesn't exist, won't remove it.");
				} else if (err) {
					// other errors, e.g. maybe we don't have enough permission
					console.error("Error occurred while trying to remove file at url " + url);
					resolve(err);
				} else {
					resolve();
					console.info(`removed file at url ` + url);
				}
			});
		});	
	});
}