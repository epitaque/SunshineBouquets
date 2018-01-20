import BouquetService from '../services/Bouquets';

export function updateBouquets({ commit }) {
	//return;
	return new Promise((resolve, reject) => {
		BouquetService.getBouquets()
		.then(bouquets => {
			var srps = [];
			var uniqueCollections = [];
			var uniqueTags = [];
		
			for(var i = 0; i < bouquets.length; i++) {
				var bouquet = bouquets[i];
		
				for(var j = 0; j < bouquet.srps.length; j++) {
					srps.push(bouquet.srps[j]);
				}

				bouquet.tags = bouquet.tags.length == 0 ? [] : bouquet.tags.split(',');
				bouquet.collections = bouquet.collections.length == 0 ? [] : bouquet.collections.split(',');
				bouquet.date_added = new Date(bouquet.date_added);
				if(bouquet.image == '') {
					bouquet.image = '/resource/genericflower.jpg';
				}
				else {
					bouquet.image = bouquet.image;					
				}
				
				for(var j = 0; j < bouquet.collections.length; j++) {
					if(bouquet.collections && bouquet.collections[j].length != 0 && uniqueCollections.indexOf(bouquet.collections[j]) == -1) {
						uniqueCollections.push(bouquet.collections[j]);
					}
				}
				for(var j = 0; j < bouquet.tags.length; j++) {
					if(bouquet.tags && bouquet.tags[j].length != 0 && uniqueTags.indexOf(bouquet.tags[j]) == -1) {
						uniqueTags.push(bouquet.tags[j]);
					}
				}		
			}
			
			commit('setSrps', srps);
			commit('setBouquets', {bouquets, uniqueTags, uniqueCollections});
			resolve();
		}).catch(err => {
			console.log("Error updating bouquets! " + err);
			reject();
		});	
	});
}