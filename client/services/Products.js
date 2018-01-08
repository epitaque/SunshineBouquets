import Vue from 'vue';

export default {
	addProduct(product) {
		return new Promise((resolve, reject) => {
			console.log("Adding product...");

			var formData = new FormData();

			var apiUrl = '/api/products/add';
			
			if(product.image) {
				apiUrl += 'withimage';
				formData.append('image', product.image);				
			}
			formData.append('name', product.name);
			formData.append('price', product.price);
			formData.append('collections', product.collections.join());
			formData.append('packSize', product.packSize);
			formData.append('tags', product.tags.join());

			Vue.http.post(apiUrl, formData, 
				{ headers: { 'Content-Type': 'multipart/form-data' }
			}).then(res => {
				if(res.status == 200 && res.body && res.body.id) {
					resolve(res.body.id);
				}
				else {
					reject();
				}
			}).catch(err => {
				reject("Unable to send add product request. Error: " + JSON.stringify(err));
			})
			
		});
	},
	editProduct(product) {
		return new Promise((resolve, reject) => {
			console.log("Editing product...");

			var formData = new FormData();

			var apiUrl = '/api/products/edit';
			
			if(!product.pictureRemoved && product.pictureChanged && product.image != null && product.image != 'null') {
				apiUrl += 'withimage';
				formData.append('image', product.image);
			}

			console.log("pictureRemoved status: " + product.pictureRemoved);
			console.log("apiUrl: " + apiUrl);
			
			formData.append('name', product.name);
			formData.append('price', product.price);
			formData.append('collections', product.collections.join());
			formData.append('packSize', product.packSize);
			formData.append('tags', product.tags.join());
			formData.append('id', product.id);
			formData.append('pictureRemoved', product.pictureRemoved);
			formData.append('pictureChanged', product.pictureChanged);
			
			Vue.http.post(apiUrl, formData, 
				{ headers: { 'Content-Type': 'multipart/form-data' }
			}).then(res => {
				if(res.status == 200 && res.body && res.body.id) {
					resolve(res.body.id);
				}
				else {
					reject();
				}
			}).catch(err => {
				reject("Unable to send edit product request. Error: " + JSON.stringify(err));
			});
			
		});
	},
	getProducts() {
		return new Promise((resolve, reject) => {
			Vue.http.get('/api/products')
			.then(res => {
				if(res && res.status == 200 && res.body) {
					resolve(res.body);
				} else {
					reject("Unable to get products.");					
				}
			}).catch(err => {
				reject("Unable to get products. Error: " + JSON.stringify(err));
			});
		});
	},
	removeProduct(productId) {
		return new Promise((resolve, reject) => {
			Vue.http.post('/api/products/delete', {id: productId})
			.then(res => {
				console.log("Got here, response: " + JSON.stringify(res));

				if(res.status == 200) {
					resolve(productId);
				}
				else {
					reject({"error": res.error});
				}
			}).catch(error => {
				reject('Failed to remove product.');
				console.error("Error sending remove product request err: ", error);
			});
		});
	}
}