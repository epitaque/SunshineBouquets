<template>
	<div class="container">
		<div class="columns">
			<div class="filters col-12">
				<div style="display: flex">
					<div class="col-3 col-sm-6">
						<input-tag placeholder="Search Tags" :on-change="onInputChange" :tags="tagsArray"></input-tag>
					</div>
					<div class="col-3 col-ml-auto" v-if="user != null">
						<div style="float: right">
							<router-link to="/bouquets/add">
								<button class="btn btn-primary">
								<i class="icon icon-plus"></i> Add Bouquet</button>
							</router-link>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12">
				<div class="columns">
					<bouquet :key="bouquet.bouquet_id" viewType="card" v-for="bouquet in displayedBouquets" :bouquetId="bouquet.bouquet_id">

					</bouquet>
				</div>
				<div v-infinite-scroll="loadMore"  infinite-scroll-disabled="false" infinite-scroll-distance="20">
					<p class="text-secondary">.</p>
				</div>
				<div v-if="busy" class="loading loading-lg"></div>
				<p v-if="!busy && displayedBouquets.length == 0" class="text-gray">No bouquets matched your query.</p>
			</div>
		</div> 
	</div>
</template>

<script>
import Bouquet from './Bouquet';
import infiniteScroll from 'vue-infinite-scroll'
import InputTag from './InputTag'

export default {
	components: {
		'bouquet': Bouquet,
		InputTag
	},
	directives: {infiniteScroll},
	data() {
		return {
			query: '',
			dateadded: [],
			busy: false,
			tagsArray: [],
			displayedBouquets: []
		}
	},
	computed: {
		filteredBouquets() {
			var a = [];

			for(var i = 0; i < this.$store.getters.bouquets.length; i++) {
				//ensure that the bouquet matches all tags
				var bouquet = this.$store.getters.bouquets[i];
				if(this.matchesQuery(bouquet, this.tagsArray)) {
					a.push(bouquet);
				}
			}

			return a;
		},
		disabledLoader() {
			return this.busy || (this.displayedBouquets == 0);
		},
		user() {
			return this.$store.getters.getUser
		}
	},
	methods: {
		matchesQuery(bouquet, searchTags) {
			//if(tags.length == 0) return true;

			for(var i = 0; i < searchTags.length; i++) {
				var searchTag = searchTags[i].toLowerCase();

				if(bouquet.name.toLowerCase().indexOf(searchTag) != -1) {
					return true;
				}

				var containsSearchTag = false;

				for(var j = 0; j < bouquet.tags.length; j++) {
					if(bouquet.tags[j].indexOf(searchTag) != -1) {
						containsSearchTag = true;
					}
				}

				if(!containsSearchTag) {
					return false;
				}
			}

			return true;
		},
		loadMore() {
			this.busy = true;
			setTimeout(() => {
				const temp = [];
				for (let i = this.displayedBouquets.length; i <= this.displayedBouquets.length + 50 && i < this.filteredBouquets.length; i++) {
					temp.push(this.filteredBouquets[i]);
				}
				this.displayedBouquets = this.displayedBouquets.concat(temp);
				this.busy = false;
			}, 1);
		},
		onInputChange(e) {
			this.displayedBouquets = [];
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