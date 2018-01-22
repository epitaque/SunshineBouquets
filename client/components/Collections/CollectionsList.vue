<template>
	<div class="container">
		<div class="columns">
			<div class="filters col-12">
				<div style="display: flex">
					<div class="col-3 col-ml-auto" v-if="user != null">
						<div style="float: right">
							<router-link to="/collections/add">
								<button class="btn btn-primary">
								<i class="icon icon-plus"></i> Add Collection</button>
							</router-link>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12">
				<div class="columns">
					<collection :key="collection.collection_id" viewType="card" v-for="collection in displayedCollections" :collectionId="collection.collection_id">

					</collection>
				</div>
				<div v-infinite-scroll="loadMore"  infinite-scroll-disabled="false" infinite-scroll-distance="20">
					<p class="text-secondary">.</p>
				</div>
				<div v-if="busy" class="loading loading-lg"></div>
				<p v-if="!busy && displayedCollections.length == 0" class="text-gray text-large">No collections available.</p>
			</div>
		</div> 
	</div>
</template>

<script>
import Collection from './Collection';
import infiniteScroll from 'vue-infinite-scroll'
import InputTag from '../Utility/InputTag'

export default {
	components: {
		'collection': Collection,
		InputTag
	},
	directives: {infiniteScroll},
	data() {
		return {
			query: '',
			dateadded: [],
			busy: false,
			tagsArray: [],
			displayedCollections: []
		}
	},
	computed: {
		filteredCollections() {
			console.log("collections length: " + this.$store.getters.collections.length);
			return this.$store.getters.collections;
		},
		disabledLoader() {
			return this.busy || (this.displayedCollections == 0);
		},
		user() {
			return this.$store.getters.getUser
		}
	},
	methods: {
		loadMore() {
			this.busy = true;
			setTimeout(() => {
				const temp = [];
				for (let i = this.displayedCollections.length; i <= this.displayedCollections.length + 50 && i < this.filteredCollections.length; i++) {
					temp.push(this.filteredCollections[i]);
				}
				this.displayedCollections = this.displayedCollections.concat(temp);
				this.busy = false;
			}, 1);
		},
		onInputChange(e) {
			this.displayedCollections = [];
			this.loadMore();
			console.log("Input changed!");
		}
	},
	created() {
	}
};
</script>

<style>
.filters {
	margin-top: 8px;
	margin-bottom: 8px;
}
</style>