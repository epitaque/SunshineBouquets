var db = require('../database/divisions');

module.exports.getDivisions = function(req, res) {
	db.getDivisions().then(divisions => {
		res.status(200).json(divisions);
	}).catch(error => {
		console.log("error getting divisions: " + error);
		res.status(500).json({ error });
	});
}

module.exports.addDivision = function(req, res) {
	var name = req.body.name;
	console.log("Adding division with name " + name);

	db.addDivision(name).then(division_id => {
		console.log("Successfully added division! id: " + division_id);
		res.status(200).json({division_id});
	}).catch(error => {
		console.log("Failed to add division!: " + error);
		res.status(500).json({ error });
	});
}

module.exports.removeDivision = function(req, res) {
	var divisionId = req.body.division_id;

	db.removeDivision(divisionId).then(_ => {
		res.sendStatus(200);
	}).catch(error => {
		res.status(500).json({ error });
	});
}

module.exports.editDivision = function(req, res) {
	var divisionId = req.body.division_id;
	var name = req.body.name;
	var addedEmails = req.body.addedEmails;
	var deletedItemIds = req.body.deletedItemIds;

	console.log("Req.body.addedemails: " + JSON.stringify(addedEmails));
	console.log("Req.body.deletedItemIds: " + JSON.stringify(deletedItemIds));

	var division = {
		division_id: divisionId,
		name
	}

	var promises = [];
	promises.push(db.editDivision(division));
	for(var i = 0; i < addedEmails.length; i++) {
		console.log("division item: " + addedEmails[i]);
		var item = {
			division_id: divisionId,
			email: addedEmails[i]
		}

		promises.push(db.addDivisionItem(item));
	}
	for(var i = 0; i < deletedItemIds.length; i++) {
		promises.push(db.removeDivisionItem(deletedItemIds[i]));
	}

	Promise.all(promises).then(_ => {
		res.sendStatus(200);
	}).catch(error => {
		res.status(500).json({ error });
	});
}