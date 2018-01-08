import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CollectionsList from './components/Collections/CollectionsList';
import ProductsList from './components/Products/ProductsList';
import ProductPage from './components/Products/ProductPage';
import Profile from './components/Auth/Profile';
import Homepage from './components/Homepage';
import Cart from './components/Cart/Cart';
import AddProduct from './components/Products/AddProduct';
import EditProduct from './components/Products/EditProduct';

var Routes = [
	{ path: '', component: Homepage },
	{ path: '/cart', component: Cart },	
	{ path: '/login', component: Login },
    { path: '/register', component: Register },
	{ path: '/collections', component: CollectionsList },
	{ path: '/products', component: ProductsList },
	{ path: '/profile', component: Profile },
	{ path: '/products/add', component: AddProduct },		
	{ path: '/products/:id', component: ProductPage },
	{ path: '/products/edit/:id', component: EditProduct },	
];

export { Routes }