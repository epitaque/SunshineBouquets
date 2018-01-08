<template>
    <div>
        <header class="navbar">
            <section class="navbar-section">
                <img width="150" src="/resource/logo.png"></img>
            </section>
			<section class="navbar-section">
				<router-link to="/collections" class="btn btn-link darkgreen">Collections</router-link>
                <router-link to="/products" class="darkgreen btn btn-link">Products</router-link>
                <div v-show="!isLoggedIn">
					<router-link to="/login" class="btn btn-link darkgreen">Login</router-link>
					<router-link to="/register" class="btn btn-link darkgreen">Register</router-link>    
				</div>
				<div v-if="isLoggedIn">
					<router-link to="/cart" class="darkgreen btn btn-link">Cart</router-link>
					<router-link to="/profile" class="btn btn-link darkgreen">{{ user.name }}</router-link>    
				</div>
			</section>
        </header>
        <div class="bar"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: "navbar",
	data() {
		return {};
	},
	created() {
		console.log("this.$store: " + this.$store);
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isLoggedIn
		},
		user() {
			return this.$store.getters.getUser
		}
		/*
		...mapGetters({
			isLoggedIn: 'isLoggedIn',
			user: 'user'
		})*/
	}
};
</script>

<style>
.router-link-active {
    font-weight:bold
}
.bar {
    height: 15px;
    width: 100%;
    background-color: #58A62B !important;
}
.darkgreen {
    color: #435F0B !important;
}
</style>