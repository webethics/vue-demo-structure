<template>
  <div>
      <b-row>
          <div class="tab-content">
              <b-tabs content-class="mt-3" align="center">
                  <b-tab title="7 Days Score" active>
                      <b-col class="line-chart">
                          <line-chart></line-chart>
                      </b-col>
                  </b-tab>
                  <b-tab title="30 Days Score">
                      <p> 30 Days Score Graph Showen here</p>
                  </b-tab>
              </b-tabs>
          </div>
      </b-row>
      <b-row>
          <b-col  class="hbox-content">
              <h1> Learn </h1>
              <p> It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
              <router-link to="#app" class="btn btn-link">
                  Learn
                  <font-awesome-icon icon="angle-double-right" />
              </router-link>
          </b-col>
          <b-col  class="hbox-content">
              <h1> Shop  </h1>
              <img :src="shopimg" class="shopimg" />
              <router-link to="#app" class="btn btn-link">
                  Shop
                  <font-awesome-icon icon="angle-double-right" />
              </router-link>
          </b-col>
      </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import shopimg from './../../../public/images/shopimg.jpg';
import LineChart from '@/components/LineChart'
import { library,config } from '@fortawesome/fontawesome-svg-core'
import {faCoffee, faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons'
library.add(faCoffee, faAngleDoubleRight)

export default {
  name: 'Home',
    components: {
      LineChart,
    },
    data () {
      return {
        user: {
            test:null,
        },
        shopimg: shopimg,
      }
    },
};
</script>
