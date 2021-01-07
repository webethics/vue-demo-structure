<template>
  <div>
    <b-row>
        <h1> All Warm-Up </h1>
    </b-row>
    <b-row class="mt-2">
        <spinner-component v-if="warmUpsIsLoading"></spinner-component>
    </b-row>
    <b-row>
        <div class="train-list">
            <template v-for="warmup in warmups">
                  <div class="strn-cls">
                    <b-row>
                    <b-col cols="4">
                      <div class="embed-responsive embed-responsive-16by9">
                          <iframe class="embed-responsive-item" :src="warmup.video_url | embedUrl" allowfullscreen></iframe>
                      </div>
                    </b-col>
                    <b-col cols="8" class="text-break">
                        <div class="exc-txt">
                          <h4 v-text="warmup.name"/>
                          <p v-text="warmup.description"/>
                      </div>
                    </b-col>
                  </b-row>

                  </div>
              <!-- </router-link> -->
            </template>
        </div>
    </b-row>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import SpinnerComponent from '@/components/Spinner'
export default {
    name: 'Warmup',
    data () {
      return {
        submitted: false,
      }
    },
    components: {
        SpinnerComponent,
    },
    filters: {
      embedUrl: function (value) {
        if (value) {
          return value.replace("watch?v=", "embed/");
        }
      },
    },
    computed: {
        ...mapState('warmup', ['warmups', 'warmUpsIsLoading']),
    },
    created() {
        this.getAll();
    },
    methods: {
        ...mapActions('warmup', ['getAll']),
    },
};
</script>
