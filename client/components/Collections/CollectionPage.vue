<template>
	<div class="root">
		<collection :collectionId="$route.params.id" viewType="full"></collection>
	</div>
</template>

<script>
import Collection from './Collection';
export default {
	components: {
		'collection': Collection
	},
};
</script>

<style scoped>
.root {
	text-align: left;
	margin-left: auto;
	margin-right: auto;
	margin-top: 10px;
	border-radius: 5px;
}
</style>