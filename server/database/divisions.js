var con = require('./init').connection;

module.exports.getDivision = function (division_id) {
	return new Promise((resolve, reject) => {
		con.query('SELECT * FROM divisions WHERE division_id = ?', division_id, function (err, rows) {
			if (err) {
				reject(err);
			}
			else if(rows == null || rows.length == 0) {
				reject();
			}
			else {
				resolve(rows[0]);
			}
		});
	}).then(division => {
		return new Promise((resolve, reject) => {
			con.query('SELECT * FROM division_items WHERE division_id = ?', division_id, function (error, items) {
				if(error) {
					reject(error);
				}
				else {
					division.division_items = items;
					resolve(division);
				}
			});
		});
	});
}

module.exports.getDivisions = function () {
	return new Promise((resolve, reject) => {
		con.query('SELECT * FROM divisions', function (err, rows) {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows);
			}
		});
	}).then(divisions => {
		return new Promise((resolve, reject) => {
			con.query('SELECT * FROM division_items', function (error, items) {
				if(error) {
					reject(error);
				}
				else {
					for(var i = 0; i < divisions.length; i++) {
						divisions[i].division_items = [];
					}
					for(var i = 0; i < items.length; i++) {
						for(var j = 0; j < divisions.length; j++) {
							if(divisions[j].division_id == items[i].division_id) {
								divisions[j].division_items.push(items[i]);
								break;
							}
						}
					}
					resolve(divisions);
				}
			});
		});
	});
}

module.exports.addDivision = function (name) {
	return new Promise((resolve, reject) => {
		var divisonData = {
			name: name,
			date_added: new Date(),		
		};

		con.query('INSERT INTO divisions SET ?', divisonData, function (error, result) {
			if (error) {
				reject(error);
			} else {
				resolve(result.insertId);
			}
		});
	});
}

module.exports.editDivision = function(division) {
	return new Promise((resolve, reject) => {
		var divisonData = {
			name: division.name
		};

		con.query('UPDATE divisions SET ? WHERE division_id = ?', [divisonData, division.division_id], function (error, result) {
			if (error) {
				reject(error);
			} else {
				resolve(result.insertId);
			}
		});
	});
}

module.exports.removeDivision = function(divisionId) {
	return new Promise((resolve, reject) => {
		con.query('DELETE FROM division_items WHERE division_id = ?', divisionId, function (error, result) {
			if (error) {
				console.log('SQL error removing division_items with division_id id ' + divisionId + ', error: ' + JSON.stringify(error));
				reject(error);
			}
			else {
				con.query('DELETE FROM divisions WHERE division_id = ?', divisionId, function (error, result) {
					if (error) {
						console.log('SQL error removing division ' + divisionId + ', error: ' + JSON.stringify(error));
						reject(error);
					}
					else {
						resolve();
					}
				});
			}
		});
	});
}

module.exports.addDivisionItem = function(divisionItem) {
	return new Promise((resolve, reject) => {
		var divisionItemData = {
			division_id: divisionItem.division_id,
			email: divisionItem.email,
			date_added: new Date()
		}

		con.query('INSERT INTO division_items SET ?', divisionItemData, function (error, result) {
			if (error) {
				reject(error);
			}
			else {
				resolve(result.id);
			}
		});
	
	});
}

module.exports.removeDivisionItem = function(divisionItemId) {
	return new Promise((resolve, reject) => {
		con.query('DELETE FROM division_items WHERE division_item_id = ?', divisionItemId, function (error, result) {
			if (error) {
				console.log('SQL error removing division item' + divisionItemId + ', error: ' + JSON.stringify(error));
				reject(error);
			}
			else {
				resolve();
			}
		});
	});
}