var con = require('./init').connection;

module.exports.addBouquet = (bouquet) => {
	//var today = new Date();
	return new Promise((resolve, reject) => {
		var bouquetData = {
			name: bouquet.name,
			description: bouquet.description,
			pack_size: bouquet.pack_size,
			image: bouquet.image,			
			collections: bouquet.collections,
			tags: bouquet.tags,
			date_added: bouquet.date_added
		};
		con.query('INSERT INTO bouquets SET ?', bouquetData, function (error, result) {
			if (error) {
				reject(error);
			} else {
				var id = result.insertId;

				// Successfully added row for bouquet, now to add SRPs
				var promises = [];
				for(var i = 0; i < bouquet.srps.length; i++) {
					var bouSrp = bouquet.srps[i];
					bouSrp.bouquet_id = id;
					//var srp = {};
					/*
					srp.image = bouSrp.image;
					srp.name = bouSrp.name;
					srp.stems = bouSrp.stems;
					srp.date_added = bouSrp.date_added;
					srp.srp = bouSrp.srp;*/

					promises[i] = module.exports.addSrp(bouSrp);
				}

				Promise.all(promises).then(srpIds => {
					resolve({id, srpIds});
				}).catch(err => {
					reject(err);
				});
			}
		});
	
	});
}

module.exports.addSrp = (srpData) => {
	srpData.date_added = new Date();
	return new Promise((resolve, reject) => {
		con.query('INSERT INTO srps SET ?', srpData, function (error, result) {
			if(error) {
				reject(error);
			}
			else {
				resolve(result.id);
			}
		});
	});
}

module.exports.updateBouquet = (bouquet) => {
	var bouquetData = {
		name: bouquet.name,
		description: bouquet.description,
		pack_size: bouquet.pack_size,
		collections: bouquet.collections,
		tags: bouquet.tags
	};

	console.log("Updating bouquet: " + JSON.stringify(bouquet));

	return new Promise((resolve, reject) => {
		if(bouquet.image != null) bouquetData.image = bouquet.image;
		console.log('About to edit bouquet');		
		con.query('UPDATE bouquets SET ? WHERE bouquet_id = ?', [bouquetData, bouquet.bouquet_id], function (error, result) {
			if (error) {
				console.log('error editing bouquet: ' + JSON.stringify(error));
				reject(error);
			} else {
				console.log("Successfully edited bouquet " + bouquet.bouquet_id);
				resolve(bouquet.bouquet_id);
			}
		});
	});
}

module.exports.editSrp = (srp) => {
	console.log("editSrp called");
	return new Promise((resolve, reject) => {
		if(!srp || !srp.srp_id) reject("Invalid SRP or SRP id given.");

		var srpData = {
			name: srp.name,
			srp: srp.srp,
			stems: srp.stems
		};
		console.log('dbSrpEdit: ' + JSON.stringify(srp));
		if(srp.image != null) srpData.image = srp.image;
		con.query('UPDATE srps SET ? WHERE srp_id = ?', [srpData, srp.srp_id], function (error, result) {
			if (error) {
				console.log('error editing srp: ' + JSON.stringify(error));
				reject(error);
			} else {
				resolve(srp.srp_id);
			}
		});
	});
}

module.exports.getBouquets = () => {
	return new Promise((resolve, reject) => {
		con.query('SELECT * FROM bouquets', (err, rows) => {
			if (err) reject(err);
			resolve(rows);
		});
	});
}

module.exports.getBouquet = (bouquetId) => {
	return new Promise((resolve, reject) => {
		con.query('SELECT * FROM bouquets WHERE bouquet_id = ?', bouquetId, (err, rows) => {
			if (err) reject(err);
			resolve(rows[0]);
		});
	});
}

module.exports.getBouquetSrps = (bouquetId) => {
	return new Promise((resolve, rejct) => {
		con.query('SELECT * FROM srps WHERE bouquet_id = ?', bouquetId, (err, rows) => {
			if (err) reject(err);
			resolve(rows);
		});
	});
}

module.exports.getSrp = (srpId) => {
	return new Promise((resolve, reject) => {
		con.query('SELECT * FROM srps WHERE srp_id = ?', srpId, (error, rows) => {
			if(error) {
				console.log('SQL error getting srp with srp_id ' + srpId + ', error: ' + JSON.stringify(error));
				reject(error);
			}
			else {
				if(!rows || rows[0] == null) {
					reject('No SRP with srp_id ' + srpId + ' exists.');
				}
				else {
					resolve(rows[0]);
				}
			}
		});
	});
}

module.exports.deleteSrp = (srpId) => {
	return new Promise((resolve, reject) => {
		con.query('DELETE FROM srps WHERE srp_id = ?', srpId, (error, result) => {
			if(error) {
				console.log('SQL error removing srp with srp_id ' + srp_id + ', error: ' + JSON.stringify(error));
				reject(error);
			}
			else {
				resolve();
			}
		});
	});
}

module.exports.removeBouquet = (bouquetId) => {
	console.log('Attempting to delete bouquet ' + bouquetId);
	return new Promise((resolve, reject) => {
		try {
			con.query('DELETE FROM srps WHERE bouquet_id = ?', bouquetId, (error, result) => {
				if(error) {
					console.log('SQL error removing srps with bouquet id ' + bouquetId + ', error: ' + JSON.stringify(error));
					reject(error);
				}
				else {
					con.query('DELETE FROM bouquets WHERE bouquet_id = ?', bouquetId, (error, result) => {
						if(error) {
							console.log('SQL error removing bouquet ' + bouquetId + ', error: ' + JSON.stringify(error));
							reject(error);
						}
						else {
							resolve(bouquetId);
						}
					});		
				}
			});
		}
		catch(err) {
			reject(err);
			console.log('Javascript error deleting bouquet');
		}
	});
}