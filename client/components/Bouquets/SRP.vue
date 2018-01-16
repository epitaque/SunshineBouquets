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
		<!--- Cart View Type -->
			<div class="columns">
				<div>
					<img :src="image" width="150" height="150">
				</div>
				<div class="column">
					<a class="tile-title text-large c-hand" @click="$router.push('/bouquets/' + bouquet.id);">{{bouquet.name}}</a>	
					<p>
						<div class="tile-subtitle text-italic">
							<p>{{bouquet.description}}</p>
						</div>
					</p>
					<div class="columns">
						<div class="column col-4 text-center">
							{{srp.name}}
						</div>
						<div class="column col-ml-auto col-4 text-center text-bold">
							${{srp.srp}}
						</div>
						<div class="column col-4 text-gray text-center">
							{{srp.stems}} stems
						</div>
					</div>
				</div>
				<div>
					<i class="icon icon-cross c-hand" @click="removeFromCart()"></i>
				</div>
			</div>
			<div class="divider"></div>
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
			return;
		},
		image() {
			if(!this.srp.image || this.srp.image == '') {
				return this.bouquet.image;
			}
			return this.srp.image;
		},
		title() {
			if(!srp.name || srp.name == '') {
				return srp.srp;
			}
		}
	},
	methods: {
		clicked() {
			console.log('clicked');
			this.$emit('clicked');
		},
		removeFromCart() {
			this.$store.commit('removeSrpIdFromCart', this.srp.srp_id);
			this.showRemoveFromCartSuccess();
		}
	},
	notifications: {
		showRemoveFromCartSuccess: {
			title: 'Success',
			message: 'Removed SRP from cart',
			type: 'success'
		},
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