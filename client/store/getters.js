export const getUser = (state) => {
	return state.user;
}

export const isLoggedIn = (state) => {
	return state.user !== null;
}

export const bouquet = (state) => (id) => {
	for(var i = 0; i < state.bouquets.length; i++) {
		if(state.bouquets[i].bouquet_id == id) {
			return state.bouquets[i];
		}
	}
	return null;
} 

export const bouquets = (state) => {
	return state.bouquets;
}

export const collection = (state) => (id) => {
	for(var i = 0; i < state.collections.length; i++) {
		if(state.collections[i].collection_id == id) {
			return state.collections[i];
		}
	}
	return null;
}

export const collections = (state) => {
	return state.collections;
}

export const bouquetsFn = (state) => () => {
	return state.bouquets;
}

export const collectionsFn = (state) => () => {
	return state.collections;
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