import Vue from 'vue';

export default {
	register(user) { // user: { "name": "Brian", "email": "asdf@fd.co", "password":"asdf" }
		return new Promise((resolve, reject) => {
			Vue.http.post('/api/auth/register', user)
			.then(res => {
				console.log("Got here, response: " + JSON.stringify(res));

				if(res.status == 200) {
					resolve(user);
				}
				else {
					reject({"error": res.error});
				}
			}).catch(error => { // called if Vue.http.post fails
				reject({"error": 'Unable to send register request.'});
				console.error("Error sending register request err: ", error);
			});
		});

	},
	login(info) { // info: { rememberMe: true, user: {"email": "asdf@fd.co", "password": "asdf"}}
		console.log("logging in with info: " + JSON.stringify(info));
		return new Promise((resolve, reject) => {
			Vue.http.post('/api/auth/login', info)
			.then(res => {
				//var body = res.body;
				if(!res) reject("Undefined response.");
				if(!res.status) reject("Undefined response code.");				
				if(res.status == 200) {
					resolve(res.body.user);
				}
				else {
					reject(res.body.error);
				}
			}).catch(error => { // called if Vue.http.post fails
				if(error.body) {
					reject(error.body.error);
				}
				else {
					reject('Unable to send login request.');
				}
				console.error("Error sending login request", JSON.stringify(error));
			});
		});
	},
	logout() {
		return new Promise((resolve, reject) => {
			Vue.http.post('/api/auth/logout')
			.then(res => {
				if(res.status == 200) {
					resolve("success");
				}
			}).catch(error => {
				if(error && error.body) {
					reject(error.body.error);
				}
				else {
					reject('Unable to send logout request.');
				}
				console.error("Error sending logout request", error);
			});
		});
	}
}