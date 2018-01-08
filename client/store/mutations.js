import Vue from 'vue';

export const setUser = (state, user) => {
	Vue.set(state, 'user', user);
	//state.user = user;
}

export const logout = (state) => {
	Vue.set(state, 'user', null);
}

export const addProductIdToCart = (state, productId) => {
	Vue.set(state.products[productId], 'inCart', true);
	//state.products[productId].inCart = true;	
	state.cart.productIds.push(productId);
}

export const removeProductIdFromCart = (state, productId) => {
	Vue.set(state.products[productId], 'inCart', false);	
	for(var i = 0; i < state.cart.productIds.length; i++) {
		if(state.cart.productIds[i] == productId) {
			state.cart.productIds.splice(i, 1);
			return;
		}
	}
}

export const setProducts = (state, {productsObject, uniqueTags, uniqueCollections}) => {
	//console.log("args: " + args);
	//console.log("setProducts args.uniqueTags: " + args['uniqueTags']);
	Vue.set(state, 'products', productsObject);
	Vue.set(state, 'uniqueTags', uniqueTags);
	Vue.set(state, 'uniqueCollections', uniqueCollections);	
}

export const updateCartNote = (state, text) => {
	Vue.set(state.cart, 'note', text);
}