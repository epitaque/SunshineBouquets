<template>
	<div>
		<h1>Edit Division</h1>
		<form>
			<div class="columns">
				<div class="column col-4 col-xl-6 col-md-12 form-group">
					<label class="form-label text-left" for="s_name">Name</label>
					<input name="name" v-validate="'required'" :class="{'input': true, 'is-error': errors.has('name') }" type="name" class="form-input" id="s_name" v-model.lazy.trim="name" placeholder="Name">
					<p v-show="errors.has('name')" class="form-input-hint text-error">{{ errors.first('name') }}</p>
				</div>
			</div>
 			<table class="form-group table table-striped table-hover">
				<thead>
					<tr>
						<th>Email</th>
						<th>Date Added</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(divisionItem, index) in divisionItems" :key="divisionItem.division_item_id">
						<td>{{divisionItem.email}}</td>
						<td>{{formatDate(divisionItem.date_added)}}</td>
						<td><i class="icon icon-cross c-hand" @click="removeItem(index)"></i></td>
					</tr>
					<tr>
						<td>
							<input name="email" @keyup.enter="validateBeforeAddRow" @blur="pristineEmail = false;" v-validate="'email|check_duplicate'" :class="{'input': true, 'is-error': errors.has('email') && !pristineEmail }" type="email" class="form-input" v-model.lazy.trim="email" placeholder="example@gmail.com">
						</td>
						<td>

						</td>
						<td>
							<button type="button" class="btn btn-link" @click.prevent="validateBeforeAddRow">Add Row</button>
						</td>
					</tr>
					<p v-show="errors.has('email') && !pristineEmail" class="form-input-hint text-error">{{ errors.first('email') }}</p>
				</tbody>
			</table>
			<div class="form-group float-right">
				<button type="button" @click="validateBeforeSubmit" class="btn btn-primary">
					Submit Edit
				</button>
			</div>
			<div class="form-group">
				<p class="text text-error">{{ submitError }}</p>
			</div>
		</form>

	</div>
</template>

<script>
import { Validator } from 'vee-validate';
import DivisionService from '../../services/Divisions';

export default {
	data() {
		return {
			name: '',
			email: '',
			submitError: '',
			pristineEmail: true,
			deletedRows: [],
			addedRows: []
		}
	},
	created() {
		this.name = this.division.name;
		Validator.extend('check_duplicate', {
			getMessage: field => "That email is already in the division.",
			validate: (value) => {
				for(var i = 0; i < this.divisionItems.length; i++) {
					if(value == this.divisionItems[i].email) {
						return false;
					}
				}
				return true;
			}
		});
	},
	computed: {
		division() {
			return this.$store.getters.division(this.$route.params.id);
		},
		divisionItems() {
			return this.division.division_items;
		}
	},
	methods: {
		validateBeforeSubmit() {
			if(this.fields.name.valid) {
				this.submit();
			}
			else {
				this.showSubmitError();
			}
		},
		submit() {
			DivisionService.editDivision(this.$route.params.id, this.name, this.addedRows, this.deletedRows)
			.then(result => {
				this.showSubmitSuccess();
				this.$store.dispatch('updateDivisions');
				this.$router.push('/divisions/' + this.$route.params.id);
			}).catch(error => {
				this.showSubmitError();
				this.submitError = error;
			});
		},
		formatDate(date) {
			return moment(date).format('MMMM Do, YYYY');
		},
		validateBeforeAddRow() {
			console.log("validate before add row called");
			if(this.fields.email.valid) {
				this.addRow();
				return;
			}
			else {
				this.showAddRowError();
			}
		},
		removeItem(index) {
			var element = this.divisionItems[index];
			if(element.division_id) {
				this.deletedRows.push(this.divisionItems[index].division_item_id);
			}
			else {
				for(var i = 0; i < this.addedRows.length; i++) {
					if(element.email == this.addedRows[i].email) {
						this.addedRows.splice(i, 1);
						break;
					}
				}
			}
			this.divisionItems.splice(index, 1);
		},
		addRow() {
			this.divisionItems.push({email: this.email, date_added: new Date() });
			this.addedRows.push(this.email);
			this.email = '';
			this.pristineEmail = true;

		}
	},
	notifications: {
		showAddRowError: {
			title: 'Error',
			message: 'Unable to add row',
			type: 'error'
		},
		showSubmitError: {
			title: 'Error',
			message: 'Unable to edit division',
			type: 'error'
		},
		showSubmitSuccess: {
			title: 'Success',
			message: 'Successfully edited division',
			type: 'success'
		}

	}
}
</script>