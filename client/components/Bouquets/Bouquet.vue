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
					<span class="chip" v-for="tag in bouquet.tags">{{tag}}</span>
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
							<span class="chip" v-for="tag in bouquet.tags">{{tag}}</span>
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
			<div v-if="bouquet != null" class="col-3 col-xs-12">
				<img class="side-image" :src="bouquet.image">
			</div>
			<div class="col-9 col-xs-12">
				<div v-if="bouquet != null">
					<h2>{{bouquet.name}}</h2>
					<h3>Description</h3>
					<p>{{bouquet.description}}</p>
					<h3>SRPs</h3>
					<p> to be added... </p>
					<h3>Tags</h3>
					<div class="tile-subtitle text-gray">
						<span class="chip" v-for="tag in bouquet.tags">{{tag}}</span>
					</div>
					<h3>Collections</h3>
					<div class="tile-subtitle text-gray">
						<span class="chip" v-for="tag in bouquet.collections">{{tag}}</span>
					</div>
					<h3>Pack Size</h3>
					<p>{{bouquet.packSize}}</p>
					<h3>Date Added</h3>
					<p>{{new Date(bouquet.date_added).toLocaleDateString()}}</p>
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

export default {
	name: 'bouquet',
	props: ['bouquetId', 'viewType'],
	data() {
		return {
			error: ''
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
