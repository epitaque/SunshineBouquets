<template>
    <div id="overview" class="container grid-hero grid-lg text-center">
        <navbar></navbar>
        <router-view></router-view>
    </div>
</template>

<script>
import NavBar from './Navbar';

export default {
    name: 'app',
    components: {
        'navbar': NavBar
    },
	data() {
		return {};
	},
	created() {
		this.$store.dispatch('updateBouquets');
		this.$store.dispatch('updateCollections');
		if(this.$store.getters.isLoggedIn) { // must be changed to determine login status on load
			this.$store.dispatch('updateDivisions');
		}
	}
};
</script>

<style>
.grid-hero {
    padding-bottom: 2rem;
    padding-top: 1rem;
    position: relative;
}
</style>