<template>
	<div>
		<div v-if="viewType=='card'">
			<div class="card">
				<div class="card-image">
					<img :src="bouquet.image" class="img-responsive">
				</div>
				<div class="card-header">
					<span class="toprow">
						<router-link :to="'/bouquets/' + bouquet.bouquet_id"><h4 class="card-title h5">{{bouquet.name}}</h4></router-link>
					</span>
				</div>
				<div class="card-body">
					<span class="chip" v-for="tag in bouquet.tags" :key="tag">{{tag}}</span>
				</div>
			</div>
		</div>

		<div v-if="viewType=='full'" class="columns">

		</div>


	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {
		collection() {
			
		}
	}
};
</script>
