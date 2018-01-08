<template>
	<div style="margin-top: 20px;" class="text-left col-mx-auto column col-6 col-xs-12">
		<h2 class="text-center">Login</h2>
		<form @submit.prevent="validateBeforeSubmit">
			<div class="form-group">
				<label class="form-label" for="s_email">Email</label>
				<div class="has-icon-left">
					<input name="email" v-validate="'required|email'" :class="{'input': true, 'is-error': errors.has('email') }" type="email" class="form-input" id="s_email" v-model.lazy.trim="email" placeholder="Email">
					<i class="form-icon icon icon-mail"></i>
				</div>
			</div>
			<p v-show="errors.has('email')" class="form-input-hint text-error">{{ errors.first('email') }}</p>

			<div class="form-group">
				<label class="form-label" for="s_password">Password</label>
				<div class="has-icon-left">
					<input name="password" v-validate="'required|min:6'" :class="{'input': true, 'is-error': errors.has('password') }" type="password" class="form-input" id="s_password" v-model.lazy.trim="password" placeholder="Password">
					<i class="form-icon icon icon-link"></i>
				</div>
			</div>
			<p v-show="errors.has('password')" class="form-input-hint text-error">{{ errors.first('password') }}</p>

			<div class="form-group">
				<label class="form-checkbox">
					<input type="checkbox" v-model="remember">
					<i class="form-icon"></i>
					Remember me
				</label>
			</div>

            <p v-show="formHasErrors" class="form-input-hint text-error">Please fix errors before logging in.</p>
			<p class="text-error">{{ loginError }} </p>

			<div class="form-group">
				<button type="submit" class="btn btn-primary">
					Sign in
				</button>
			</div>

			<p v-show="success && loginError == ''" class="text-success"> Successfully logged in. </p>
        </form>
	</div>
</template>

<script>
import Auth from '../../services/Auth.js';

export default {
	name: 'login',
	data() {
		return {
			email: '',
			password: '',
			remember: false,
			formHasErrors: false,
			loginError: '',
			success: false
		};
	},
	methods: {
		validateBeforeSubmit() {
			this.$validator.validateAll().then((result) => {
				if (result) {
					this.submit();
					return;
				}
				this.formHasErrors = true;
			});
		},
		submit() {
			this.formHasErrors = false;
			Auth.login({
				rememberMe: this.remember,
				user: {
					email: this.email, 
					password: this.password
				}
			}).then(user => {
				this.success = true;
				this.loginError = '';
				this.$store.commit('setUser', user);
				console.log("retrieving user from state: " + JSON.stringify(this.$store.getters.getUser));
				console.log("Successfully logged in, user " + JSON.stringify(user));
				this.$router.push('profile')
			}).catch(err => {
				this.loginError = err;
				console.error("Error logging in: " + err);
			});
		}
	}
};
</script>