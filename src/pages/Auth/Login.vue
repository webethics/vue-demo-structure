<template>
    <div class="main-wrapper">
        <b-container class="bv-example-row ">
            <b-row> <b-col> <img :src="logo" class="logo" /> </b-col></b-row>
            <b-row>
                <b-form @submit.prevent="handleSubmit" class="form-cls">
                    <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                    <b-form-group>
                        <b-form-input type="email" v-model="email" v-validate="'required|email'" name="email" placeholder="Email" class="form-control" :class="{ 'is-invalid': submitted && !email }"> </b-form-input>
                        <div v-if="submitted &&  ( errors.has('email') || validationErrors.email)" class="invalid-feedback">{{ errors.first('email') || validationErrors.email[0] }}</div>
                    </b-form-group>

                    <b-form-group>
                        <b-form-input type="password" v-model="password" name="password" v-validate="'required'" placeholder="Password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                        <div v-if="submitted &&  ( errors.has('password') || validationErrors.password )" class="invalid-feedback">{{ errors.first('password') || validationErrors.password[0] }}</div>
                    </b-form-group>

                    <b-form-group>
                        <button class="btn btn-primary ctm-btm-sin"><span> Sign In </span></button>
                    </b-form-group>

                    <b-form-group>
                        <router-link to="/forgot/password" class="btn btn-link ctm-fpw">Forgot Password? </router-link>
                    </b-form-group>

                    <b-form-group>
                        <router-link to="/signup" class="btn btn-link ctm-btm-sin ctm-reg"><span> Sign up </span></router-link>
                    </b-form-group>
                </b-form>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import logo from './../../../../public/images/logo.png';
export default {
    data () {
        return {
            email: '',
            password: '',
            submitted: false,
            logo:logo,
        }
    },
    computed: {
        ...mapState('account', ['status', 'validationErrors']),
        ...mapState({
            alert: state => state.alert
        })
    },
    created() {
      this.clearAlert();
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        ...mapActions({
            clearAlert: 'alert/clear'
        }),
        handleSubmit (e) {
            this.submitted = true;
            const { email, password } = this;
            this.$validator.validate().then(valid => {
                if (valid) {
                  this.login({ email, password })
                }
            })
        }
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    }
};
</script>
