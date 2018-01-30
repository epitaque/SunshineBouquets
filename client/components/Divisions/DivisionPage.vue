<template>
	<div>
		<div v-if="division != null">
			<h1>{{division.name}}</h1>
			<div class="float-right">
				<button type="button" class="btn btn-error" @click="removeDivision">Remove</button>
				<button type="button" class="btn btn-primary" @click="$router.push('/divisions/edit/' + $route.params.id)">Edit</button>
			</div>
			<table class="table table-striped table-hover">
				<thead>
					<tr>
						<th>Email</th>
						<th>Date Added</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="divisionItem in divisionItems" :key="divisionItem.division_item_id">
						<td>{{divisionItem.email}}</td>
						<td>{{formatDate(divisionItem.date_added)}}</td>
					</tr>
				</tbody>
			</table>
			<p class="text-large text-gray text-center"  v-if="divisionItems.length == 0"> 
				There are no emails in this division. <a class="c-hand" @click="$router.push('/divisions/edit/' + division.division_id)">Try adding some.</a>
			</p>
			<div class="form-group">
				<p class="text text-error">{{ deleteError }}</p>
			</div>
		</div>
		<div v-if="division == null">
			<p class="text-large text-gray text-center"> 
				Unable to locate a division with ID {{$route.params.id}}.
			</p>
		</div>
	</div>
</template>

<script>
import DivisionService from '../../services/Divisions';

export default {
	data() {
		return {
			deleteError: ''
		}
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
		formatDate(date) {
			return moment(date).format('MMMM Do, YYYY');
		},
		removeDivision() {
			DivisionService.removeDivision(this.division.division_id).then(_ => {
				this.$store.dispatch('updateDivisions');
				this.$router.push('/divisions');
				this.showRemoveSuccess();
			}).catch(error => {
				this.showRemoveError();
				this.deleteError = error;
			});
		}
	},
	notifications: {
		showRemoveError: {
			title: 'Error',
			message: 'Unable to remove division',
			type: 'error'
		},
		showRemoveSuccess: {
			title: 'Success',
			message: 'Successfully removed division',
			type: 'success'
		}

	}
}
</script>

<style>

</style>