import Vue from 'vue';

export const setUser = (state, user) => {
	Vue.set(state, 'user', user);
	//state.user = user;
}

export const logout = (state) => {
	Vue.set(state, 'user', null);
}

export const addSrpId = (state, srpId) => {

}

var uid = 0;
export const addTempSrp = (state, deletable) => {
	var srpId = uid++;
	Vue.set(state.tempSrps, srpId, { srp_id: srpId, deletable: deletable, initialized: false })
	return srpId;
}

export const removeTempSrp = (state, srpId) => {
	//delete state.tempSrps[srpId];
	Vue.delete(state.tempSrps, srpId);
}

export const addSrpIdToCart = (state, bouquetId) => {
	Vue.set(state.srps[srpId], 'inCart', true);
	//state.bouquets[bouquetId].inCart = true;	
	state.cart.srpIds.push(srpId);
}

export const removeSrpIdFromCart = (state, srpId) => {
	Vue.set(state.srps[srpId], 'inCart', false);	
	for(var i = 0; i < state.cart.srpsIds.length; i++) {
		if(state.cart.srpIds[i] == srpsId) {
			state.cart.srpsIds.splice(i, 1);
			return;
		}
	}
}

export const setBouquets = (state, {bouquets, uniqueTags, uniqueCollections}) => {
	//console.log("args: " + args);
	//console.log("setBouquets args.uniqueTags: " + args['uniqueTags']);
	Vue.set(state, 'bouquets', bouquets);
	Vue.set(state, 'uniqueTags', uniqueTags);
	Vue.set(state, 'uniqueCollections', uniqueCollections);	
}

export const updateCartNote = (state, text) => {
	Vue.set(state.cart, 'note', text);
}