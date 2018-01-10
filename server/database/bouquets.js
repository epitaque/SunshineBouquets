var con = require('./init').connection;

module.exports.addBouquet = (bouquet) => {
	var today = new Date();
	return new Promise((resolve, reject) => {
		var bouquetData = {
			name: bouquet.name,
			image: bouquet.image,
			price: bouquet.price,
			packSize: bouquet.packSize,
			collections: bouquet.collections,
			tags: bouquet.tags,
			dateadded: today
		};
		con.query('INSERT INTO bouquets SET ?', bouquetData, function (error, result) {
			if (error) {
				reject(error);
			} else {
				resolve(result.insertId);
			}
		});
	
	});
}

module.exports.editBouquet = (bouquet) => {
	return new Promise((resolve, reject) => {
		var bouquetData = {
			name: bouquet.name,
			price: bouquet.price,
			packSize: bouquet.packSize,
			collections: bouquet.collections,
			tags: bouquet.tags
		};
		if(bouquet.image != null) bouquetData.image = bouquet.image;
		console.log("About to edit bouquet");		
		con.query('UPDATE bouquets SET ? WHERE bouquet_id = ?', [bouquetData, bouquet.id], function (error, result) {
			if (error) {
				console.log("error editing bouquet: " + JSON.stringify(error));
				reject(error);
			} else {
				resolve(bouquet.id);
			}
		});
	});
}

module.exports.getBouquets = () => {
	return new Promise((resolve, reject) => {
		con.query("SELECT * FROM bouquets", (err, rows) => {
			if (err) reject(err);
			resolve(rows);
		});
	});
}

module.exports.getBouquet = (bouquetId) => {
	return new Promise((resolve, reject) => {
		con.query("SELECT * FROM bouquets WHERE bouquet_id = ?", bouquetId, (err, rows) => {
			if (err) reject(err);
			resolve(rows[0]);
		});
	});
}

module.exports.removeBouquet = (bouquetId) => {
	console.log("Attempting to delete bouquet " + bouquetId);
	return new Promise((resolve, reject) => {
		try {
			con.query("DELETE FROM bouquets WHERE bouquet_id = ?", bouquetId, (error, result) => {
				if(error) {
					console.log("SQL error removing bouquet " + bouquetId + ", error: " + JSON.stringify(error));
					reject(error);
				}
				else {
					console.log("Resolving due to success");								
					resolve(bouquetId);
				}
			});
			console.log("JS after query");			
		}
		catch(err) {
			console.log("Javascript error deleting bouquet");
		}
	});
}