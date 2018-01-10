<template>
	<div class="card">
		<div class="container">
			<div class="columns">
				<div class="column col-6">
					<div class="card-header">
						<div class="card-title h5">{{msrp.name}}</div>
						<div class="card-subtitle text-gray">
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
									<label class="form-label" for="s_stems">Stems</label>
									<input v-validate="'required'" v-model="msrp.stems" :class="{'input': true, 'is-error': errors.has('stems') }" type="number" step="1" min="1" class="form-input" name="stems" id="s_stems" />
									<p v-show="errors.has('stems')" class="form-input-hint text-error">{{ errors.first('stems') }}</p>
								</div>
							</div>
						</div>
					</div>
					<div class="card-body">
						{{msrp.description}}
					</div>
					<div class="card-footer">
						<button class="btn btn-primary" @click="this.$emit('remove')">Remove</button>
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
	props: ['new', 'id', 'bouquetId'],
	computed: {
		msrp() {
			if(this.new) {
				var msrp = this.$store.getters.tempMsrps[this.id];

				if(!msrp || msrp.msrp_id == null) {
					console.log("MSRP blank, creating new one...");

					msrp = {};
					msrp.msrp_id == null;
					msrp.bouquet_id = this.bouquet_id;
					msrp.image = null;
					msrp.image_file = null;
					msrp.name = '';
					msrp.price = 0;
					msrp.stems = 1;
				}

				return msrp;
			}
		}
	},
	methods: {
		onPictureChange() {
			console.log('New MSRP picture selected!')
			if (this.$refs.pictureInput.image) {
				msrp.image_file = this.$refs.pictureInput.file;
				console.log('Picture loaded.')
			} else {
				console.log('FileReader API not supported: use the <form>, Luke!')
			}
		},
		revalidate() {
			this.$validator.validateAll().then((result) => {
				if (result) {
					this.submit();
					return;
				}
				this.msrp.valid = false;
			});
		}
	}
}
</script>

<style>

</style>