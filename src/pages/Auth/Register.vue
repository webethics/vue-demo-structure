<template>
<div class="main-wrapper" >
    <b-container class="bv-example-row ">
        <b-row> <b-col> <img :src="logo" class="logo" /> </b-col></b-row>
        <b-row>
            <b-form @submit.prevent="handleSubmit" class="form-cls">

                <b-form-group>
                    <b-form-input type="text" v-model="user.first_name" v-validate="'required'" name="first_name" placeholder="First Name"  class="form-control" :class="{ 'is-invalid': submitted && ( errors.has('first_name') || validationErrors.first_name )  }" > </b-form-input>
                    <div v-if="submitted && ( errors.has('first_name') || validationErrors.first_name )" class="invalid-feedback">{{ errors.first('first_name') || validationErrors.first_name[0] }}</div>
                </b-form-group>

                <b-form-group>
                    <b-form-input type="text" v-model="user.last_name" v-validate="'required'" name="last_name" placeholder="Last Name"  class="form-control" :class="{ 'is-invalid': submitted && ( errors.has('last_name') || validationErrors.last_name )  }" > </b-form-input>
                    <div v-if="submitted && ( errors.has('last_name') || validationErrors.last_name )" class="invalid-feedback">{{ errors.first('last_name') || validationErrors.last_name[0] }}</div>
                </b-form-group>

                <b-form-group>
                    <b-form-input type="text" v-model="user.email" v-validate="'required|email'" name="email" placeholder="Email" class="form-control" :class="{ 'is-invalid': submitted && ( errors.has('email') || validationErrors.email ) }"> </b-form-input>
                    <div v-if="submitted && ( errors.has('email') || validationErrors.email )" class="invalid-feedback">{{ errors.first('email')  || validationErrors.email[0] }}</div>
                </b-form-group>

                <b-form-group>
                    <b-form-input type="password" v-model="user.password" v-validate="'required|min:6'" name="password" placeholder="Password" class="form-control" :class="{ 'is-invalid': submitted &&  ( errors.has('password')  || validationErrors.password ) }" ref="password"> </b-form-input>
                    <div v-if="submitted && ( errors.has('password') || validationErrors.password )" class="invalid-feedback">{{ errors.first('password') || validationErrors.password[0] }}</div>
                </b-form-group>

                <b-form-group>
                    <b-form-input type="password" v-model="user.password_confirmation" v-validate="'required|min:6|confirmed:password'" name="password_confirmation" placeholder="Confirm Password" class="form-control" :class="{ 'is-invalid': submitted && ( errors.has('password_confirmation') || validationErrors.password_confirmation ) }" data-vv-as="password"> </b-form-input>
                    <div v-if="submitted && ( errors.has('password_confirmation') || validationErrors.password_confirmation )" class="invalid-feedback" data-vv-as="password">{{ errors.first('password_confirmation') || validationErrors.password_confirmation[0] }}</div>
                </b-form-group>

                <b-form-group>
                    <b-form-select class="ctm-select" v-model="user.height" v-validate="'required'" name="height">
                        <b-form-select-option :value="null">HEIGHT</b-form-select-option>
                        <b-form-select-option :value="height.key" v-for="(height, key) in heights" :key="key">
                          {{ height.value }}
                        </b-form-select-option>
                    </b-form-select>
                    <div v-if="submitted && ( errors.has('height') || validationErrors.height )" class="invalid-feedback">{{ errors.first('height') || validationErrors.height[0] }}</div>
                </b-form-group>

                <b-form-group>
                    <b-form-select class="ctm-select" v-model="user.weight" v-validate="'required'" name="weight">
                        <b-form-select-option :value="null">WEIGHT</b-form-select-option>
                        <b-form-select-option :value="weight.key" v-for="(weight, key) in weights" :key="key">
                          {{ weight.value }}
                        </b-form-select-option>
                    </b-form-select>
                    <div v-if="submitted && ( errors.has('weight') || validationErrors.weight )" class="invalid-feedback">{{ errors.first('weight') || validationErrors.weight[0] }}</div>
                </b-form-group>

                    <b-form-group>
                        <b-form-datepicker class="ctm-select ctm-calndr" id="datepicker-dateformat2"  v-validate="'required'" name="birth_date" v-model="user.birth_date" placeholder="BIRTHDAY" type="text" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"></b-form-datepicker>
                        <div v-if="submitted && ( errors.has('birth_date') || validationErrors.birth_date )" class="invalid-feedback">{{ errors.first('birth_date') || validationErrors.birth_date[0] }}</div>
                    </b-form-group>

                    <b-form-group>
                      <button-spinner type="submit" class="btn btn-primary ctm-btm-sin" :is-loading="loading " :disabled="loading">
            					    <span>Sign up</span>
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
import { weights, heights } from '@/utils';
import ButtonSpinner from 'vue-button-spinner';

export default {
    data () {
        return {
            user: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirmation: '',
                birth_date: '',
                height: null,
                weight: null
            },
            submitted: false,
            logo: logo,
            weights: weights,
            heights: heights
        }
    },
    components:{
  		ButtonSpinner
  	},
    computed: {
        ...mapState('account', ['status', 'validationErrors', 'loading']),
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions('account', ['register']),
        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.register(this.user);
                }
            });
        }
    }
};
</script>
