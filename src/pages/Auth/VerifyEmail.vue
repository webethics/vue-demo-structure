<template>
    <div class="main-wrapper">
        <b-container class="bv-example-row ">
            <b-row>
                <b-col> <img :src="logo" class="logo" /> </b-col>
            </b-row>
            <b-row>
                <b-form  class="form-cls">
                </b-form>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import logo from './../../../../public/images/logo.png';

export default {
    data () {
        return {
            email: '',
            submitted: false,
            logo:logo,
        }
    },
    created() {
        this.verifyEmail(this.$route.params.token);
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
      ...mapActions('account', ['verifyEmail']),
    }
};
</script>
