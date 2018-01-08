const express = require('express');
const bodyParser = require('body-parser');
const users = require('./users');
const cors = require('cors');
var cookieParser = require('cookie-parser')
var path = require("path");
var multer = require('multer');
var compression = require('compression')

var auth = require('./api/auth');
var db = require('./database/init'); 
db.init();
var userDB = require('./database/users');
var productDB = require('./database/products');
var products = require('./api/products');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

app.listen(3000);

console.log('Sunshine Bouquets Website is now listening on :3000');
app.get('/api/auth/validateEmail', auth.validateEmail);

app.post('/api/auth/register', auth.registerUser);
app.post('/api/auth/login', auth.login);
app.post('/api/auth/logout', auth.logout);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

var upload = multer({ storage: storage });

//console.log("auth.validate: " + auth.validate + ", upload.array(): " + upload.array() + ", products.addProduct: " + products.addProduct);

app.post('/api/products/add', auth.validate, upload.array(), products.addProduct);
app.post('/api/products/addwithimage', auth.validate, upload.single('image'), products.addProduct);
app.post('/api/products/edit', auth.validate, upload.array(), products.editProduct);
app.post('/api/products/editwithimage', auth.validate, upload.single('image'), products.editProduct);
app.post('/api/products/delete', auth.validate, products.removeProduct);
app.get('/api/products', auth.validate, products.getProducts);
app.get('/api/profile', auth.validate, (req, res) => { res.json({ user: req.decoded.name, email: req.decoded.email }); });

app.use('/dist', express.static(path.join(__dirname, '../dist'))); 
app.use('/resource', express.static(path.join(__dirname, '../resource')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../index.html'));
});
