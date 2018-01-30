var multer = require('multer');
var path = require('path');
var sharp = require('sharp');

/*

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/bouquets/')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
	}
})

*/

function getFilename (req, file, cb) {
	crypto.pseudoRandomBytes(16, function (err, raw) {
		cb(err, err ? undefined : raw.toString('hex'))
	})
  }  

var storage = multer.memoryStorage();
module.exports.multer = multer({ storage }).array('images[]');

module.exports.resizer = (req, res, next) => {
	var files = req.files;

	console.log("resizer received file data");
	var promises = [];
	for(var i = 0; i < files.length; i++) {
		var file = files[i];
		var fileName = Math.floor(Math.random() * 1000000000) + '.png';
		var partialDestination = '\\uploads\\images\\' + fileName;
		var fullDestination = path.join(__dirname, '../' + partialDestination);
		var promise = sharp(file.buffer)
			.resize(500, 500)
			.toFile(fullDestination);
		file.path = partialDestination;
		promises.push(promise);
	}
	
	Promise.all(promises).then(_ => {
		next();
	}).catch(error => {
		console.error("Error in resizing files: error");
		res.status(500).json({ error: "Unable to upload files" });
	});
}

module.exports.bannerResizer = (req, res, next) => {
	var files = req.files;

	console.log("resizer received file data");
	var promises = [];
	for(var i = 0; i < files.length; i++) {
		var file = files[i];
		var fileName = Math.floor(Math.random() * 1000000000) + '.png';
		var partialDestination = '\\uploads\\images\\' + fileName;
		var fullDestination = path.join(__dirname, '../' + partialDestination);
		var promise = sharp(file.buffer)
			.resize(1000, 250)
			.toFile(fullDestination);
		file.path = partialDestination;
		promises.push(promise);
	}
	
	Promise.all(promises).then(_ => {
		next();
	}).catch(error => {
		console.error("Error in resizing files: error");
		res.status(500).json({ error: "Unable to upload files" });
	});
}