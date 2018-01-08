//import Vue from 'vue';

const NavBar = {
    template: `
<div>
    <header class="navbar">
        <section class="navbar-section">
            <img width="150" src="http://www.sunshinebouquet.com/assets/images/logo.png"></img>
        </section>
        <section class="navbar-section">
            <router-link to="/foo" class="btn btn-link darkgreen">Collections</router-link>
            <router-link to="/foo" class="darkgreen btn btn-link">Products</router-link>
            <router-link to="/foo" class="btn btn-link darkgreen">Login</router-link>
            <router-link to="/foo" class="btn btn-link darkgreen">Register</router-link>    
        </section>
    </header>
    <div class="bar"></div>
</div>
      `
}

export { NavBar };