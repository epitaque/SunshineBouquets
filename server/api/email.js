var divisionsDb = require('../database/divisions');
var bouquetsDb = require('../database/bouquets');

module.exports.sendOrderEmails = function(req, res) {
	var order = req.body.order;

	/* order structure: {
		srpIds: [5, 7],
		note: 'Please fasdjfkldasjf.',
		email: example@gmail.com
	}*/

	// we want to get a list of srps, and each srp has to have a bouquet object attached to it
	// also each srp has to have a list of emails attached to it
	// then for each unique email, build a list of associated srps and send
	
	//var cartItems = [];

	var promises = [];
	for(var i = 0; i < order.srpIds.length; i++) {
		var cartItem = {};
		//cartItems.push(cartItem);
		var promise = bouquetsDb.getSrp(order.srpIds[i])
		.then(dbSrp => {
			cartItem.dbSrp = dbSrp;
			return;
		}).then(_ => bouquetsDb.getBouquet(cartItem.dbSrp.bouquet_id))
		.then(dbBouquet => {
			cartItem.dbBouquet = dbBouquet;	
		}).then(_ => {
			//console.log("bouquet divisions: " + cartItem.dbBouquet.divisions);
			var divisions = JSON.parse(cartItem.dbBouquet.divisions);
			var promises2 = [];
			for(var i = 0; i < divisions.length; i++) {
				promises2.push(divisionsDb.getDivision(divisions[i]));
			}
			return Promise.all(promises2);
		}).then(dbDivisions => {
			//console.log("Got here... dbDivisions: " + JSON.stringify(dbDivisions));
			cartItem.dbDivisions = dbDivisions;
			var str = JSON.stringify(cartItem);
			console.log("Returning cartItem: " + str);

			return cartItem;
		});
		promises.push(promise);
	}

	Promise.all(promises).then(cartItems => {
		var emails = {};
		console.log("Cart items 2: " + JSON.stringify(cartItems));

		// build list of unique emails
		for(var i = 0; i < cartItems.length; i++) {
			var cartItem = cartItems[i];
			cartItem.uniqueEmails = [];
			for(var j = 0; j <= cartItem.dbDivisions.length; j++) {
				var division = cartItem.dbDivisions[j];
				console.log("Division: " + JSON.stringify(division));
				for(var f = 0; division != null && f < division.division_items.length; f++) {
					var email = division.division_items[f].email;
					if(!emails[email]) {
						emails[email] = [];
					}
					if(!cartItem.uniqueEmails.includes(email)) {
						cartItem.uniqueEmails.push(email);
					}
				}
			}
		}
		for(var i = 0; i < cartItems.length; i++) {
			var cartItem = cartItems[i];
			for(var j = 0; j < cartItem.uniqueEmails.length; j++) {
				var email = cartItem.uniqueEmails[j];
				emails[email].push(cartItem);
			}
		}
		
		console.log("Sending email...");
		sendEmail(JSON.stringify(emails));
		res.sendStatus(200);
	
		for(var email in emails) {
			var emailCartItems = emails[email];

			
		}

	});
}

var nodemailer = require('nodemailer');
var pug = require('pug');

var path = require('path');

function sendEmail(data) {
	const compiledFunction = pug.compileFile(path.join(__dirname, '../emails/order/test.pug'));

	var content = compiledFunction({name: 'Brian'});

	console.log("Compiled Email Content:"); console.log(" ");
	console.log(content);

	let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'tipred3@gmail.com', // generated ethereal user
            pass: 'gt66TP44)'  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Brian Hoy" <brianhoy@sunshinebouquets.com>', // sender address
        to: 'epitaquee@gmail.com', // list of receivers
        subject: 'Sunshine Bouquets Order', // Subject line
		html: content // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}