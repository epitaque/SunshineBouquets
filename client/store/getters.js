export const getUser = (state) => {
	return state.user;
}

export const isLoggedIn = (state) => {
	return state.user !== null;
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
	return state.bouquets;
}

export const srp = (state) => (id) => {
	for(var i = 0; i < state.srps.length; i++) {
		if(state.srps[i].srp_id == id) {
			return state.srps[i];
		}
	}
	return null;
}

export const cart = (state) => {
	return state.cart
}