<template>
	<div style="margin-top: 20px;" class="text-left col-mx-auto column col-6 col-xs-12">
		<h2 class="text-center">Register</h2>
        <form @submit.prevent="validateBeforeSubmit">
            <div class="form-group">
                <label class="form-label" for="s_name">Name</label>
                <div class="has-icon-left">
                    <input name="name" v-validate="'required|alpha_spaces|max:64|min:4'" data-vv-delay="1000" :class="{'input': true, 'is-error': errors.has('name'), 'is-success': fields.name && fields.name.valid }" type="text" class="form-input" id="s_name" v-model="name" placeholder="John Smith">
                    <i class="form-icon icon icon-people"></i>
                </div>
                <p v-show="errors.has('name')" class="form-input-hint text-error">{{ errors.first('name') }}</p>
            </div>

            <div class="form-group">
                <label class="form-label" for="s_email">Email</label>
                <div class="has-icon-left">
                    <input name="email" v-validate="'required|email|email_exists'" data-vv-delay="1000" :class="{'input': true, 'is-error': errors.has('email'), 'is-success': fields.email && fields.email.valid }" type="email" class="form-input" id="s_email" v-model="email" placeholder="example@sunshinebouquet.com">
                    <i class="form-icon icon icon-mail"></i>
                </div>
            </div>
            <p v-show="errors.has('email')" class="form-input-hint text-error">{{ errors.first('email') }}</p>

            <div class="form-group">
                <label class="form-label" for="s_password">Password</label>
                <div class="has-icon-left">
                    <input name="password" v-validate="'required|min:6|confirmed:confirmedpassword'" data-vv-delay="1000" :class="{'input': true, 'is-error': errors.has('password'), 'is-success': fields.password && fields.password.valid }" type="password" class="form-input" id="s_password" v-model="password" placeholder="Password">
                    <i class="form-icon icon icon-link"></i>
                </div>
            </div>
            <p v-show="errors.has('password')" class="form-input-hint text-error">{{ errors.first('password') }}</p>

            <div class="form-group">
                <label class="form-label" for="s_password">Confirm Password</label>
                <div class="has-icon-left">
                    <input name="confirmedpassword" v-validate="'required'" data-vv-delay="1000" :class="{'input': true, 'is-error': errors.has('password'), 'is-success': fields.password && fields.password.valid }" type="password" class="form-input" placeholder="Confirm Password">
                    <i class="form-icon icon icon-link"></i>
                </div>
            </div>

            <br>

            <div class="form-group">
                <button :disabled="successfullyRegistered" type="submit" class="btn btn-primary">
                    Register
                </button>
            </div>
            <p v-show="formHasErrors" class="form-input-hint text-error">Please fix errors before registering.</p>
			<p class="text-error">{{ registerError }} </p>

			<p v-show="successfullyRegistered" class="form-input-hint text-success">You have successfully registered!</p>
        </form>
	</div>
</template>

<script>
import { Validator } from 'vee-validate';
import Auth from '../../services/Auth.js';

export default {
	name: 'register',
	created() {
		Validator.extend('email_exists', {
			getMessage: field => "That email has already been used to register.",
			validate: (value) => {
				return new Promise((resolve, reject) => {
					this.$http.get('/api/auth/validateEmail', {
						headers: {
							'email': value
						}
					}).then(response => {
						if(response.status == 200 && response.body.success) {
							resolve({valid: true});
						}
						else {
							resolve({valid: false});
						}
					}, response => {
						console.error("Error sending validateEmail request");
					});
				});
			}
		});
	},
	data() {
		return {
            name: '',
            email: '',
			password: '',
			formHasErrors: false,
			registerError: '',
			successfullyRegistered: false
		};
	},
	methods: {
		validateBeforeSubmit() {
			this.$validator.validateAll().then((result) => {
				if (result) {
					this.submit();
					return;
				}
				this.showRegisterFail();
				this.formHasErrors = true;
			});
		},
		submit() {
			this.formHasErrors = false;
			Auth.register({
				name: this.name, 
				email: this.email, 
				password: this.password
			}).then(user => {
				this.successfullyRegistered = true;
				console.log("Successfully registered user " + user);
				this.showRegisterSuccess();
			}).catch(res => {
				this.registerError = res.error;
				this.showRegisterFail();
				console.error("Error registering: " + res.error);
			});
		},
		submitCallback(response) {

		}
	},
	notifications: {
		showRegisterSuccess: {
			title: 'Success',
			message: 'Successfully registered',
			type: 'success'
		},
		showRegisterFail: {
			title: 'Error',
			message: 'Failed to register account',
			type: 'error'
		}
	}
};
</script>