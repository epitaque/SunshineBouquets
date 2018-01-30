import Vue from 'vue';

export default {
	getDivisions() {
		return new Promise((resolve, reject) => {
			var apiUrl = '/api/divisions';

			Vue.http.post(apiUrl, {}).then(res => {
				if(res.status == 200 && res.body) {
					resolve(res.body);
				}
				else {
					reject("Error getting divisions.");
				}
			}).catch(error => {
				reject("Unable to send get divisions. Error: " + JSON.stringify(error));
			});
		});
	},
	addDivision(name) {
		return new Promise((resolve, reject) => {
			var apiUrl = '/api/divisions/add';

			console.log("Adding division with name " + name);

			Vue.http.post(apiUrl, { name }).then(res => {
				if(res.status == 200 && res.body && res.body.division_id) {
					resolve(res.body.division_id);
				}
				else {
					reject("Error adding division.");
				}
			}).catch(error => {
				reject("Unable to add division. Error: " + JSON.stringify(error));
			});
		});
	},
	editDivision(division_id, name, addedEmails, deletedItemIds) {
		return new Promise((resolve, reject) => {
			var apiUrl = '/api/divisions/edit';

			var divisionData = {
				division_id,
				name,
				addedEmails,
				deletedItemIds		
			}

			Vue.http.post(apiUrl, divisionData).then(res => {
				if(res.status == 200) {
					resolve();
				}
				else {
					reject("Error editing division.");
				}
			}).catch(error => {
				reject("Unable to edit division. Error: " + JSON.stringify(error));
			});	
		});
	},
	removeDivision(division_id) {
		return new Promise((resolve, reject) => {
			var apiUrl = '/api/divisions/delete';

			Vue.http.post(apiUrl, { division_id }).then(res => {
				if(res.status == 200) {
					resolve();
				}
				else {
					reject("Error removing division.");
				}
			}).catch(error => {
				reject("Unable to remove division. Error: " + JSON.stringify(error));
			});	
		});
	}
}