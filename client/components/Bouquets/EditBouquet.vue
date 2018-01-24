<template>
	<div style="margin-top: 20px;" class="text-left col-mx-auto column col-6 col-xs-12">
		<h3>Edit Bouquet</h3>
		<form @submit.prevent="validateBeforeSubmit" v-if="bouquet != null">
			<div class="form-group">
				<label class="form-label" for="s_name">Name</label>
				<input v-validate="'required'" v-model="bouquet.name" :class="{'input': true, 'is-error': errors.has('name') }" name="name" class="form-input" id="s_name">
			</div>
			<p v-show="errors.has('name')" class="form-input-hint text-error">{{ errors.first('name') }}</p>
			<div class="form-group">
				<label class="form-label">Photo</label>
				<picture-input 
					ref="pictureInput" 
					@change="onPictureChange"
					@remove="onPictureRemoved"
					width="200" 
					height="200" 
					margin="16"
					:removable="true"
					:prefill="vuexBouquet.image"
					accept="image/jpeg,image/png" 
					size="15" 
					buttonClass="btn">
				</picture-input>
			</div>
			<div class="form-group">
				<div class="columns">
					<div class="column col-sm-12 col-6">
						<label class="form-label" for="s_packsize">Pack Size</label>
						<input v-model="bouquet.pack_size" :class="{'input': true, 'is-error': errors.has('pack size') }" type="number" step="1" min="1" class="form-input" name="pack size" id="s_packsize" />
						<p v-show="errors.has('pack size')" class="form-input-hint text-error">{{ errors.first('pack size') }}</p>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label class="form-label" for="s_collections">Collections</label>
				<input-tag :tags="bouquet.collectionsArray" :autocompletes="uniqueCollections"></input-tag>
			</div>
			<div class="form-group">
				<label class="form-label" for="s_collections">Tags</label>
				<input-tag :tags="bouquet.tagsArray" :autocompletes="uniqueTags"></input-tag>
			</div>
			<div class="form-group">
				<label class="form-label" for="input-example-3">Description</label>
				<textarea v-model="bouquet.description" class="form-input" id="input-example-3" rows="3"></textarea>
			</div>

			<div class="form-group">
				<label class="form-label">SRPs</label>
				<div v-for="(srp, index) of bouquet.srps" :key="srp.srp_id">
					<EditableSRP v-model="bouquet.srps[index]" v-on:deleted="deleteSrp(index)"></EditableSRP>
				</div>
			</div>
			<div class="form-group">
				<button type="button" class="btn" @click="addSrp(true)">Add SRP</button>
			</div>

            <p v-show="formHasErrors" class="form-input-hint text-error">Please fix errors before trying to edit a bouquet.</p>

			<div class="form-group">
				<button type="submit" class="btn btn-success">
					Submit Edit
				</button>
				<button type="button" class="btn btn-error" @click="backToFlower">
					Cancel
				</button>
			</div>

			<p v-show="submitError != ''" :class="{'loading': submitting }" class="form-input-hint text-error">{{ submitError }}</p>
		</form>
	</div>
</template>

<script>
import PictureInput from '../Utility/PictureInput';
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
			bouquet: { srps: [] },
			deletedSrps: [],

			formHasErrors: false,
			submitting: false,
			success: false,
			submitError: ''
		};
	},
	methods: {
		onPictureChange() {
			console.log('New picture selected!')
			if (this.$refs.pictureInput.image) {
				this.bouquet.pictureRemoved = false;
				this.bouquet.pictureChanged = true;
				this.bouquet.imageFile = this.$refs.pictureInput.file;
				console.log('Picture loaded.')
			} else {
				console.log('FileReader API not supported: use the <form>, Luke!')
			}
		},
		onPictureRemoved() {
			this.bouquet.pictureRemoved = true;
			this.bouquet.pictureChanged = false;
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

			console.log("submitting");

			BouquetService.editBouquet(this.bouquet, this.deletedSrps)
			.then(res => {
				this.submitting = false;
				this.success = true;
				return this.$store.dispatch('updateBouquets');
			}).then(_ => {
				console.log("Successfully dispatched updateBouquets action");
				this.showEditSuccess();
				this.backToFlower();
			}).catch(err => {
				this.submitting = false;
				this.submitError = err;
				this.showEditFail();
			});
		},
		backToFlower() {
			this.$router.push('/bouquets/' + this.bouquet.bouquet_id);
		},
		addSrp(deletable) {
			console.log("adding srp");
			this.bouquet.srps.push({
				deletable
			});
		},
		deleteSrp(index) {
			for(var i = 0; i < this.vuexBouquet.srps.length; i++) {
				if(this.vuexBouquet.srps[i].srp_id == this.bouquet.srps[index].srp_id) {
					this.deletedSrps.push(this.bouquet.srps[index].srp_id);
					console.log('adding deleted srp: ' + this.bouquet.srps[index].srp_id);
				}
			}
			this.bouquet.srps.splice(index, 1);
		},
		updateInitialization() {
			this.bouquet = this.vuexBouquet;
			if(this.bouquet == null) return;
			for(var i = 0; i < this.bouquet.srps.length; i++) {
				this.bouquet.srps[i].initialized = true;
				if(i != 0) {
					this.bouquet.srps[i].deletable = true;
				}
			}
		}
	},
	created() {
		this.updateInitialization();
		if(this.bouquet == null) {
			this.$store.watch(this.$store.getters.bouquetsFn, _ => {
				console.log("State updated, vuexBouquet: ", this.vuexBouquet);
				if(this.bouquet == null) {
					this.updateInitialization();
				}
			});
		}
		console.log("this.bouquet: " + this.bouquet);
	},
	computed: {
		uniqueTags() {
			return this.$store.state.uniqueTags;
		},
		uniqueCollections() {
			return this.$store.state.uniqueCollections;
		},
		vuexBouquet() {
			console.log("Params id: " + this.$route.params.id);
			return this.$store.getters.bouquet(this.$route.params.id);
		},
	},
	notifications: {
		showEditSuccess: {
			title: 'Success',
			message: 'Edited bouquet',
			type: 'success'
		},
		showEditFail: {
			title: 'Error',
			message: 'Failed to edit bouquet',
			type: 'error'
		},
	}
};
</script>
