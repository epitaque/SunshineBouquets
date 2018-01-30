import Homepage from './components/Homepage';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Auth/Profile';
import Cart from './components/Cart/Cart';

import BouquetsList from './components/Bouquets/BouquetsList';
import AddBouquet from './components/Bouquets/AddBouquet';
import EditBouquet from './components/Bouquets/EditBouquet';
import BouquetPage from './components/Bouquets/BouquetPage';

import CollectionsList from './components/Collections/CollectionsList';
import AddCollection from './components/Collections/AddCollection';
import EditCollection from './components/Collections/EditCollection';
import CollectionPage from './components/Collections/CollectionPage';

import DivisionsList from './components/Divisions/DivisionsList';
import AddDivision from './components/Divisions/AddDivision';
import EditDivision from './components/Divisions/EditDivision';
import DivisionPage from './components/Divisions/DivisionPage';

var Routes = [
	{ path: '', component: Homepage },

	{ path: '/login', component: Login },
    { path: '/register', component: Register },
	{ path: '/profile', component: Profile },
	{ path: '/cart', component: Cart },	

	{ path: '/bouquets', component: BouquetsList },
	{ path: '/bouquets/add', component: AddBouquet },		
	{ path: '/bouquets/edit/:id', component: EditBouquet },	
	{ path: '/bouquets/:id', component: BouquetPage },

	{ path: '/collections', component: CollectionsList },
	{ path: '/collections/add', component: AddCollection },
	{ path: '/collections/edit/:id', component: EditCollection },
	{ path: '/collections/:id', component: CollectionPage },

	{ path: '/divisions', component: DivisionsList },
	{ path: '/divisions/add', component: AddDivision },
	{ path: '/divisions/edit/:id', component: EditDivision },
	{ path: '/divisions/:id', component: DivisionPage },

];

export { Routes }