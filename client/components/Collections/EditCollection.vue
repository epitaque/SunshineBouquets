<template>
	<div style="margin-top: 20px;" class="text-left col-mx-auto column col-6 col-xs-12">
		<h3>Edit Collection</h3>
		<form @submit.prevent="validateBeforeSubmit">
			<div class="form-group">
				<label class="form-label" for="s_name">Name</label>
				<input v-validate="'required'" v-model="collection.name" :class="{'input': true, 'is-error': errors.has('name') }" name="name" class="form-input" id="s_name">
			</div>
			<p v-show="errors.has('name')" class="form-input-hint text-error">{{ errors.first('name') }}</p>
			<div class="form-group">
				<label class="form-label" for="input-example-3">Description</label>
				<textarea v-model="collection.description" class="form-input" id="input-example-3" rows="3"></textarea>
			</div>
			<div class="form-group">
				<label class="form-label">Banner Image</label>
				<picture-input 
					ref="pictureInput" 
					@change="onPictureChange"
					@remove="onPictureRemoved"
					width="500" 
					height="200" 
					margin="16"
					:removable="true"
					accept="image/jpeg,image/png" 
					size="15"
					:prefill="vuexCollection.image"
					buttonClass="btn">
				</picture-input>
			</div>

			<div class="form-group">
				<label class="form-label">Bouquets</label>
				<div class="columns">
					<bouquet :key="id" viewType="creation" v-for="(id, index) in collection.bouquetIds" :bouquetId="id" @remove="deleteBouquet(index)">

					</bouquet>
				</div>
			</div>

			<BouquetPicker :modalActive="pickerOpen" :excludedBouquetIds="collection.bouquetIds" @close="closePicker()" @bouquetClicked="addBouquet">

			</BouquetPicker>

			<div class="form-group">
				<button type="button" class="btn" @click="openPicker()">Add bouquet</button>
			</div>

            <p v-show="formHasErrors" class="form-input-hint text-error">Please fix errors before trying to add a collection.</p>

			<div class="form-group">
				<button type="submit" class="btn btn-primary">
					Submit Edit
				</button>
			</div>

			<p v-show="submitError != ''" :class="{'loading': submitting }" class="form-input-hint text-error">{{ submitError }}</p>
		</form>
	</div>
</template>

<script>
import PictureInput from '../Utility/PictureInput'
import InputTag from '../Utility/InputTag'
import CollectionService from '../../services/Collections';
import BouquetPicker from '../Bouquets/BouquetPicker';
import Bouquet from '../Bouquets/Bouquet';
import Vue from 'vue';

export default {
	components: {
		PictureInput,
		InputTag,
		BouquetPicker,
		Bouquet
	},
	data() {
		return {
			formHasErrors: false,
			submitError: '',
			submitting: false,
			pickerOpen: false,

			addedBouquetIds: [],
			deletedBouquetIds: [],
			collection: { bouquetIds: [], pictureRemoved: false, pictureChanged: false }
		};
	},
	created() {
		this.updateInitialization();
		if(this.collection == null) {
			this.$store.watch(this.$store.getters.collectionsFn, _ => {
				console.log("State updated, vuexCollection: ", this.vuexCollection);
				if(this.collection == null) {
					this.updateInitialization();
				}
			});
		}
		console.log("this.collection: " + this.collection);
	},
	computed: {
		vuexCollection() {
			return this.$store.getters.collection(this.$route.params.id);
		}
	},
	methods: {
		onPictureChange() {
			console.log('New picture selected!')
			if (this.$refs.pictureInput.image) {
				this.collection.imageFile = this.$refs.pictureInput.file;
				this.collection.pictureRemoved = false;
				this.collection.pictureChanged = true;
				console.log('Picture loaded.')
			} else {
				console.log('FileReader API not supported: use the <form>, Luke!')
			}
		},
		onPictureRemoved() {
			this.collection.pictureRemoved = true;
			this.collection.pictureChanged = false;
		},
		updateInitialization() {
			this.collection = this.vuexCollection;
			console.log('collection: ' + JSON.stringify(this.collection));
			Vue.set(this.collection, 'bouquetIds', []);
			//this.collection.bouquetIds = [];
			for(var i = 0; i < this.collection.collection_items.length; i++) {
				this.collection.bouquetIds.push(this.collection.collection_items[i].bouquet_id);
			}
			if(this.collection == null) return;
		},
		validateBeforeSubmit() {
			this.$validator.validateAll().then((result) => {
				if (result) {
					this.submit();
					return;
				}
				this.formHasErrors = true;
			});
		},
		submit() {
			this.submitting = true;

			CollectionService.editCollection(this.collection, this.deletedBouquetIds, this.addedBouquetIds).then(res => {
				console.log("CollectionService.addCollection request");
				this.submitting = false;
				this.showEditSuccess();
				this.$store.dispatch('updateCollections').then(_ => {
					console.log("Successfully dispatched updateCollections action");
					this.$router.push('/collections/' + res);
				});
			}).catch(err => {
				this.showEditFail();
				this.submitting = false;
				this.submitError = err;
			});
		},
		openPicker() {
			this.pickerOpen = true;
		},
		closePicker() {
			this.pickerOpen = false;
		},
		addBouquet(id) {
			console.log("add bouquet called: " + id);
			this.collection.bouquetIds.push(id);
			this.addedBouquetIds.push(id);
			this.closePicker();
		},
		deleteBouquet(index) {
			var id = this.collection.bouquetIds[index];
			for(var i = 0; i < this.collection.collection_items.length; i++) {
				if(this.collection.collection_items[i].bouquet_id == id) {
					this.deletedBouquetIds.push(id);
					break;
				}
			}
			var aIndex = this.addedBouquetIds.indexOf(id);
			if(aIndex != -1) {
				this.addedBouquetIds.splice(aIndex, 1);
			}
			this.collection.bouquetIds.splice(index, 1);
		},
	},
	notifications: {
		showEditSuccess: {
			title: 'Success',
			message: 'Successfully edited collection',
			type: 'success'
		},
		showEditFail: {
			title: 'Error',
			message: 'Failed to edit collection',
			type: 'error'
		}
	}

};
</script>
