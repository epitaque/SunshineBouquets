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
							<router-link to="/products/add">
								<button class="btn btn-primary">
								<i class="icon icon-plus"></i> Add Product</button>
							</router-link>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12">
				<div class="columns">
					<product :key="product.id" viewType="card" v-for="product in displayedProducts" :productId="product.id">

					</product>
				</div>
				<div v-infinite-scroll="loadMore"  infinite-scroll-disabled="false" infinite-scroll-distance="20">
					<p class="text-secondary">.</p>
				</div>
				<div v-if="busy" class="loading loading-lg"></div>
				<p v-if="!busy && displayedProducts.length == 0" class="text-gray">No products matched your query.</p>
			</div>
		</div> 
	</div>
</template>

<script>
import Product from './Product';
import infiniteScroll from 'vue-infinite-scroll'
import InputTag from './InputTag'

export default {
	components: {
		'product': Product,
		InputTag
	},
	directives: {infiniteScroll},
	data() {
		return {
			query: '',
			dateadded: [],
			busy: false,
			tagsArray: [],
			displayedProducts: []
		}
	},
	computed: {
		filteredProducts() {
			var a = [];

			for(var i = 0; i < this.$store.getters.products.length; i++) {
				//ensure that the product matches all tags
				var product = this.$store.getters.products[i];
				if(this.matchesQuery(product, this.tagsArray)) {
					a.push(product);
				}
			}

			return a;
		},
		disabledLoader() {
			return this.busy || (this.displayedProducts == 0);
		},
		user() {
			return this.$store.getters.getUser
		}
	},
	methods: {
		matchesQuery(product, searchTags) {
			//if(tags.length == 0) return true;

			for(var i = 0; i < searchTags.length; i++) {
				var searchTag = searchTags[i].toLowerCase();

				if(product.name.toLowerCase().indexOf(searchTag) != -1) {
					return true;
				}

				var containsSearchTag = false;

				for(var j = 0; j < product.tags.length; j++) {
					if(product.tags[j].indexOf(searchTag) != -1) {
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
				for (let i = this.displayedProducts.length; i <= this.displayedProducts.length + 50 && i < this.filteredProducts.length; i++) {
					temp.push(this.filteredProducts[i]);
				}
				this.displayedProducts = this.displayedProducts.concat(temp);
				this.busy = false;
			}, 1);
		},
		onInputChange(e) {
			this.displayedProducts = [];
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