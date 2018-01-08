<template>
	<div style="margin-top: 20px;" class="text-left col-mx-auto column col-6 col-xs-12">
		<h2>Cart</h2>
		<div class="col-12" v-if="productIds.length != 0">
			<div class="columns">
				<product v-for="productId in productIds" viewType="cart" :productId="productId">

				</product>
			</div>

			<div class="form-group">
				<label class="form-label" for="input-example-3">Note</label>
				<textarea :value="note" @input="updateNote" class="form-input" id="input-example-3" rows="3"></textarea>
			</div>

			<div class="form-group">
				<button class="btn btn-primary"><i class="icon icon icon-mail"></i> Send Order Email</button>
			</div>
		</div>

		<p class="text-large text-gray" v-if="user != null && productIds.length == 0"> 
			Your cart is empty. Try adding some <router-link to="/products">products</router-link>.
		</p>
		<p class="text-large text-gray" v-if="user == null">
			Looks like you're not logged in, please <router-link to="/login">Login</router-link> to add items to your cart.
		</p>
	</div>
</template>

<script>
import Product from '../Products/Product';

export default {
	components: {
		'product': Product
	},
	data() {
		return {

		};
	},
	computed: {
		cart() {
			return this.$store.getters.cart;
		},
		productIds() {
			/*var products = [];
			for(var i = 0; i < this.cart.productIds.length; i++) {
				products.push(this.$store.getters.product[this.cart.productIds[i]]);
			}*/

			return this.cart.productIds;
		},
		user() {
			return this.$store.getters.getUser
		},
		note() {
			return this.cart.note;
		}
	},
	methods: {
		updateNote(e) {
			this.$store.commit('updateCartNote', e.target.value)
		}
	},
	created() {
		console.log("Cart component loaded");
	}
};
</script>