var db = require('../database/products');
var fs = require('fs');
const path = require('path');

module.exports.addProduct = (req, res, next) => {		
	db.addProduct({
		name: req.body.name,
		image: req.file == null ? '' : req.file.path,
		price: req.body.price,
		packSize: req.body.packSize,
		collections: req.body.collections,
		tags: req.body.tags,	
	}).then(id_ => {
		res.status(200).json({ id: id_ });
	}).catch(err => {
		res.status(500).json({error: "Unable to add product: " + err});	
	});

}

module.exports.editProduct = (req, res, next) => {
	console.log("editProduct request done. req.body stringified: " + JSON.stringify(req.body));
	
	var newProduct = {
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
		deleteProductImage(req.body.id).then(_ => {
			newProduct.image = '';		
			updateProduct(newProduct, res);			
		});		
	}
	else if(req.body.pictureChanged == 'true' && req.file != null) {
		console.log("Changing image path, because req.body.pictureChanged = " + req.body.pictureChanged);

		deleteProductImage(req.body.id).then(_ => {
			newProduct.image = req.file.path;
			updateProduct(newProduct, res);			
		});
	}
	else {
		updateProduct(newProduct, res);
	}
}

function updateProduct (newProduct, res) {
	db.editProduct(newProduct).then(id_ => {
		console.log("Successfully edited product");
		res.status(200).json({ id: id_ });
	}).catch(err => {
		console.log("Unsuccessfully edited product: " + err);		
		res.status(500).json({error: "Unable to edit product: " + err});	
	});
}

module.exports.getProducts = (req, res) => {
	db.getProducts().then(products => {
		res.status(200).json(products);
	}).catch(err => {
		res.status(500).json({error: err});
	})
}

module.exports.removeProduct = (req, res) => {
	console.log("removeProduct called");
	deleteProductImage(req.body.id).then(_ => {
		db.removeProduct(req.body.id).then(_ => {
			console.log("In products.js, sending 200 status");
			res.sendStatus(200).json({id: req.body.id});
		}).catch(err => {
			console.log("In products.js, sending 500 status due to error: " + JSON.stringify(err));		
			res.status(500).json({error: err});
		});	
	});	
}

function deleteProductImage (productId) {
	return new Promise((resolve, reject) => {
		db.getProduct(productId).then(res => {
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