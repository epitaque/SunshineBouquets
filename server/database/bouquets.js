var con = require('./init').connection;

module.exports.addBouquet = function (bouquet) {
	return new Promise((resolve, reject) => {
		var bouquetData = {
			name: bouquet.name,
			description: bouquet.description,
			pack_size: bouquet.pack_size,
			image: bouquet.image,
			collections: bouquet.collections,
			tags: bouquet.tags,
			date_added: new Date()
		};
		con.query('INSERT INTO bouquets SET ?', bouquetData, function (error, result) {
			if (error) {
				reject(error);
			} else {
				var id = result.insertId;

				// Successfully added row for bouquet, now to add SRPs
				var promises = [];
				for (var i = 0; i < bouquet.srps.length; i++) {
					var bouSrp = bouquet.srps[i];
					bouSrp.bouquet_id = id;
					promises[i] = module.exports.addSrp(bouSrp);
				}

				Promise.all(promises).then(srpIds => {
					resolve({ id, srpIds });
				}).catch(err => {
					reject(err);
				});
			}
		});

	});
}

module.exports.addSrp = function (srpData) {
	return new Promise((resolve, reject) => {
		srpData.date_added = new Date();
		con.query('INSERT INTO srps SET ?', srpData, function (error, result) {
			if (error) {
				reject(error);
			}
			else {
				resolve(result.id);
			}
		});
	});
}

module.exports.updateBouquet = function (bouquet) {
	return new Promise((resolve, reject) => {
		var bouquetData = {
			name: bouquet.name,
			description: bouquet.description,
			pack_size: bouquet.pack_size,
			collections: bouquet.collections,
			tags: bouquet.tags
		};
		if (bouquet.image != null) {
			bouquetData.image = bouquet.image;
		}
		console.log("Updating bouquet: " + JSON.stringify(bouquet));

		con.query('UPDATE bouquets SET ? WHERE bouquet_id = ?', [bouquetData, bouquet.bouquet_id], function (error, result) {
			if (error) {
				console.log('Error editing bouquet: ' + JSON.stringify(error));
				reject(error);
			} else {
				console.log("Successfully edited bouquet " + bouquet.bouquet_id);
				resolve();
			}
		});
	});
}

module.exports.editSrp = function (srp) {
	return new Promise((resolve, reject) => {
		console.log('dbSrpEdit: ' + JSON.stringify(srp));
		if (!srp || !srp.srp_id) {
			return reject("Invalid SRP or SRP id given.");
		}

		var srpData = {
			name: srp.name,
			srp: srp.srp,
			stems: srp.stems
		};
		if (srp.image != null) {
			srpData.image = srp.image;
		}
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

module.exports.getBouquets = function () {
	return new Promise((resolve, reject) => {
		con.query('SELECT * FROM bouquets', function (err, rows) {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows);
			}
		});
	});
}

module.exports.getBouquet = function (bouquetId) {
	return new Promise((resolve, reject) => {
		con.query('SELECT * FROM bouquets WHERE bouquet_id = ?', bouquetId, function (error, rows) {
			if (error) {
				reject(error);
			}
			else {
				resolve(rows[0]);
			}
		});
	});
}

module.exports.getBouquetSrps = function (bouquetId) {
	return new Promise((resolve, rejct) => {
		con.query('SELECT * FROM srps WHERE bouquet_id = ?', bouquetId, function (err, rows) {
			if (err) reject(err);
			resolve(rows);
		});
	});
}

module.exports.getSrp = function (srpId) {
	return new Promise((resolve, reject) => {
		con.query('SELECT * FROM srps WHERE srp_id = ?', srpId, function (error, rows) {
			if (error) {
				console.log('SQL error getting srp with srp_id ' + srpId + ', error: ' + JSON.stringify(error));
				reject(error);
			}
			else {
				if (!rows || rows[0] == null) {
					reject('No SRP with srp_id ' + srpId + ' exists.');
				}
				else {
					resolve(rows[0]);
				}
			}
		});
	});
}

module.exports.deleteSrp = function (srpId) {
	return new Promise((resolve, reject) => {
		con.query('DELETE FROM srps WHERE srp_id = ?', srpId, function (error, result) {
			if (error) {
				console.log('SQL error removing srp with srp_id ' + srp_id + ', error: ' + JSON.stringify(error));
				reject(error);
			}
			else {
				resolve();
			}
		});
	});
}

module.exports.removeBouquet = function (bouquetId) {
	return new Promise((resolve, reject) => {
		con.query('DELETE FROM srps WHERE bouquet_id = ?', bouquetId, function (error, result) {
			if (error) {
				console.log('SQL error removing srps with bouquet id ' + bouquetId + ', error: ' + JSON.stringify(error));
				reject(error);
			}
			else {
				con.query('DELETE FROM bouquets WHERE bouquet_id = ?', bouquetId, function (error, result) {
					if (error) {
						console.log('SQL error removing bouquet ' + bouquetId + ', error: ' + JSON.stringify(error));
						reject(error);
					}
					else {
						resolve(bouquetId);
					}
				});
			}
		});
	});
}