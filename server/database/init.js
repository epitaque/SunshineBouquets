var mysql = require('mysql');

module.exports.init = () => {
	module.exports.connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "gt66TP44",
		database: "sunshinebouquets"
	});
	
	module.exports.connection.connect(function (err) {
		if (err) throw err;
		console.log("Connected to sunshinebouquets database!");
	});	
}