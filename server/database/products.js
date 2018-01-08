var con = require('./init').connection;

module.exports.addProduct = (product) => {
	var today = new Date();
	return new Promise((resolve, reject) => {
		var productData = {
			name: product.name,
			image: product.image,
			price: product.price,
			packSize: product.packSize,
			collections: product.collections,
			tags: product.tags,
			dateadded: today
		};
		con.query('INSERT INTO products SET ?', productData, function (error, result) {
			if (error) {
				reject(error);
			} else {
				resolve(result.insertId);
			}
		});
	
	});
}

module.exports.editProduct = (product) => {
	return new Promise((resolve, reject) => {
		var productData = {
			name: product.name,
			price: product.price,
			packSize: product.packSize,
			collections: product.collections,
			tags: product.tags
		};
		if(product.image != null) productData.image = product.image;
		console.log("About to edit product");		
		con.query('UPDATE products SET ? WHERE product_id = ?', [productData, product.id], function (error, result) {
			if (error) {
				console.log("error editing product: " + JSON.stringify(error));
				reject(error);
			} else {
				resolve(product.id);
			}
		});
	});
}

module.exports.getProducts = () => {
	return new Promise((resolve, reject) => {
		con.query("SELECT * FROM products", (err, rows) => {
			if (err) reject(err);
			resolve(rows);
		});
	});
}

module.exports.getProduct = (productId) => {
	return new Promise((resolve, reject) => {
		con.query("SELECT * FROM products WHERE product_id = ?", productId, (err, rows) => {
			if (err) reject(err);
			resolve(rows[0]);
		});
	});
}

module.exports.removeProduct = (productId) => {
	console.log("Attempting to delete product " + productId);
	return new Promise((resolve, reject) => {
		try {
			con.query("DELETE FROM products WHERE product_id = ?", productId, (error, result) => {
				if(error) {
					console.log("SQL error removing product " + productId + ", error: " + JSON.stringify(error));
					reject(error);
				}
				else {
					console.log("Resolving due to success");								
					resolve(productId);
				}
			});
			console.log("JS after query");			
		}
		catch(err) {
			console.log("Javascript error deleting product");
		}
	});
}