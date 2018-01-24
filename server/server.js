var express = require('express');
var bodyParser = require('body-parser');
var users = require('./users');
var cors = require('cors');
var cookieParser = require('cookie-parser')
var path = require("path");
var compression = require('compression')
var db = require('./database/init'); db.init();
var userDB = require('./database/users');
var bouquetDB = require('./database/bouquets');
var collectionsDB = require('./database/collections');
var bouquets = require('./api/bouquets');
var collections = require('./api/collections');
var auth = require('./api/auth');
var upload = require('./upload-config');
var app = express();
var port = 3000;

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.listen(port);

console.log('Sunshine Bouquets Website is now listening on :' + port);

app.get('/api/auth/validateEmail', auth.validateEmail);
app.post('/api/auth/register', auth.registerUser);
app.post('/api/auth/login', auth.login);
app.post('/api/auth/logout', auth.logout);

app.get('/api/bouquets', bouquets.getBouquets);
app.post('/api/bouquets/add', 			auth.validate, upload.multer, bouquets.addBouquet);
app.post('/api/bouquets/addwithimage',  auth.validate, upload.multer, upload.resizer, bouquets.addBouquet);
app.post('/api/bouquets/edit', 			auth.validate, upload.multer, bouquets.editBouquet);
app.post('/api/bouquets/editwithimage', auth.validate, upload.multer, upload.resizer, bouquets.editBouquet);
app.post('/api/bouquets/delete', 		auth.validate, bouquets.removeBouquet);

app.get('/api/collections', collections.getCollections)
app.post('/api/collections/add', 		 	auth.validate, upload.multer, collections.addCollection);
app.post('/api/collections/addwithimage',	auth.validate, upload.multer, upload.bannerResizer, collections.addCollection);
app.post('/api/collections/edit', 			auth.validate, upload.multer, collections.editCollection);
app.post('/api/collections/editwithimage',	auth.validate, upload.multer, upload.bannerResizer, collections.editCollection);
app.post('/api/collections/delete', 		auth.validate, collections.removeCollection);


app.get('/api/profile', auth.validate, (req, res) => { res.json({ user: req.decoded.name, email: req.decoded.email }); });

app.use('/dist', express.static(path.join(__dirname, '../dist'))); 
app.use('/resource', express.static(path.join(__dirname, '../resource')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../index.html'));
});
