<template>
	<div style="margin-top: 20px;" class="text-left col-mx-auto column col-6 col-xs-12">
		<div v-if="user != null">
			<h2 class="text-center">Profile</h2>
			<h3>Name</h3>
			<p> {{ user.name }} </p>
			<h3>Email</h3>
			<p> {{ user.email }} </p>
			<button v-on:click="logout()" class="btn btn-primary">Logout</button>
			<p class="text-error">{{logoutError}}</p>
		</div>
		<p class="largetext text-gray" v-if="user == null">
			Looks like you're not logged in, please <router-link to="/login">Login</router-link> to see your profile.
		</p>
	</div>
</template>

<script>
import Auth from '../../services/Auth.js';

export default {
	name: 'profile',
	data() {
		return {
			logoutError: '',
		};
	},
	created() {
		console.log("Profile component loaded.");
	},
	computed: {
		user() {
			return this.$store.getters.getUser
		}
	},
	methods: {
		logout() {
			Auth.logout().then(res => {
				this.$store.commit('logout');
				this.logoutError = '';
				this.$router.push({path: '/'});
			}).catch(err => {
				this.logoutError = err;
			});
		}
	}
}
</script>