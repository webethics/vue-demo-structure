<template>
    <div class="main-wrapper">
        <b-container class="bv-example-row ">
            <b-row>
                <b-col> <img :src="logo" class="logo" /> </b-col>
            </b-row>
            <b-row>
                <b-form  @submit.prevent="handleSubmit" class="form-cls">
                    <b-col class="restpass" >
                        <h2> Reset Password </h2>
                        <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                    </b-col>

                    <b-form-group>
                        <b-form-input type="text" v-model="credentials.email" v-validate="'required|email'" name="email" placeholder="Email" class="form-control" :class="{ 'is-invalid': submitted && errors.has('email') }"> </b-form-input>
                        <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email')  }}</div>
                    </b-form-group>

                    <b-form-group>
                        <b-form-input type="password" v-model="credentials.password" v-validate="'required|min:6'" name="password" placeholder="Password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') }"> </b-form-input>
                        <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
                    </b-form-group>

                    <b-form-group>
                        <b-form-input type="password" v-model="credentials.password_confirmation" v-validate="'required|min:6'" name="password_confirmation" placeholder="Confirm Password" class="form-control" :class="{ 'is-invalid': submitted &&  errors.has('password_confirmation') }"> </b-form-input>
                        <div v-if="submitted && errors.has('password_confirmation')" class="invalid-feedback">{{ errors.first('password_confirmation') }}</div>
                    </b-form-group>

                    <b-form-group>
                      <button-spinner type="submit" class="btn btn-primary ctm-btm-sin" :is-loading="loading " :disabled="loading">
            					    <span>Reset Password</span>
            					</button-spinner>
                    </b-form-group>
                </b-form>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import logo from './../../../../public/images/logo.png';
import ButtonSpinner from 'vue-button-spinner';

export default {
    data () {
        return {
            credentials: {
                email: '',
                password: '',
                password_confirmation: '',
            },
            submitted: false,
            logo:logo,
        }
    },
    components:{
  		ButtonSpinner
  	},
    computed: {
        ...mapState('account', ['status', 'loading']),
        ...mapState({
            alert: state => state.alert
        })
    },
    created() {
      this.clearAlert();
      this.checkValidToken(this.$route.params.token);
    },
    methods: {
        ...mapActions('account', ['resetPassword', 'checkValidToken']),
        ...mapActions({
            clearAlert: 'alert/clear'
        }),
        handleSubmit (e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    const credentials = this.credentials;
                    const token = this.$route.params.token;
                    this.resetPassword({ credentials, token });
                }
            });
        }
    }
};
</script>
