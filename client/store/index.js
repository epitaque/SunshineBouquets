import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import createPersistedState from 'vuex-persistedstate'
import createMutationsSharer from 'vuex-shared-mutations'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
		bouquets: [],
		srps: [],
		cart: {
			srpIds: [],
			note: ""
		},
		collections: [],
		uniqueCollections: [], 
		uniqueTags: [],
	},
	getters,
	mutations,
	actions,
	plugins: [createPersistedState(), createMutationsSharer({
		predicate: ['setUser', 'logout', 'addSrpIdToCart', 'removeSrpIdFromCart', 'updateCartNote']  //(mutation, state) => true
	})]
});
