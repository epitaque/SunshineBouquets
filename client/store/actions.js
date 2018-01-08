import ProductService from '../services/Products';

export function updateProducts({ commit }) {
	return new Promise((resolve, reject) => {
		ProductService.getProducts()
		.then(products => {
			var productsObject = {};
			var uniqueCollections = [];
			var uniqueTags = [];
	
			console.log("Got products: " + products);
	
			for(var i = 0; i < products.length; i++) {
				var prod = products[i];
	
				console.log(prod);
	
				prod.id = prod.product_id;
				prod.tags = prod.tags.split(',');
				prod.collections = prod.collections.split(',');
				prod.dateAdded = new Date(prod.dateadded);
				if(prod.image == '') {
					prod.image = '/resource/genericflower.jpg';
				}
				else {
					prod.image = '\\' + prod.image;					
				}
				delete prod.dateadded;
				delete prod.product_id;
				
				for(var j = 0; j < prod.collections.length; j++) {
					if(prod.collections && prod.collections[j].length != 0 && uniqueCollections.indexOf(prod.collections[j]) == -1) {
						uniqueCollections.push(prod.collections[j]);
					}
				}
				for(var j = 0; j < prod.tags.length; j++) {
					if(prod.tags && prod.tags[j].length != 0 && uniqueTags.indexOf(prod.tags[j]) == -1) {
						uniqueTags.push(prod.tags[j]);
					}
				}		
	
				productsObject[prod.id] = prod;
			}

			//console.log("Unique collections: " + JSON.stringify(uniqueCollections));
			//console.log("Unique tags: " + JSON.stringify(uniqueTags));
			
			commit('setProducts', {productsObject, uniqueTags, uniqueCollections});
			resolve();
		}).catch(err => {
			console.log("Error updating products! " + err);
			reject();
		});	
	});
}