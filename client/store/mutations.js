import Vue from 'vue';

export const setUser = (state, user) => {
	Vue.set(state, 'user', user);
	//state.user = user;
}

export const logout = (state) => {
	Vue.set(state, 'user', null);
}

export const addSrpIdToCart = (state, srpId) => {
	if(state.cart.srpIds.indexOf(srpId) != -1) return;
	state.cart.srpIds.push(srpId);
}

export const removeSrpIdFromCart = (state, srpId) => {
	var index = state.cart.srpIds.indexOf(srpId);
	if(index == -1) return;
	state.cart.srpIds.splice(index, 1);
}

export const setBouquets = (state, {bouquets, uniqueTags, uniqueCollections}) => {
	//console.log("args: " + args);
	//console.log("setBouquets args.uniqueTags: " + args['uniqueTags']);
	Vue.set(state, 'bouquets', bouquets);
	Vue.set(state, 'uniqueTags', uniqueTags);
	Vue.set(state, 'uniqueCollections', uniqueCollections);	
}

export const setSrps = (state, srps) => {
	Vue.set(state, 'srps', srps);
}

export const updateCartNote = (state, text) => {
	Vue.set(state.cart, 'note', text);
}