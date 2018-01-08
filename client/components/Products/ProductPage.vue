<template>
	<div class="root col-9 col-lg-12">
		<a v-on:click="back()">Back</a>
		<product :productId="$route.params.id" viewType="full"></product>
	</div>
</template>

<script>
import Product from './Product';

export default {
	components: {
		'product': Product
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
		console.log("Product page loaded.");
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