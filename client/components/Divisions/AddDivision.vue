<template>
	<div style="margin-top: 20px;" class="text-left col-mx-auto column col-6 col-xs-12">
		<h1>Add Division</h1>
		<form @submit.prevent="validateBeforeSubmit">
			<div class="form-group">
				<div class="has-icon-left">
					<input name="name" v-validate="'required'" :class="{'input': true, 'is-error': errors.has('name') }" type="name" class="form-input" id="s_name" v-model.lazy.trim="name" placeholder="Name">
					<i class="form-icon icon icon-arrow-right"></i>
				</div>
				<p v-show="errors.has('name')" class="form-input-hint text-error">{{ errors.first('name') }}</p>
			</div>
			<div class="form-group">
				<button type="submit" class="btn btn-primary">
					Add Division
				</button>
			</div>
			<div class="form-group">
				<p class="text text-error">{{ submitError }}</p>
			</div>
		</form>
	</div>
</template>

<script>
import DivisionService from '../../services/Divisions.js';

export default {
	props: ['divisionId'],
	data() {
		return {
			name: '',
			submitError: ''
		};
	},
	computed: {
		division() {
			return this.$store.getters.division(this.divisionId);
		},
		divisionItems() {
			return this.division.items;
		}
	},
	methods: {
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
			console.log("Submitting");
			DivisionService.addDivision(this.name).then(id => {
				this.$store.dispatch('updateDivisions');
				this.$router.push('/divisions/edit/' + id);
				this.showAddSuccess();
			}).catch(error => {
				this.submitError = error;
				this.showAddFail();
			});
		}
	},
	notifications: {
		showAddSuccess: {
			title: 'Success',
			message: 'Successfully added division',
			type: 'success'
		},
		showAddFail: {
			title: 'Error',
			message: 'Failed to add division',
			type: 'error'
		}
	}
}
</script>
