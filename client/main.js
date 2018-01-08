console.log("main.js loading...");

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/App';

import { Routes } from './routes.js';
import VeeValidate from 'vee-validate';

import VueResource from 'vue-resource';
import store from './store'
import { sync } from 'vuex-router-sync'

import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'
const toastTypes = {
	success: 'success',
	error: 'error',
	info: 'info',
	warn: 'warn'
  }
miniToastr.init({types: toastTypes})
function toast ({title, message, type, timeout, cb}) {
	return miniToastr[type](message, title, timeout, cb)
}
const options = {
	success: toast,
	error: toast,
	info: toast,
	warn: toast
}
Vue.use(VueNotifications, options)

	

Vue.use(VeeValidate);
Vue.use(VueResource);
Vue.use(VueRouter);
miniToastr.init()
const Router = new VueRouter({
	mode: 'history',	
	routes: Routes
});

const unsync = sync(store, Router)

const vm = new Vue({
	components: {
		'app': App
	},
	store,
	router: Router
}).$mount("#app");
