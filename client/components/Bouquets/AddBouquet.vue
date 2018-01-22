<template>
	<div style="margin-top: 20px;" class="text-left col-mx-auto column col-6 col-xs-12">
		<h3>Add Bouquet</h3>
		<form @submit.prevent="validateBeforeSubmit">
			<div class="form-group">
				<label class="form-label" for="s_name">Name</label>
				<input v-validate="'required'" v-model="name" :class="{'input': true, 'is-error': errors.has('name') }" name="name" class="form-input" id="s_name">
			</div>
			<p v-show="errors.has('name')" class="form-input-hint text-error">{{ errors.first('name') }}</p>
			<div class="form-group">
				<label class="form-label">Photo</label>
				<picture-input 
					ref="pictureInput" 
					@change="onPictureChange" 
					width="200" 
					height="200" 
					margin="16"
					:removable="true"
					accept="image/jpeg,image/png" 
					size="15" 
					buttonClass="btn">
				</picture-input>
			</div>
			<div class="form-group">
				<div class="columns">
					<div class="column col-sm-12 col-6">
						<label class="form-label" for="s_packsize">Pack Size</label>
						<input v-validate="'required'" v-model="packSize" :class="{'input': true, 'is-error': errors.has('pack size') }" type="number" step="1" min="1" class="form-input" name="pack size" id="s_packsize" />
						<p v-show="errors.has('pack size')" class="form-input-hint text-error">{{ errors.first('pack size') }}</p>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label class="form-label" for="s_collections">Collections</label>
				<input-tag :tags="collectionsArray" :autocompletes="uniqueCollections"></input-tag>
			</div>
			<div class="form-group">
				<label class="form-label" for="s_collections">Tags</label>
				<input-tag :tags="tagsArray" :autocompletes="uniqueTags"></input-tag>
			</div>
			<div class="form-group">
				<label class="form-label" for="input-example-3">Description</label>
				<textarea v-model="description" class="form-input" id="input-example-3" rows="3"></textarea>
			</div>

			<div class="form-group">
				<label class="form-label">SRPs</label>
				<div v-for="(srp, index) of srps">
					<EditableSRP v-model="srps[index]" v-on:deleted="deleteSrp(index)"></EditableSRP>
				</div>
			</div>
			<div class="form-group">
				<button type="button" class="btn" @click="addSrp(true)">Add SRP</button>
			</div>

            <p v-show="formHasErrors" class="form-input-hint text-error">Please fix errors before trying to add a bouquet.</p>

			<div class="form-group">
				<button type="submit" class="btn btn-primary">
					Add Bouquet
				</button>
			</div>

			<p v-show="submitError != ''" :class="{'loading': submitting }" class="form-input-hint text-error">{{ submitError }}</p>
		</form>
	</div>
</template>

<script>
import PictureInput from 'vue-picture-input'
import InputTag from '../Utility/InputTag'
import BouquetService from '../../services/Bouquets';
import EditableSRP from './EditableSRP';

export default {
	components: {
		PictureInput,
		InputTag,
		EditableSRP
	},
	data() {
		return {
			name: '',
			image: null,
			packSize: 1,
			collectionsArray: [],
			tagsArray: [],
			formHasErrors: false,
			success: false,
			submitError: '',
			submitting: false,
			srps: [],
			description: ''
		};
	},
	created() {
		this.addSrp(false);
	},
	methods: {
		onPictureChange() {
			console.log('New picture selected!')
			if (this.$refs.pictureInput.image) {
				this.image = this.$refs.pictureInput.file;
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
			var bouquet = {
				name: this.name,
				image: this.image,
				packSize: this.packSize,
				collections: this.collectionsArray,
				description: this.description,
				tags: this.tagsArray,
				srps: this.srps
			};

			BouquetService.addBouquet(bouquet).then(res => {
				console.log("BouquetService.addBouquet request");
				this.submitting = false;
				this.success = true;
				this.showAddSuccess();
				this.$store.dispatch('updateBouquets').then(_ => {
					console.log("Successfully dispatched updateBouquets action");
					this.$router.push('/bouquets/' + res);
				});
			}).catch(err => {
				this.showAddFail();
				this.submitting = false;
				this.submitError = err;
			});
		},
		addSrp(deletable) {
			console.log("adding srp");
			this.srps.push({
				deletable
			});
		},
		deleteSrp(index) {
			this.srps.splice(index);
		}
	},
	computed: {
		uniqueTags() {
			return this.$store.state.uniqueTags;
		},
		uniqueCollections() {
			return this.$store.state.uniqueCollections;
		}
	},
	notifications: {
		showAddSuccess: {
			title: 'Success',
			message: 'Successfully added bouquet',
			type: 'success'
		},
		showAddFail: {
			title: 'Error',
			message: 'Failed to add bouquet',
			type: 'error'
		}
	}

};
</script>
