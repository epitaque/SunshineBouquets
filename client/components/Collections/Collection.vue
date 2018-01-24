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
			<div class="columns" v-if="collection != null">
				<div class="banner-container column col-9" v-bind:style="imageStyle">
					<div class="text-container">
						<h2 style="color:white;">{{collection.name}}</h2>
						<p style="color:white;" class="text-italic">{{collection.description}}</p>
					</div>
				</div>
			</div>
			<div class="columns" style="margin-top: 20px;">
				<Bouquet :key="bouquet.bouquet_id" viewType="card" v-for="bouquet in displayedBouquets" :bouquetId="bouquet.bouquet_id">

				</Bouquet>
			</div>
			<p v-if="collection == null" class="text-gray text-center text-large">Collection does not exist.</p>

			<div class="float-right">
				<button type="button" class="btn btn-error" @click="deleteCollection">Delete Collection</button>
				<button type="button" class="btn btn-primary" @click="$router.push('/collections/edit/' + collectionId);">Edit Collection</button>
			</div>

			<div class="text-error">
				{{ apiError }}
			</div>
		</div>
	</div>
</template>

<script>
import Bouquet from '../Bouquets/Bouquet';
import Collections from '../../services/Collections';

export default {
	name: 'collection',
	props: ['collectionId', 'viewType'],
	components: { Bouquet },
	data() {
		return {
			apiError: ''
		};
	},
	computed: {
		collection() {
			console.log("Collection in component: " + JSON.stringify(this.$store.getters.collection(this.collectionId)));
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
		displayedBouquets() {
			var bouquets = [];
			for(var i = 0; i < this.collection.collection_items.length; i++) {
				bouquets.push(this.$store.getters.bouquet(this.collection.collection_items[i].bouquet_id));
			}
			return bouquets;
		},
		imageStyle() {
			if(!this.collection) return {};
			var formatted = JSON.stringify(this.collection.image);
			console.log('this.collection.image: ' + formatted);
			return { 
				backgroundImage: 'url(' + formatted + ')' 
			}
		}
	},
	methods: {
		deleteCollection() {
			Collections.removeCollection(this.collectionId).then(_ => {
				this.$store.dispatch('updateCollections');
				this.$router.push('/collections/');
				this.showDeleteSuccess();
			}).catch(error => {
				this.apiError = error;
				this.showDeleteError();
			});
		}
	},
	notifications: {
		showDeleteSuccess: {
			title: 'Success',
			message: 'Deleted collection',
			type: 'success'
		},
		showDeleteError: {
			title: 'Error',
			message: 'Unable to delete collection',
			type: 'error'
		}
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