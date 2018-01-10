import Vue from 'vue';

export default {
	addBouquet(bouquet) {
		return new Promise((resolve, reject) => {
			console.log("Adding bouquet...");

			var formData = new FormData();

			var apiUrl = '/api/bouquets/add';
			
			if(bouquet.image) {
				apiUrl += 'withimage';
				formData.append('image', bouquet.image);				
			}
			formData.append('name', bouquet.name);
			formData.append('price', bouquet.price);
			formData.append('collections', bouquet.collections.join());
			formData.append('packSize', bouquet.packSize);
			formData.append('tags', bouquet.tags.join());

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
				reject("Unable to send add bouquet request. Error: " + JSON.stringify(err));
			})
			
		});
	},
	editBouquet(bouquet) {
		return new Promise((resolve, reject) => {
			console.log("Editing bouquet...");

			var formData = new FormData();

			var apiUrl = '/api/bouquets/edit';
			
			if(!bouquet.pictureRemoved && bouquet.pictureChanged && bouquet.image != null && bouquet.image != 'null') {
				apiUrl += 'withimage';
				formData.append('image', bouquet.image);
			}

			console.log("pictureRemoved status: " + bouquet.pictureRemoved);
			console.log("apiUrl: " + apiUrl);
			
			formData.append('name', bouquet.name);
			formData.append('price', bouquet.price);
			formData.append('collections', bouquet.collections.join());
			formData.append('packSize', bouquet.packSize);
			formData.append('tags', bouquet.tags.join());
			formData.append('id', bouquet.id);
			formData.append('pictureRemoved', bouquet.pictureRemoved);
			formData.append('pictureChanged', bouquet.pictureChanged);
			
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
				reject("Unable to send edit bouquet request. Error: " + JSON.stringify(err));
			});
			
		});
	},
	getBouquets() {
		return new Promise((resolve, reject) => {
			Vue.http.get('/api/bouquets')
			.then(res => {
				if(res && res.status == 200 && res.body) {
					resolve(res.body);
				} else {
					reject("Unable to get bouquets.");					
				}
			}).catch(err => {
				reject("Unable to get bouquets. Error: " + JSON.stringify(err));
			});
		});
	},
	removeBouquet(bouquetId) {
		return new Promise((resolve, reject) => {
			Vue.http.post('/api/bouquets/delete', {id: bouquetId})
			.then(res => {
				console.log("Got here, response: " + JSON.stringify(res));

				if(res.status == 200) {
					resolve(bouquetId);
				}
				else {
					reject({"error": res.error});
				}
			}).catch(error => {
				reject('Failed to remove bouquet.');
				console.error("Error sending remove bouquet request err: ", error);
			});
		});
	}
}