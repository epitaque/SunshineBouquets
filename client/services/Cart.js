import Vue from 'vue';

export default {
	sendOrder(order) {
		return new Promise((reject, resolve) => {
			var apiUrl = '/api/cart/order';
			console.log("Sending order...");

			Vue.http.post(apiUrl, order).then(res => {
				if(res.status == 200) {
					console.log("Status 200, resolving...");
					resolve();
				}
				else {
					reject("Error sending order email.");
				}
			}).catch(error => {
				reject("Unable to send order email.");
			});	
		});
	}
}