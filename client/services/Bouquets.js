import Vue from 'vue';

export default {
	addBouquet(bouquet) {
		return new Promise((resolve, reject) => {
			console.log("Adding bouquet...");

			var formData = new FormData();
			var apiUrl = '/api/bouquets/add';
			
			var containsImages = false;
			var imageIndex = 0;

			formData.append('name', bouquet.name);
			formData.append('description', bouquet.description);	
			formData.append('pack_size', bouquet.packSize);
			if(bouquet.image) { 
				formData.append('images[]', bouquet.image); 
				formData.append('imageIndex', imageIndex++);
				containsImages = true;								
			}
			else {
				formData.append('imageIndex', -1);
			}
			formData.append('collections', bouquet.collections.join());
			formData.append('tags', bouquet.tags.join());
			
			for(var i = 0; i < bouquet.srps.length; i++) {
				var srp = {};
				if(bouquet.srps[i].imageFile) {
					srp.imageIndex = imageIndex++;
					formData.append('images[]', bouquet.srps[i].imageFile);
					containsImages = true;
				}
				else {
					srp.imageIndex = -1;
				}
				srp.srp = bouquet.srps[i].srp;
				srp.name = bouquet.srps[i].name;
				srp.stems = bouquet.srps[i].stems;
				formData.append('srps[]', JSON.stringify(srp));		
			}

			if(containsImages) {
				apiUrl += 'withimage';				
			}

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
	editBouquet(bouquet, deletedSrps) {
		return new Promise((resolve, reject) => {
			console.log("Editing bouquet: " + JSON.stringify(bouquet));

			var formData = new FormData();
			var apiUrl = '/api/bouquets/edit';
			var containsImages = false;
			var imageIndex = 0;

			if(!bouquet.pictureRemoved && bouquet.pictureChanged && bouquet.imageFile) {
				containsImages = true;
				formData.append('images[]', bouquet.imageFile); 
				formData.append('imageIndex', imageIndex++);
			} else {
				formData.append('imageIndex', -1);
			}

			formData.append('name', bouquet.name);
			formData.append('collections', bouquet.collections.join());
			formData.append('pack_size', bouquet.pack_size);
			formData.append('tags', bouquet.tags.join());
			formData.append('bouquet_id', bouquet.bouquet_id);
			formData.append('pictureRemoved', bouquet.pictureRemoved);
			formData.append('pictureChanged', bouquet.pictureChanged);
			formData.append('deletedSrps', JSON.stringify(deletedSrps));

			for(var i = 0; i < bouquet.srps.length; i++) {
				var bouSrp = bouquet.srps[i];

				console.log("bouSrp[ " + i + "]: " + JSON.stringify(bouSrp));

				var srpData = {
					srp: bouSrp.srp,
					name: bouSrp.name,
					stems: bouSrp.stems,
					pictureChanged: bouSrp.pictureChanged ? true : false,
					pictureRemoved: bouSrp.pictureRemoved ? true : false,
					imageIndex: -1
				};

				if(!bouSrp.pictureRemoved && bouSrp.pictureChanged && bouSrp.imageFile) {
					formData.append('images[]', bouSrp.imageFile);
					containsImages = true;
					srpData.imageIndex = imageIndex++;
				} 

				if(!bouSrp.srp_id) {
					srpData.new = true;
				}
				else {
					srpData.srp_id = bouSrp.srp_id;
				}

				var stringified = JSON.stringify(srpData);
				console.log('stringified srp: ' + stringified);

				formData.append('srps[]', stringified);
			}

			if(containsImages) {
				apiUrl += 'withimage';
	-			formData.append('image', bouquet.image);
			}

			console.log("pictureRemoved status: " + bouquet.pictureRemoved);
			console.log("apiUrl: " + apiUrl);
			
			
			Vue.http.post(apiUrl, formData, 
				{ headers: { 'Content-Type': 'multipart/form-data' }
			}).then(res => {
				if(res.status == 200 && res.body && res.body.id) {
					resolve(res.body.id);
				}
				else {
					reject("Unable to edit bouquet. Error: " + res.body.error);
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