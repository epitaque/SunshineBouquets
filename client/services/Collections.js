import Vue from 'vue';

export default {
	addCollection(collection) {
		return new Promise((resolve, reject) => {

			var formData = new FormData();
			var apiUrl = '/api/collections/add';
			
			var containsImages = false;
			var imageIndex = 0;

			formData.append('name', collection.name);
			formData.append('description', collection.description);	
			if(collection.imageFile) { 
				formData.append('images[]', collection.imageFile); 
				formData.append('imageIndex', imageIndex++);
				containsImages = true;								
			}
			else {
				formData.append('imageIndex', -1);
			}
			
			for(var i = 0; i < collection.items.length; i++) {
				var item = {};
				item.bouquet_id = collection.items[i];
				formData.append('collectionItems[]', JSON.stringify(item));		
			}

			if(containsImages) {
				apiUrl += 'withimage';				
			}
			console.log("Adding collection. ApiURL: " + apiUrl);

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
				reject("Unable to send add collection request. Error: " + JSON.stringify(err));
			})
			
		});
	},
	editCollection(collection, deletedSrps) {
		return new Promise((resolve, reject) => {
			console.log("Editing collection: " + JSON.stringify(collection));

			var formData = new FormData();
			var apiUrl = '/api/collections/edit';
			var containsImages = false;
			var imageIndex = 0;

			if(!collection.pictureRemoved && collection.pictureChanged && collection.imageFile) {
				containsImages = true;
				formData.append('images[]', collection.imageFile); 
				formData.append('imageIndex', imageIndex++);
			} else {
				formData.append('imageIndex', -1);
			}

			formData.append('name', collection.name);
			formData.append('collections', collection.collections.join());
			formData.append('pack_size', collection.pack_size);
			formData.append('tags', collection.tags.join());
			formData.append('collection_id', collection.collection_id);
			formData.append('pictureRemoved', collection.pictureRemoved);
			formData.append('pictureChanged', collection.pictureChanged);
			formData.append('deletedSrps', JSON.stringify(deletedSrps));

			for(var i = 0; i < collection.items.length; i++) {
				var bouSrp = collection.items[i];

				console.log("bouSrp[ " + i + "]: " + JSON.stringify(bouSrp));

				var itemData = {
					item: bouSrp.item,
					name: bouSrp.name,
					stems: bouSrp.stems,
					pictureChanged: bouSrp.pictureChanged ? true : false,
					pictureRemoved: bouSrp.pictureRemoved ? true : false,
					imageIndex: -1
				};

				if(!bouSrp.pictureRemoved && bouSrp.pictureChanged && bouSrp.imageFile) {
					formData.append('images[]', bouSrp.imageFile);
					containsImages = true;
					itemData.imageIndex = imageIndex++;
				} 

				if(!bouSrp.item_id) {
					itemData.new = true;
				}
				else {
					itemData.item_id = bouSrp.item_id;
				}

				var stringified = JSON.stringify(itemData);
				console.log('stringified item: ' + stringified);

				formData.append('items[]', stringified);
			}

			if(containsImages) {
				apiUrl += 'withimage';
	-			formData.append('image', collection.image);
			}

			console.log("pictureRemoved status: " + collection.pictureRemoved);
			console.log("apiUrl: " + apiUrl);
			
			
			Vue.http.post(apiUrl, formData, 
				{ headers: { 'Content-Type': 'multipart/form-data' }
			}).then(res => {
				if(res.status == 200 && res.body && res.body.id) {
					resolve(res.body.id);
				}
				else {
					reject("Unable to edit collection. Error: " + res.body.error);
				}
			}).catch(err => {
				reject("Unable to send edit collection request. Error: " + JSON.stringify(err));
			});
			
		});
	},
	getCollections() {
		console.log("Getting collections");
		return new Promise((resolve, reject) => {
			Vue.http.get('/api/collections')
			.then(res => {
				if(res && res.status == 200 && res.body) {
					console.log(JSON.stringify(res.body));
					resolve(res.body);
				} else {
					reject("Unable to get collections.");					
				}
			}).catch(err => {
				reject("Unable to get collections. Error: " + JSON.stringify(err));
			});
		});
	},
	removeCollection(collectionId) {
		return new Promise((resolve, reject) => {
			Vue.http.post('/api/collections/delete', {id: collectionId})
			.then(res => {
				console.log("Got here, response: " + JSON.stringify(res));

				if(res.status == 200) {
					resolve(collectionId);
				}
				else {
					reject({"error": res.error});
				}
			}).catch(error => {
				reject('Failed to remove collection.');
				console.error("Error sending remove collection request err: ", error);
			});
		});
	}
}