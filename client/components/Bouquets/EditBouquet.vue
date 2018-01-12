<template>
	<div style="margin-top: 20px;" class="text-left col-mx-auto column col-6 col-xs-12">
		<h3>Edit Bouquet</h3>
		<form @submit.prevent="validateBeforeSubmit">
			<div class="form-group">
				<label class="form-label" for="s_name">Name</label>
				<input v-validate="'required'" v-model="name" :class="{'input': true, 'is-error': errors.has('name') }" name="name" class="form-input" id="s_name">
			</div>
			<p v-show="errors.has('name')" class="form-input-hint text-error">{{ errors.first('name') }}</p>
			<div class="form-group">
				<label class="form-label">Photo</label>
				<picture-input
					v-if="loaded != null && loaded" 
					ref="pictureInput" 
					@change="onPictureChange"
					@remove="onPictureRemoved"
					width="200" 
					height="200" 
					margin="16"
					:removable="true"
					accept="image/jpeg,image/png" 
					size="15"
					:prefill="bouquet.image"
					buttonClass="btn">
				</picture-input>
			</div>
			<div class="form-group">
				<div class="columns">
					<div class="column col-sm-12 col-6">
						<label class="form-label" for="s_srp">Price</label>
						<div class="input-group">
							<span class="input-group-addon">$</span>
							<input v-validate="'required'" v-model="srp" :class="{'input': true, 'is-error': errors.has('srp') }" type="number" min="0" step="0.01" class="form-input" name="srp" id="s_srp" />
						</div>
						<p v-show="errors.has('srp')" class="form-input-hint text-error">{{ errors.first('srp') }}</p>
					</div>
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

            <p v-show="formHasErrors" class="form-input-hint text-error">Please fix errors before trying to edit a bouquet.</p>

			<div class="form-group">
				<button type="submit" class="btn btn-primary">
					Save Edit
				</button>
			</div>

			<p v-show="submitError != ''" :class="{'loading': submitting }" class="form-input-hint text-error">{{ submitError }}</p>
		</form>
	</div>
</template>

<script>
import PictureInput from 'vue-picture-input'
import InputTag from './InputTag'
import BouquetService from '../../services/Bouquets';

export default {
	components: {
		PictureInput,
		InputTag
	},
	data() {
		return {
			name: '',
			image: null,
			srp: 0,
			packSize: 1,
			collectionsArray: [],
			tagsArray: [],
			formHasErrors: false,
			success: false,
			submitError: '',
			submitting: false,
			bouquetId: this.$route.params.id,
			pictureChanged: false,
			pictureRemoved: false,
			loaded: true,
		};
	},
	methods: {
		onPictureChange() {
			console.log('New picture selected!')
			if (this.$refs.pictureInput.image) {
				this.pictureRemoved = false;
				this.pictureChanged = true;
				this.image = this.$refs.pictureInput.file;
				console.log('Picture loaded.')
			} else {
				console.log('FileReader API not supported: use the <form>, Luke!')
			}
		},
		onPictureRemoved() {
			this.pictureRemoved = true;
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

			BouquetService.editBouquet({
				name: this.name,
				image: this.image,
				srp: this.srp,
				packSize: this.packSize,
				collections: this.collectionsArray,
				tags: this.tagsArray,
				pictureChanged: this.pictureChanged,
				pictureRemoved: this.pictureRemoved,
				id: this.bouquetId
			}).then(res => {
				console.log("BouquetService.editBouquet request with image " + this.image);
				this.submitting = false;
				this.success = true;
				this.$store.dispatch('updateBouquets').then(_ => {
					console.log("Successfully dispatched updateBouquets action");
					this.loaded = false;
					this.$router.push('/bouquets/' + res);
				});
			}).catch(err => {
				this.submitting = false;
				this.submitError = err;
			});
		}
	},
	created() {
		this.name = this.bouquet.name;
		this.srp = this.bouquet.srp;
		this.packSize = this.bouquet.packSize;
		this.collectionsArray = this.bouquet.collections;
		this.tagsArray = this.bouquet.tags;
	},
	computed: {
		uniqueTags() {
			return this.$store.state.uniqueTags;
		},
		uniqueCollections() {
			return this.$store.state.uniqueCollections;
		},
		bouquet() {
			return this.$store.getters.bouquet(this.bouquetId);;
		},
	}
};
</script>
