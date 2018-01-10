<template>
	<div>
		<div v-if="viewType == 'inBouquet'">

		<div>
		<div v-if="viewType == 'cart'">
			<strong>{{msrp.name}}</strong>
			<img :src="msrp.image">
			<i>{{msrp.price}}</i>
		</div>
	</div>
</template>

<script>

export default  {
	name: 'msrp',
	props: ['msrpId', 'viewType'],
	data() {
		return {}
	},
	computed: {
		msrp() {
			var msrp = {
				msrp_id: 1,
				image: '/resource/genericflower.jpg',
				name: 'Basic',
				price: 19.99,
				stems: 10,
				date_added: new Date()
			};
			return msrp;
		},
		bouquet() {
			var bouquet = {
				bouquet_id: 1,
				name: 'Liliac Flowers',
				description: 'A wonderful addition to any holiday celebration, the liliac flower symbolizes love.',
				image: '/resource/genericflower.jpg',
				collections: ['Holidays'],
				tags: ['warm', 'cozy'],
				date_added: new Date()
			};
		}
	}
}
</script>

<style>

</style>