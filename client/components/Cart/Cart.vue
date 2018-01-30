<template>
	<div style="margin-top: 20px;" class="text-left col-mx-auto column col-9 col-lg-12">
		<h2 class="text-center">Cart</h2>
		<div class="col-12" v-if="srpIds.length != 0">
			<SRP v-for="srpId in srpIds" viewType="cart" :id="srpId" :key="srpId">
			</SRP>

			<div class="form-group">
				<label class="form-label" for="input-example-3">Note</label>
				<textarea :value="note" @input="updateNote" class="form-input" id="input-example-3" rows="3"></textarea>
			</div>

			<div class="form-group">
				<button type="button" class="btn btn-primary" @click="sendOrderEmail"><i class="icon icon icon-mail"></i> Send Order Email</button>
			</div>
		</div>
		<p class="text-error">{{ submitError }} </p>
		<div v-if="submitting" class="loading loading-lg"></div>

		<p class="text-large text-gray text-center" v-if="user != null && srpIds.length == 0"> 
			Your cart is empty. Try adding some <router-link to="/bouquets">bouquets</router-link>.
		</p>
		<p class="text-large text-gray text-center" v-if="user == null">
			Looks like you're not logged in, please <router-link to="/login">Login</router-link> to add items to your cart.
		</p>
	</div>
</template>

<script>
import SRP from '../Bouquets/SRP';
import CartService from '../../services/Cart';

export default {
	components: { SRP },
	data() {
		return {
			submitting: false,
			submitError: ''
		};
	},
	computed: {
		cart() {
			return this.$store.getters.cart;
		},
		srpIds() {
			/*var bouquets = [];
			for(var i = 0; i < this.cart.srpIds.length; i++) {
				bouquets.push(this.$store.getters.bouquet[this.cart.srpIds[i]]);
			}*/

			return this.cart.srpIds;
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
		},
		sendOrderEmail() {
			this.submitting = true;

			var order = {
				srpIds: this.srpIds,
				note: this.note,
				email: this.user.email
			}

			CartService.sendOrder({order}).then(_ => {
				this.submitting = false;
				this.showSendSuccess();
			}).catch(error => {
				console.log("Error sending order email...");
				this.submitting = false;
				this.submitError = error;
				this.showSendFail();
			})
		}
	},
	created() {
		console.log("Cart component loaded");
	},
	notifications: {
		showSendSuccess: {
			title: 'Success',
			message: 'Successfully sent order email',
			type: 'success'
		},
		showSendFail: {
			title: 'Error',
			message: 'Failed to deliver order email',
			type: 'error'
		},
	}
};
</script>