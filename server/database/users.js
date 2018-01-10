var con = require('./init').connection;
var mysql = require('mysql');

module.exports.listUsers = () => {
	con.query("SELECT * FROM users", (err, rows) => {
		if (err) throw err;
		console.log("Users: " + JSON.stringify(rows));
	});
}

module.exports.doesEmailExist = (email) => {
	return new Promise((resolve, reject) => {
		var command = "SELECT * FROM users WHERE email = " + mysql.escape(email) + ";";
		console.log("command: " + command);
	
		con.query(command, (err, rows) => {
			if (err) {
				reject(err);
			}
			else if (rows.length == 0) {
				resolve(false);
			}
			else {
				resolve(true);
			}
		});	
	});
}

module.exports.validateEmail = (email) => {
	console.log("validateEmail called");	
	return new Promise((resolve, reject) => {
		if (!email || !validator.validate(email) || email.length > 50) {
			console.log("validateEmail rejected");				
			reject("Invalid email.");
		}
		else {
			doesEmailExist(email).then(result => {
				if(result == false) {
					console.log("validateEmail resolved");									
					resolve();
				}
				else {
					console.log("validateEmail rejected 2");									
					reject()
				};
			});
		}
	});
}

var validator = require("email-validator");
module.exports.validateUser = (user, result) => {
	console.log("validateUser called");
	return new Promise((resolve, reject) => {
		console.log("promise started.");		
		if(!user) {
			console.log("validateUser rejected");			
			reject("Unable to validate user.");
		}
		else if (!user.name || !(user.name.length > 3 && user.name.length < 50)) {
			console.log("validateUser rejected 2");			
			reject("Name must be between 4 and 50 characters");
		}
		resolve();	
	}).then(() => {
		console.log("validateUser returning validateEmail");		
		return validateEmail(user.email);
	});
}

var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.checkUserExists = (user) => {
	console.log("CheckUserExists called");

	return new Promise((resolve, reject) => {
		if(!user || !user.email) reject("Invalid user.");

		var command = "SELECT * FROM users WHERE email = " + mysql.escape(user.email) + ";";
		console.log("userExists command: " + command);
	
		con.query(command, (err, rows) => {
			if (err) throw err;
			if (rows.length == 0) {
				reject("Email does not exist in database.");
			}
			else {
				var dbHash = rows[0].password;
				bcrypt.compare(user.password, dbHash).then(res => {
					if(res == false) reject("Invalid password.");
					else resolve({email: rows[0].email, name: rows[0].name});
				}).catch(err => {
					if(err == '') err = "Unable to verify password.";
					reject(err);
				});
			}
		});	
	});
}


module.exports.register = (user) => {
	var today = new Date();
	console.log("Got here -1");		
	
	return new Promise((resolve, reject) => {
		console.log("Got here 0");		
		bcrypt.hash(user.password, saltRounds).then((hash) => {
			var userData = {
				"name": user.name,
				"email": user.email,
				"password": hash,
				"registered": today,
			}
			console.log("Got here 1");
			con.query('INSERT INTO users SET ?', userData, function (error, results, fields) {
				if (error) {
					console.log("Got here 2");					
					reject(error);
				} else {
					console.log("Got here 3");					
					resolve(userData);
				}
			});
		}).catch(err => {
			reject(err);
		});
	});
}