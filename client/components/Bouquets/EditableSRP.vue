<template>
	<div class="card">
		<div class="container">
			<div class="columns">
				<div class="column col-6">
					<div class="card-header">
						<div class="card-subtitle text-gray">
							<div class="columns">
								<div class="column col-7">
									<label class="form-label" for="s_name">Name</label>
									<input v-model="srp.name" type="text" class="form-input" name="name" id="s_name" />
								</div>
								<div class="column col-5" v-if="srp.deletable">
									<button type="button" class="btn btn-primary btn-error" @click="remove()">Remove</button>
								</div>
							</div>
							<div class="columns">
								<div class="column col-sm-12 col-8">
									<label class="form-label" for="s_srp">SRP</label>
									<div class="input-group">
										<span class="input-group-addon">$</span>
										<input v-model="srp.srp" type="number" min="0" step="0.01" class="form-input" name="srp" id="s_srp" />
									</div>
									<p v-show="errors.has('srp')" class="form-input-hint text-error">{{ errors.first('srp') }}</p>
								</div>
								<div class="column col-sm-12 col-4">
									<label class="form-label" for="s_stems">Stems</label>
									<input v-model="srp.stems" type="number" step="1" min="1" class="form-input" name="stems" id="s_stems" />
									<p v-show="errors.has('stems')" class="form-input-hint text-error">{{ errors.first('stems') }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="column col-6">
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
			</div>
		</div>
	</div>

</template>

<script>
import PictureInput from 'vue-picture-input'

export default {
	components: {PictureInput},
	props: ['value'],
	computed: {
		srp() {
			var srp = this.value;

			if(!srp.initialized) {
				console.log("SRP uninitialized, initializing...");

				srp.bouquet_id = this.bouquetId;
				srp.image_file = null;
				srp.name = '';
				srp.srp = 0;
				srp.stems = 1;
				srp.initialized = true;
			}

			return srp;
		}
	},
	methods: {
		updateValue() {
			this.value = this.srp;
			this.$emit('input', this.srp);
		},
		onPictureChange() {
			console.log('New SRP picture selected!')
			if (this.$refs.pictureInput.image) {
				this.srp.image_file = this.$refs.pictureInput.file;
				this.updateValue();
				console.log('Picture loaded.')
			} else {
				console.log('FileReader API not supported: use the <form>, Luke!')
			}
		},
		remove() {
			this.$emit('deleted');
		}
	}
}
</script>

<style>

</style>