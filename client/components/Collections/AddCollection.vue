<template>
	<div style="margin-top: 20px;" class="text-left col-mx-auto column col-6 col-xs-12">
		<h3>Add Collection</h3>
		<form @submit.prevent="validateBeforeSubmit">
			<div class="form-group">
				<label class="form-label" for="s_name">Name</label>
				<input v-validate="'required'" v-model="name" :class="{'input': true, 'is-error': errors.has('name') }" name="name" class="form-input" id="s_name">
			</div>
			<p v-show="errors.has('name')" class="form-input-hint text-error">{{ errors.first('name') }}</p>
			<div class="form-group">
				<label class="form-label" for="input-example-3">Description</label>
				<textarea v-model="description" class="form-input" id="input-example-3" rows="3"></textarea>
			</div>
			<div class="form-group">
				<label class="form-label">Banner Image</label>
				<picture-input 
					ref="pictureInput" 
					@change="onPictureChange" 
					width="500" 
					height="200" 
					margin="16"
					:removable="true"
					accept="image/jpeg,image/png" 
					size="15" 
					buttonClass="btn">
				</picture-input>
			</div>

			<div class="form-group">
				<label class="form-label">Bouquets</label>
				<div class="columns">
					<bouquet :key="id" viewType="creation" v-for="(id, index) in bouquetIds" :bouquetId="id" @remove="deleteBouquet(index)">

					</bouquet>
				</div>
			</div>

			<BouquetPicker :modalActive="pickerOpen" :excludedBouquetIds="bouquetIds" @close="closePicker()" @bouquetClicked="addBouquet">

			</BouquetPicker>

			<div class="form-group">
				<button type="button" class="btn" @click="openPicker()">Add bouquet</button>
			</div>

            <p v-show="formHasErrors" class="form-input-hint text-error">Please fix errors before trying to add a collection.</p>

			<div class="form-group">
				<button type="submit" class="btn btn-primary">
					Add Collection
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

export default {
	components: {
		PictureInput,
		InputTag,
		BouquetPicker,
		Bouquet
	},
	data() {
		return {
			name: '',
			imageFile: null,
			formHasErrors: false,
			success: false,
			submitError: '',
			submitting: false,
			bouquetIds: [],
			description: '',
			pickerOpen: false,
		};
	},
	created() {
	},
	methods: {
		onPictureChange() {
			console.log('New picture selected!')
			if (this.$refs.pictureInput.image) {
				this.imageFile = this.$refs.pictureInput.file;
				console.log('Picture loaded.')
			} else {
				console.log('FileReader API not supported: use the <form>, Luke!')
			}
		},
		onCollectionsChange() {

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

			var collection = {
				name: this.name,
				description: this.description,
				imageFile: this.imageFile,
				items: this.bouquetIds
			}

			CollectionService.addCollection(collection).then(res => {
				console.log("CollectionService.addCollection request");
				this.submitting = false;
				this.success = true;
				this.showAddSuccess();
				this.$store.dispatch('updateCollections').then(_ => {
					console.log("Successfully dispatched updateCollections action");
					this.$router.push('/collections/' + res);
				});
			}).catch(err => {
				this.showAddFail();
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
			this.bouquetIds.push(id);
			this.closePicker();
		},
		deleteBouquet(index) {
			this.bouquetIds.splice(index, 1);
		},
	},
	notifications: {
		showAddSuccess: {
			title: 'Success',
			message: 'Successfully added collection',
			type: 'success'
		},
		showAddFail: {
			title: 'Error',
			message: 'Failed to add collection',
			type: 'error'
		}
	}

};
</script>
