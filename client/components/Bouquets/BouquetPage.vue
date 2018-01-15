<template>
	<div class="root">
		<bouquet :bouquetId="$route.params.id" viewType="full"></bouquet>
	</div>
</template>

<script>
import Bouquet from './Bouquet';
export default {
	components: {
		'bouquet': Bouquet
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