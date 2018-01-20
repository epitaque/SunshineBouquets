var db = require("../database/users");
const jwt = require('jsonwebtoken');
const moment = require('moment');
//const tokens = require('../tokens');

module.exports.registerUser = (req, res) => {
	var body = req.body;
	var user = body;

	console.log("Trying to register user " + JSON.stringify(user));

	db.validateUser(user).then((result) => {
		return db.register(user);
	}).then(result => {
		res.status(200).send();				
	}).catch(err => {
		console.log("Error registering user: " + err);
		res.status(500).json({error: err});		
	});
}

module.exports.validateEmail = (req, res) => {
	var email = req.headers['email'];
	db.validateEmail(email).then(result => {
		res.status(200).json({success: "Email is valid."});
	}).catch(err => {
		res.status(200).json({error: err});		
	});
}


const jwtAttributes = {
	SECRET: 'this_will_be_used_for_hashing_signature',
	ISSUER: 'Sunshine Bouquets',
	EXPIRY: 60 * 60 * 12, // in seconds
	EXPIRY_REMEMBERME: 60 * 60 * 24 * 365,
	COOKIE: 'sb_jwt'
};

// issues JWT
module.exports.login = (req, res) => {
	var user = req.body.user;
	var rememberMe = req.body.rememberMe;

	const { EXPIRY, EXPIRY_REMEMBERME, ISSUER, SECRET, COOKIE } = jwtAttributes;	

	console.log("rememberMe: " + rememberMe);

	db.checkUserExists(user).then(result => {
		var EXP = rememberMe == true ? EXPIRY_REMEMBERME : EXPIRY;

		console.log("rememberMe == true " + (rememberMe == true));

		const expires = moment().add(EXP, 'seconds').valueOf();
		const payload = {
			exp: expires,
			iss: ISSUER,
			name: user.name,
			email: user.email,
		};

		const token = jwt.sign(payload, SECRET);
		//tokens.add(token, payload);

		res.cookie(COOKIE, token, {maxAge: EXP * 1000, httpOnly: false});
		console.log("user found, sending 200 status");		
		res.status(200).json({user: {email: result.email, name: result.name}});
	}).catch(err => {
		console.log("err thrown in dbCheckUserExists or something", err);
		res.status(401).json({error: err});		
	});
}	

module.exports.validate = (req, res, next) => {
	const { COOKIE, SECRET } = jwtAttributes;

	console.log("Request cookies: " + JSON.stringify(req.cookies));

	const token = req.cookies[COOKIE];

	if (!token) {
		res.status(403).json({"error": "Unauthorized: Token not found"});
	} else {
		jwt.verify(token, SECRET, (err, decoded) => {
			if(err) {
				res.status(403).json({"error": "Unable to verify token"});
			}
			else {
				req.decodedToken = decoded;
				next();
			}
		});
	}
}

module.exports.logout = (req, res) => {
	const { COOKIE } = jwtAttributes;
	
	const token = req.cookies[COOKIE];	

	if(!token) {
		res.sendStatus(200);
	} else {
		res.clearCookie(COOKIE);
		res.sendStatus(200);			
	}

}