import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import createPersistedState from 'vuex-persistedstate'
import createMutationsSharer from 'vuex-shared-mutations'

Vue.use(Vuex);

//import getMockData from './mockData';

export default new Vuex.Store({
	state: {
		user: null,
		tempMsrps: {},
		tempBouquet: {},
		bouquets: [],
		msrps: [],
		cart: {
			msrpIds: [],
			note: ""
		},
		uniqueCollections: [], 
		uniqueTags: [],
	},
	getters,
	mutations,
	actions,
	plugins: [createPersistedState(), createMutationsSharer({
		predicate: ['setUser', 'logout', 'addMsrpIdToCart', 'removeMsrpIdFromCart', 'updateCartNote']  //(mutation, state) => true
	})]
});
