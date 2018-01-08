var testNames = ["Majestic", "Petite", "Supreme", "Pom Bunch", "Alstro/Carn Bunch", "Rose Bunch"];
var testTags = ["winter", "spring", "fall", "summer", "valentine's day", "christmas", "fourth of july", "st. patrick's day", "halloween"];
var testMSRPs = [4.99, 9.99, 14.99, 19.99];
var testCollections = ["Spring Promos", "Summer Cooler Program", "Hummingbird Bouquets", "Coral Canyon"];
var testPackSizes = [6, 8, 10, 12];

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomDate2() {
	return randomDate(new Date(2012, 0, 1), new Date());	
}

// for reference on what the object shoud look like
var mockProduct = {
	"0": {
		id: 0,
		name: "Petite",
		image: "resource/flower.jpeg",
		price: 9.99,
		collections: ["Coral Canyon"],
		packSize: 8,
		tags: ["spring", "valentine's day"],
		dateAdded: randomDate2() 
	}
}


Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.includes(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}

var generateRandomMockProduct = function(id_) {
	return {
		id: id_,
		name: testNames[Math.floor(Math.random()*testNames.length)],
		image: "/resource/flower.jpeg",
		price: testMSRPs[Math.floor(Math.random()*testMSRPs.length)],
		collections: [testCollections[Math.floor(Math.random()*testCollections.length)]],
		packSize: testPackSizes[Math.floor(Math.random()*testPackSizes.length)],
		tags: [testTags[Math.floor(Math.random()*testTags.length)], 
			testTags[Math.floor(Math.random()*testTags.length)], 
			testTags[Math.floor(Math.random()*testTags.length)]].unique(),
		dateAdded: randomDate2()
	}
}



export default function getMockData(size) {
	var mockProducts = {};

	for(var i = 0; i < size; i++) {
		mockProducts[i] = generateRandomMockProduct(i);
	}

	return mockProducts;
}