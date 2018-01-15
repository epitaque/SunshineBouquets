<template>
	<div @click="clicked" :class="getRootClass">
		<div v-if="viewType == 'bouquetPage'">
			<div class="card" :class="this.selected ? 'selected' : ''">
				<div class="card-image">
					<img :src="srp.image" class="img-responsive" height="100%" width="100%">
				</div>
				<div class="card-header" v-if="srp.name != ''">
					<div class="card-title h5">{{srp.name}}</div>
				</div>
				<div class="card-body">
					<div class="container">
						<div class="columns">
							<div class="col-6">
								<div>${{srp.srp}}</div>
							</div>
							<div class="col-6 text-gray">
								{{srp.stems}} stems
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="viewType == 'cart'">
			<strong>{{srp.name}}</strong>
			<img :src="srp.image">
			<i>{{srp.price}}</i>
		</div>
	</div>
</template>

<script>

export default  {
	name: 'srp',
	props: ['id', 'viewType', 'selected'],
	data() {
		return {}
	},
	computed: {
		srp() {
			console.log("Srp id: " + this.id);
			var srp = this.$store.getters.srp(this.id);
			console.log("SRP: " + JSON.stringify(srp));
			return srp;
		},
		bouquet() {
			var bouquet = this.$store.getters.bouquet(this.srp.bouquet_id);
			return bouquet;
		},
		getRootClass() {
			if(this.viewType == 'bouquetPage') {
				return 'clickable';
			}
			return '';
		}
	},
	methods: {
		clicked() {
			console.log('clicked');
			this.$emit('clicked');
		}
	}
}
</script>

<style>
.clickable {
	cursor: pointer;
}
.selected {
	background-color: #ebf4eb !important;
	border-color: #435F0B !important;
}
</style>