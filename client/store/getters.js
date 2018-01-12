export const getUser = (state) => {
	return state.user;
}

export const isLoggedIn = (state) => {
	return state.user !== null;
}

export const tempSrps = (state) => {
	return Object.values(state.tempSrps);
}

export const tempSrp = (state) => (id) => {
	return state.tempSrps[id];
}

export const tempSrpKeys = (state) => {
	return Object.keys(state.tempSrps);
}

export const bouquet = (state) => (id) => {
	for(var i = 0; i < state.bouquets.length; i++) {
		if(state.bouquets[i].id == id) {
			return state.bouquets[i];
		}
	}
	return null;
} 

export const bouquets = (state) => {
	console.log("Bouquets getter printing state: " + JSON.stringify(state));
	return state.bouquets;
}

export const cart = (state) => {
	return state.cart
}