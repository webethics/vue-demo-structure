<template>
    <div id="app">
        <template class="main-wrapper black-cls" v-if="loggedIn">
            <div class="main-wrapper black-cls">
                <b-container class="bv-example-row ">
                    <b-row>
                        <b-col> <img :src="logo" class="logo" /> </b-col>
                    </b-row>
                    <router-view></router-view>
                    <footer-component></footer-component>
                </b-container>
            </div>
        </template>
        <template v-else>
            <router-view></router-view>
        </template>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import FooterComponent  from '@/components/Footer.vue'
import logo from './../../public/images/logo.png';
import axios from 'axios';

export default {
    name: 'app',
    data () {
      return {
          logo: logo,
      }
    },
    computed: {
        ...mapState({
            loggedIn: state => state.account.status.loggedIn
        })
    },
    components:{ FooterComponent },
};
</script>

<style>
    @import './../../node_modules/@syncfusion/ej2-base/styles/material.css';
    @import './../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
    @import './../../node_modules/@syncfusion/ej2-popups/styles/material.css';
    @import './../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
</style>
