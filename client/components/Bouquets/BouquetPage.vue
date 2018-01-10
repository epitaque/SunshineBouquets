<template>
	<div class="root col-9 col-lg-12">
		<a v-on:click="back()">Back</a>
		<bouquet :bouquetId="$route.params.id" viewType="full"></bouquet>
	</div>
</template>

<script>
import Bouquet from './Bouquet';
export default {
	components: {
		'bouquet': Bouquet
	},
	data() {
		return {};
	},
	methods: {
		back() {
			this.$router.go(-1);
		}
	},
	created() {
		console.log("Bouquet page loaded.");
	}
};
</script>

<style>
.root {
	text-align: left;
	margin-left: auto;
	margin-right: auto;
	margin-top: 10px;
	padding: 10px;
	border-radius: 5px;
}
</style>