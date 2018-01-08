<template>
	<div style="margin-top: 20px;" class="text-left col-mx-auto column col-6 col-xs-12">
		<h3>Add Product</h3>
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
						<label class="form-label" for="s_price">Price</label>
						<div class="input-group">
							<span class="input-group-addon">$</span>
							<input v-validate="'required'" v-model="price" :class="{'input': true, 'is-error': errors.has('price') }" type="number" min="0" step="0.01" class="form-input" name="price" id="s_price" />
						</div>
						<p v-show="errors.has('price')" class="form-input-hint text-error">{{ errors.first('price') }}</p>
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

            <p v-show="formHasErrors" class="form-input-hint text-error">Please fix errors before trying to add a product.</p>

			<div class="form-group">
				<button type="submit" class="btn btn-primary">
					Add Product
				</button>
			</div>

			<p v-show="submitError != ''" :class="{'loading': submitting }" class="form-input-hint text-error">{{ submitError }}</p>
		</form>
	</div>
</template>

<script>
import PictureInput from 'vue-picture-input'
import InputTag from './InputTag'
import ProductService from '../../services/Products';

export default {
	components: {
		PictureInput,
		InputTag
	},
	data() {
		return {
			name: '',
			image: null,
			price: 0,
			packSize: 1,
			collectionsArray: [],
			tagsArray: [],
			formHasErrors: false,
			success: false,
			submitError: '',
			submitting: false
		};
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
			ProductService.addProduct({
				name: this.name,
				image: this.image,
				price: this.price,
				packSize: this.packSize,
				collections: this.collectionsArray,
				tags: this.tagsArray,
			}).then(res => {
				console.log("ProductService.addProduct request");
				this.submitting = false;
				this.success = true;
				this.$store.dispatch('updateProducts').then(_ => {
					console.log("Successfully dispatched updateProducts action");
					this.$router.push('/products/' + res);
				});
			}).catch(err => {
				this.submitting = false;
				this.submitError = err;
			});
		}
	},
	computed: {
		uniqueTags() {
			return this.$store.state.uniqueTags;
		},
		uniqueCollections() {
			return this.$store.state.uniqueCollections;
		}
	}
};
</script>
