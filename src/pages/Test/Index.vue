<template>
    <div>
        <b-row>
            <b-col class="test-screen">
                <step-indicator
                    :current="currentStep -1"
                    :total="allTests.length"
                    class="pro-steps"
                    v-if="allTests && allTests.length"
                    :currentColor="'rgb(255, 255, 255) !important'">
                  </step-indicator>
                <template v-if="currentTest">
                    <h1 v-text="currentTest.name" />
                    <div class="embed-responsive embed-responsive-16by9">
                        <iframe class="embed-responsive-item" :src="currentTest.video_url | embedUrl" allowfullscreen />
                    </div>
                    <p v-text="currentTest.description" />
                    <h2> Score </h2>
                    <div class="input-border">
                        <b-form-input list="my-list-id"  placeholder="Enter your Score here" v-validate="{ required: true, regex: /^\d+(?:\.\d+)?$/, between: [10,40] }" v-model="score" name="score"></b-form-input>
                    </div>
                    <div v-if="submitted && errors.has('score') "class="text-danger mt-3">
                      {{ errors.first('score') }}
                    </div>
                </template>
            </b-col>
        </b-row>
        <b-row class="back-next-btn mg-t mg-b">
            <b-col >
                <b-button class="btn btn-link" @click.prevent="back()">
                    <font-awesome-icon icon="long-arrow-alt-left" />
                    Back
                </b-button>
            </b-col>
            <b-col>
                <b-button class="btn btn-link" @click.prevent="next()">
                  Next
                    <font-awesome-icon icon="long-arrow-alt-right" />
                </b-button>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { library,config } from '@fortawesome/fontawesome-svg-core'
import StepIndicator from 'vue-step-indicator'
import {faLongArrowAltLeft, faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons'
library.add(faLongArrowAltLeft, faLongArrowAltRight)
export default {
  name: 'Test',
  data () {
      return {
          submitted: false,
      }
  },
  components: {
      StepIndicator
  },
  filters: {
    embedUrl: function (value) {
      if (value) {
        return value.replace("watch?v=", "embed/");
      }
    },
  },
  computed: {
      ...mapState('tests', [
        'allTests',
        'step',
        'currentTest',
        'currentStep'
      ]),
      score: {
          get() {
              return this.$store.state.tests.score;
          },
          set(value) {
              this.setScore(value);
          },
      },
  },
  created() {
      this.getCurrentStep();
  },
  mounted() {
    this.getAll();
  },
  methods: {
      ...mapActions('tests', ['getAll', 'saveTest', 'getCurrentStep', 'getPreviousTest']),
      ...mapMutations('tests', {
            setScore: 'SET_SCORE',
        }),
      next() {
        const dict = {
          custom: {
            score: {
              required: 'Please enter score',
              regex: 'Please enter valid number',
              between: 'Please enter score between 10 and 40'
            },
          }
        };

        this.$validator.localize('en', dict);
        this.submitted = true;
        this.$validator.validate().then(valid => {
            if (valid) {
                this.currentTest.score = this.score;
                if (this.currentStep < 9 ) {
                   this.currentTest.current_step = this.currentStep + 1;
                } else {
                   this.currentTest.current_step = this.currentStep;
                }
                this.currentTest.step = this.currentStep;
                this.saveTest(this.currentTest);
            }
        });
      },
      back() {
          if (this.currentStep > 1) {
              this.getPreviousTest(this.currentStep - 1);
          } else {
              this.$router.push({ name: 'start' }).catch(error => {});
          }
      },
  },
};
</script>
<style src="vue-step-indicator/dist/vue-step-indicator.css"></style>
