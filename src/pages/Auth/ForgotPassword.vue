<template>
    <div class="main-wrapper">
        <b-container class="bv-example-row ">
            <b-row>
                <b-col> <img :src="logo" class="logo" /> </b-col>
            </b-row>
            <b-row>
                <b-form  @submit.prevent="handleSubmit" class="form-cls">
                    <b-col class="restpass" >
                        <h2> Forgot Password? </h2>
                        <p> We just need your registered email address to send you password reset  </p>
                        <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>

                    </b-col>
                    <template v-if="!linkSend">
                      <b-form-group>
                          <b-form-input type="text" v-model="email" v-validate="'required|email'" name="email" placeholder="Email" class="form-control" :class="{ 'is-invalid': submitted && ( errors.has('email') || validationErrors.email ) }"> </b-form-input>
                          <div v-if="submitted && ( errors.has('email') || validationErrors.email )" class="invalid-feedback">{{ errors.first('email')  || validationErrors.email[0] }}</div>
                      </b-form-group>

                      <b-form-group>
                        <button-spinner type="submit" class="btn btn-primary ctm-btm-sin" :is-loading="loading " :disabled="loading">
              					    <span>Reset Password</span>
              					</button-spinner>
                      </b-form-group>
                    </template>  
                </b-form>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import logo from './../../../../public/images/logo.png';
import ButtonSpinner from 'vue-button-spinner';

export default {
    data () {
        return {
            email: '',
            submitted: false,
            logo: logo,
        }
    },
    components:{
  		ButtonSpinner
  	},
    computed: {
        ...mapState('account', ['status', 'validationErrors', 'loading', 'linkSend']),
        ...mapState({
            alert: state => state.alert
        })
    },
    created() {
      this.clearAlert();
      this.setLinkSend();
    },
    methods: {
        ...mapActions('account', ['sendPasswordResetLink']),
        ...mapMutations('account', ['setLinkSend']),
        ...mapActions({
            clearAlert: 'alert/clear'
        }),
        handleSubmit (e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.sendPasswordResetLink(this.email);
                }
            });
        }
    }
};
</script>
