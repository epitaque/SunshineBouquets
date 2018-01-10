<template>
	<div style="margin-top: 20px;" class="text-left col-mx-auto column col-6 col-xs-12">
		<h2>Cart</h2>
		<div class="col-12" v-if="bouquetIds.length != 0">
			<div class="columns">
				<bouquet v-for="bouquetId in bouquetIds" viewType="cart" :bouquetId="bouquetId">

				</bouquet>
			</div>

			<div class="form-group">
				<label class="form-label" for="input-example-3">Note</label>
				<textarea :value="note" @input="updateNote" class="form-input" id="input-example-3" rows="3"></textarea>
			</div>

			<div class="form-group">
				<button class="btn btn-primary"><i class="icon icon icon-mail"></i> Send Order Email</button>
			</div>
		</div>

		<p class="text-large text-gray" v-if="user != null && bouquetIds.length == 0"> 
			Your cart is empty. Try adding some <router-link to="/bouquets">bouquets</router-link>.
		</p>
		<p class="text-large text-gray" v-if="user == null">
			Looks like you're not logged in, please <router-link to="/login">Login</router-link> to add items to your cart.
		</p>
	</div>
</template>

<script>
import Bouquet from '../Bouquets/Bouquet';

export default {
	components: {
		'bouquet': Bouquet
	},
	data() {
		return {

		};
	},
	computed: {
		cart() {
			return this.$store.getters.cart;
		},
		bouquetIds() {
			/*var bouquets = [];
			for(var i = 0; i < this.cart.bouquetIds.length; i++) {
				bouquets.push(this.$store.getters.bouquet[this.cart.bouquetIds[i]]);
			}*/

			return this.cart.bouquetIds;
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