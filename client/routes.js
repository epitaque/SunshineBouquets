import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CollectionsList from './components/Collections/CollectionsList';
import BouquetsList from './components/Bouquets/BouquetsList';
import BouquetPage from './components/Bouquets/BouquetPage';
import Profile from './components/Auth/Profile';
import Homepage from './components/Homepage';
import Cart from './components/Cart/Cart';
import AddBouquet from './components/Bouquets/AddBouquet';
import EditBouquet from './components/Bouquets/EditBouquet';

var Routes = [
	{ path: '', component: Homepage },
	{ path: '/cart', component: Cart },	
	{ path: '/login', component: Login },
    { path: '/register', component: Register },
	{ path: '/collections', component: CollectionsList },
	{ path: '/bouquets', component: BouquetsList },
	{ path: '/profile', component: Profile },
	{ path: '/bouquets/add', component: AddBouquet },		
	{ path: '/bouquets/:id', component: BouquetPage },
	{ path: '/bouquets/edit/:id', component: EditBouquet },	
];

export { Routes }