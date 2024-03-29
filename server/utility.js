var fs = require('fs');
var path = require('path');

module.exports.deleteImage = function (incompletePath) {
	return new Promise((resolve, reject) => {
		console.log("deleteImage incompletePath: " + incompletePath);

		var url = '';

		try {
			url = path.join(__dirname, '../', incompletePath);
		}
		catch (err) {
			resolve();
		}

		console.log("Attempting to delete image at path " + url);

		fs.unlink(url, function (err) {
			if (err && err.code == 'ENOENT') {
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