<template>
	<div :class="rootClassString">
		<!-- Card View Type -->
		<div v-if="viewType=='card'">
			<div class="card">
				<div class="card-image">
					<img :src="product.image" class="img-responsive">
				</div>
				<div class="card-header">
					<span class="toprow">
						<router-link :to="'/products/'+product.id"><h4 class="card-title h5">{{product.name}}</h4></router-link>
						<button v-show="!product.inCart" v-on:click="addToCart()" class="btn">
							<i class="icon icon-plus"></i>
						</button>
						<button v-show="product.inCart" v-on:click="removeFromCart()" class="btn btn-error">
							<i class="icon icon-minus"></i>
						</button>
					</span>
				</div>
				<div class="card-body">
					<span class="chip" v-for="tag in product.tags">{{tag}}</span>
				</div>
			</div>
		</div>

		<!--- Cart View Type -->
		<div v-if="viewType=='cart'">
			<div class="tile">
				<div class="tile-icon">
					<figure class="avatar avatar-lg">
						<img :src="product.image">
					</figure>
				</div>
				<div class="tile-content">
    				<p class="tile-title">{{product.name}}</p>
					<p>
						<div class="tile-subtitle text-gray">
							<span class="chip" v-for="tag in product.tags">{{tag}}</span>
						</div>
					</p>
					<p>
						<button class="btn btn-sm btn-error" v-show="product.inCart" v-on:click="removeFromCart()">
							Remove
						</button>
					</p>
				</div>
				<div class="tile-action"> 
				</div>
			</div>
		</div>

		<!-- Full Page View Type -->
		<div v-if="viewType=='full'" class="columns">
			<div v-if="product != null" class="col-3 col-xs-12">
				<img class="side-image" :src="product.image">
			</div>
			<div class="col-9 col-xs-12">
				<div v-if="product != null">
					<h2>{{product.name}}</h2>
					<h3>MSRPS</h3>
					<p> to be added... </p>
					<h3>Tags</h3>
					<div class="tile-subtitle text-gray">
						<span class="chip" v-for="tag in product.tags">{{tag}}</span>
					</div>
					<h3>Collections</h3>
					<div class="tile-subtitle text-gray">
						<span class="chip" v-for="tag in product.collections">{{tag}}</span>
					</div>
					<h3>Pack Size</h3>
					<p>{{product.packSize}}</p>
					<h3>Date Added</h3>
					<p>{{new Date(product.dateAdded).toLocaleDateString()}}</p>
					<div v-if="isLoggedIn">
						<button @click="remove" class="btn btn-error">Delete</button> 
						<button @click="edit" class="btn">Edit</button>
					</div>
				</div>
				<div class="text-error">
					{{error}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ProductService from '../../services/Products';

export default {
	name: "product",
	props: ['productId', 'viewType'],
	data() {
		return {
			error: ''
		}
	},
	computed: {
		product() {
			var product = this.$store.getters.product(this.productId);
			if(product == null) {
				this.error = 'Product #'+ this.productId + ' does not exist.';
				return null;
			}
			return product;
		},
		isLoggedIn() {
			return this.$store.getters.isLoggedIn
		},
		rootClassString() {
			if(this.viewType == 'card') {
				return 'column col-3 col-md-4 col-sm-6 col-xs-12 productroot';
			}
			if(this.viewType == 'cart') {
				return 'col-12 productroot';
			}
			return '';
		}
	},
	methods: {
		addToCart() {
			if(!this.$store.getters.isLoggedIn) {
				this.$router.push('/login');
			}
			else {
				this.$store.commit('addProductIdToCart', this.productId);
			}
		},
		removeFromCart() {
			this.$store.commit('removeProductIdFromCart', this.productId);
		},
		remove() {
			ProductService.removeProduct(this.productId)
			.then(res => {
				this.showDeleteSuccess();
				this.$store.dispatch('updateProducts').then(_ => {
					this.$router.push('/products/');
				});
			}).catch(err => {
				this.error = err;
			});
		},
		edit() {
			this.$router.push('/products/edit/' + this.productId);
		}
	},
	notifications: {
		showDeleteSuccess: {
			title: 'Success',
			message: 'Successfully deleted product',
			type: 'success'
		}
	}
};
</script>

<style>
.crop {
    height: 100px;
    overflow: hidden;
}
.productroot {
	float: left;
	padding-bottom: .8rem;
	text-align: left;
}
.toprow {
	display: block;
}
.toprow h4 {
	display: inline;
}
.toprow button, .toprow p {
	float: right;
}
.collection {
	font-size: 12px;
}
.side-image {
	max-width: 90%;
	max-height: 90%;
	width: auto;
	height: auto;
	margin: auto;
}
</style>
