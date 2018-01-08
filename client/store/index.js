import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import createPersistedState from 'vuex-persistedstate'
import createMutationsSharer from 'vuex-shared-mutations'

Vue.use(Vuex);

import getMockData from './mockData';
var mockProducts = getMockData(1000);
var mockUniqueCollections = [];
var mockUniqueTags = [];

for(var i = 0; i < 1000; i++) {
	for(var j = 0; j < mockProducts[i].collections.length; j++) {
		if(mockUniqueCollections.indexOf(mockProducts[i].collections[j]) == -1) {
			mockUniqueCollections.push(mockProducts[i].collections[j]);
		}		
	}
	for(var j = 0; j < mockProducts[i].tags.length; j++) {
		if(mockUniqueTags.indexOf(mockProducts[i].tags[j]) == -1) {
			mockUniqueTags.push(mockProducts[i].tags[j]);
		}
	}
}

export default new Vuex.Store({
	state: {
		user: null,
		products: {},//mockProducts, 
		cart: {
			productIds: [],
			note: ""
		},
		uniqueCollections: [], //mockUniqueCollections,
		uniqueTags: [], //mockUniqueTags
	},
	getters,
	mutations,
	actions,
	plugins: [createPersistedState(), createMutationsSharer({
		predicate: ['setUser', 'logout', 'addProductIdToCart', 'removeProductIdFromCart', 'updateCartNote']  //(mutation, state) => true
	})]
});
