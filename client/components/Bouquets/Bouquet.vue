<template>
	<div :class="rootClassString">
		<!-- Card View Type -->
		<div v-if="viewType=='card'">
			<div class="card">
				<div class="card-image">
					<img :src="bouquet.image" class="img-responsive">
				</div>
				<div class="card-header">
					<span class="toprow">
						<router-link :to="'/bouquets/' + bouquet.id"><h4 class="card-title h5">{{bouquet.name}}</h4></router-link>
					</span>
				</div>
				<div class="card-body">
					<span class="chip" v-for="tag in bouquet.tags" :key="tag">{{tag}}</span>
				</div>
			</div>
		</div>

		<!--- Cart View Type -->
		<div v-if="viewType=='cart'">
			<div class="tile">
				<div class="tile-icon">
					<figure class="avatar avatar-lg">
						<img :src="bouquet.image">
					</figure>
				</div>
				<div class="tile-content">
    				<p class="tile-title">{{bouquet.name}}</p>	
					<p>
						<div class="tile-subtitle text-gray">
							<span class="chip" v-for="tag in bouquet.tags" :key="tag">{{tag}}</span>
						</div>
					</p>
					<p>
						<button class="btn btn-sm btn-error" v-show="bouquet.inCart" v-on:click="removeFromCart()">
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
			<div class="column col-6 col-md-12" v-if="bouquet != null" >
				<p>{{selectedImage}}</p>
				<img class="side-image" :src="selectedSrp == -1 ? bouquet.image : bouquet.srps[selectedSrp].image">
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
						<button type="button" @click="addToCart" class="btn" v-if="selectedSrp != -1">Add to Cart</button>
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
			error: '',
			selectedImage: ''
		}
	},
	computed: {
		bouquet() {
			var bouquet = this.$store.getters.bouquet(this.bouquetId);
			/*var bouquet = {
				bouquet_id: 1,
				name: 'Liliac Flowers',
				description: 'A wonderful addition to any holiday celebration, the liliac flower symbolizes love.',
				image: '/resource/genericflower.jpg',
				collections: ['Holidays'],
				tags: ['warm', 'cozy'],
				date_added: new Date()
			};*/
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
			if(this.viewType == 'card') {
				return 'column col-3 col-md-4 col-sm-6 col-xs-12 bouquetroot';
			}
			if(this.viewType == 'cart') {
				return 'col-12 bouquetroot';
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
				this.$store.commit('addBouquetIdToCart', this.bouquetId);
			}
		},
		removeFromCart() {
			this.$store.commit('removeBouquetIdFromCart', this.bouquetId);
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
	},
	created() {
		if(this.bouquet != null) {
			this.selectedImage = newBouquet.image;
		}
	},
	notifications: {
		showDeleteSuccess: {
			title: 'Success',
			message: 'Successfully deleted bouquet',
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
