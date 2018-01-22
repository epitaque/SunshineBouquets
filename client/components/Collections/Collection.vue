<template>
	<div :class="rootClassString">
		<div v-if="viewType=='card'">
			<div class="card">
				<div class="card-image">
					<img :src="collection.image" class="img-responsive">
				</div>
				<div class="card-header">
					<span class="toprow">
						<router-link :to="'/collections/' + collection.collection_id"><h4 class="card-title h5">{{collection.name}}</h4></router-link>
					</span>
				</div>
				<div class="card-body">
					<p class="text-gray">{{collection.description}}</p>
				</div>
			</div>
		</div>

		<div v-if="viewType=='full'">
			<div class="columns">
				<div class="column col-6">
					
				</div>
				<div class="banner-container column col-9" v-bind:style="{ backgroundImage: ('url(' + collection.image + ')') }">
					<div class="text-container">
						<h2 style="color:white;">{{collection.name}}</h2>
						<p style="color:white;" class="text-italic">{{collection.description}}</p>
					</div>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
export default {
	name: 'collection',
	props: ['collectionId', 'viewType'],
	data() {
		return {};
	},
	computed: {
		collection() {
			return this.$store.getters.collection(this.collectionId);
		},
		rootClassString() {
			if(this.viewType == 'card') {
				return 'column col-3 col-md-4 col-sm-6 col-xs-12 bouquetroot';
			}
			if(this.viewType == 'cart') {
				return 'col-12 bouquetroot';
			}
			return '';
		},
	}
};
</script>

<style scoped>
.banner-container {
	height: 200px;
	background-size: cover;
	background-color: rgba(28, 36, 28, 0.418);
	background-blend-mode: darken;
	display:flex;
	justify-content:center;
	align-items:center;
	width:100%;
}
.text-container {
}
</style>