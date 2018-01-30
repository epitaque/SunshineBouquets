<template>
	<div>
		<h1>Divisions</h1>
		<div class="float-right">
			<button type="button" class="btn btn-primary" @click="addDivision">Add Division</button>
		</div>
		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th>ID</th>
					<th>Division</th>
					<th>Number of Emails</th>
					<th>Date Added</th>
				</tr>
			</thead>
			<tbody>
				<tr class="c-hand" v-for="division in divisions" :key="division.division_id" @click="$router.push('/divisions/' + division.division_id)">
					<td>{{division.division_id}}</td>
					<td>{{division.name}}</td>
					<td>{{division.division_items.length}}</td>
					<td>{{formatDate(division.date_added)}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	computed: {
		divisions() {
			return this.$store.getters.divisions;
		}
	},
	methods: {
		formatDate(date) {
			return moment(date).format('MMMM Do, YYYY');
		},
		addDivision() {
			this.$router.push('/divisions/add');
		}
	}
}
</script>