<template>
	<div :class="rootClassString" @click="rootClicked">
		<!-- Card View Type -->
		<div v-if="viewType=='card' || viewType=='creation'">
			<div class="card">
				<div class="card-image">
					<img :src="bouquet.image" class="img-responsive">
				</div>
				<div class="card-header">
					<span class="toprow">
						<router-link :to="'/bouquets/' + bouquet.bouquet_id"><h4 class="card-title h5">{{bouquet.name}}</h4></router-link>
					</span>
				</div>
				<div class="card-body">
					<span class="chip" v-for="tag in bouquet.tags" :key="tag">{{tag}}</span>
				</div>
				<div class="card-footer" v-if="viewType=='creation'">
					<i class="icon icon-cross c-hand" @click="$emit('remove')"></i>
				</div>
			</div>
		</div>

		<div v-if="viewType=='clickable-card'">
			<div class="card">
				<div class="card-image">
					<img :src="bouquet.image" class="img-responsive">
				</div>
				<div class="card-header">
					<span class="toprow">
						<h4 class="card-title h5">{{bouquet.name}}</h4>
					</span>
				</div>
				<div class="card-body">
					<span class="chip" v-for="tag in bouquet.tags" :key="tag">{{tag}}</span>
				</div>
			</div>
		</div>

		<!-- Full Page View Type -->
		<div v-if="viewType=='full'" class="columns">
			<div class="column col-6 col-md-12" v-if="bouquet != null" >
				<img class="side-image" :src="selectedImage">
			</div>
			<div class="column col-6 col-xs-12">
				<div v-if="bouquet != null">
					<div class="text-center">
						<h2>{{bouquet.name}}</h2>
						<p class="text-italic">{{bouquet.description}}</p>
					</div>

					<div class="divider"></div>

					<div class="columns">
						<div class="column col-4" v-if="bouquet.tags.length != 0">
							<div>Tags</div>
							<div class="tile-subtitle text-gray">
								<span class="chip" v-for="tag in bouquet.tags" :key="tag">{{tag}}</span>
							</div>
						</div>
						<div class="column col-4">
							<div>Pack Size</div>
							<p>{{bouquet.pack_size}}</p>
						</div>
						<div class="column col-4" v-if="bouquet.collections.length != 0">
							<div>Collections</div>
							<div class="tile-subtitle text-gray">
								<span class="chip" v-for="collection in bouquet.collections" :key="collection">{{collection}}</span>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="text-center">
						<div class="columns">
							<div class="column col-4" v-for="(srp, index) in bouquet.srps" :key="srp.srp_id">
								<SRP viewType="bouquetPage" :id="srp.srp_id" :selected="index == selectedSrp" @clicked="srpSelected(index)"> </SRP>
							</div>
						</div>
					</div>

					<div class="divider"></div>
					
					<div class="text-center" >
						<p v-if="selectedSrp == -1">Select SRP</p>
						<button v-if="selectedSrp != -1 && selectedSrpInCart" type="button" @click="removeFromCart" class="btn btn-error">Remove from Cart</button>
						<button v-if="selectedSrp != -1 && !selectedSrpInCart" type="button" @click="addToCart" class="btn btn-success">Add to Cart</button>
					</div>

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
import BouquetService from '../../services/Bouquets';
import SRP from './SRP';

export default {
	name: 'bouquet',
	props: ['bouquetId', 'viewType'],
	components: { SRP },
	data() {
		return {
			selectedSrp: -1,
			error: ''
		}
	},
	computed: {
		bouquet() {
			var bouquet = this.$store.getters.bouquet(this.bouquetId);
			if(bouquet == null) {
				this.error = 'bouquet #'+ this.bouquetId + ' does not exist.';
				return null;
			}
			else {
				this.error = '';
			}
			return bouquet;
		},
		isLoggedIn() {
			return this.$store.getters.isLoggedIn
		},
		rootClassString() {
			var classStr = '';
			if(this.viewType == 'card' || this.viewType == 'clickable-card') {
				classStr += 'column col-3 col-md-4 col-sm-6 col-xs-12 bouquetroot';
			}
			if(this.viewType == 'clickable-card') {
				classStr += ' c-hand'
			}
			if(this.viewType == 'creation') {
				classStr += 'column col-4 col-md-6 col-xs-12 bouquetroot';
			}
			if(this.viewType == 'cart') {
				classStr += 'col-12 bouquetroot';
			}
			return classStr;
		},
		selectedImage() {
			if(this.selectedSrp == -1) {
				return this.bouquet.image;
			}
			var srp = this.bouquet.srps[this.selectedSrp];
			if(!srp.image || srp.image == '') {
				return this.bouquet.image;
			}
			return this.bouquet.srps[this.selectedSrp].image;
		},
		selectedSrpInCart() {
			return this.$store.getters.cart.srpIds.indexOf(this.bouquet.srps[this.selectedSrp].srp_id) != -1;
		}
	},
	methods: {
		addToCart() {
			if(!this.$store.getters.isLoggedIn) {
				this.showNeedToLogin();
				this.$router.push('/login');
			}
			else {
				this.$store.commit('addSrpIdToCart', this.bouquet.srps[this.selectedSrp].srp_id);
				this.showAddToCartSuccess();
			}
		},
		removeFromCart() {
			this.$store.commit('removeSrpIdFromCart', this.bouquet.srps[this.selectedSrp].srp_id);
			this.showRemoveFromCartSuccess();
		},
		remove() {
			BouquetService.removeBouquet(this.bouquetId)
			.then(res => {
				this.showDeleteSuccess();
				this.$store.dispatch('updateBouquets').then(_ => {
					this.$router.push('/bouquets/');
				});
			}).catch(err => {
				this.error = err;
			});
		},
		edit() {
			this.$router.push('/bouquets/edit/' + this.bouquetId);
		},
		srpSelected(index) {
			this.selectedSrp = index;
		},
		rootClicked() {
			this.$emit('clicked');
		}
	},
	notifications: {
		showDeleteSuccess: {
			title: 'Success',
			message: 'Deleted bouquet',
			type: 'success'
		},
		showAddToCartSuccess: {
			title: 'Success',
			message: 'Added SRP to cart',
			type: 'success'
		},
		showRemoveFromCartSuccess: {
			title: 'Success',
			message: 'Removed SRP from cart',
			type: 'success'
		},
		showNeedToLogin: {
			title: 'Unable to add to cart',
			message: 'You must log in to add bouquet SRPs to your cart',
			type: 'error'
		},
	}
};
</script>

<style>
.crop {
    height: 100px;
    overflow: hidden;
}
.bouquetroot {
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
