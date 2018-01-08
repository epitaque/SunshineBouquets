export const getUser = (state) => {
	return state.user;
}

export const isLoggedIn = (state) => {
	return state.user !== null;
}

export const product = (state) => (id) => {
	return state.products[id];
} 

export const products = (state) => {
	return Object.values(state.products);
}

export const cart = (state) => {
	return state.cart
}