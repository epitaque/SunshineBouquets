import Vue from 'vue';
import { tempMsrps } from './getters';

export const setUser = (state, user) => {
	Vue.set(state, 'user', user);
	//state.user = user;
}

export const logout = (state) => {
	Vue.set(state, 'user', null);
}

export const addMsrpId = (state, msrpId) => {

}

export const addTempMsrp = (state, msrpId = Math.round(Math.random() * 1000000)) => {
	tempMsrps[msrpId] = {};
	return msrpId;
}

export const removeTempMsrp = (state, msrpId) => {
	delete tempMsrps[msrpId];
}

export const addMsrpIdToCart = (state, bouquetId) => {
	Vue.set(state.msrps[msrpId], 'inCart', true);
	//state.bouquets[bouquetId].inCart = true;	
	state.cart.msrpIds.push(msrpId);
}

export const removeMsrpIdFromCart = (state, msrpId) => {
	Vue.set(state.msrps[msrpId], 'inCart', false);	
	for(var i = 0; i < state.cart.msrpsIds.length; i++) {
		if(state.cart.msrpIds[i] == msrpsId) {
			state.cart.msrpsIds.splice(i, 1);
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