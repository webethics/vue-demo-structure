<template>
    <div>
        <b-row>
            <b-col class="tab-content lstep">
                <div class="tscore">
                    <h1> Today's Score </h1>
                    <div id="today-score" class="mg-b">
                        <Progress :transitionDuration="5000" :radius="120" :strokeWidth="50" :value="todayScore" id="today-score">
                            <div class="content">
                              {{ todayScore }}
                            </div>
                        </Progress>
                    </div>
                    <!-- <b-form-radio-group>
                        <b-form-radio :value="{ fourth: 4 }"> Change 3% </b-form-radio>
                        <b-form-radio value="fifth"> Age Rank 85% </b-form-radio>
                        </b-form-radio-group> -->
                    <div class="train ">
                        <router-link to="/warm-ups" class="btn btn-link ctm-btm-sin ctm-reg">
                            <span v-text = "'Warm - Up'"/>
                        </router-link>
                        <b-button @click.prevent="testHasCompleted()" class="btn btn-link ctm-btm-sin ctm-reg">
                          <span v-text ="'Train'"></span>
                        </b-button>
                    </div>
                    <b-modal v-model="showModal" id="ctm-modal-1" centered>
                          <train-modal :status="status" @closeModal="showModal = false"></train-modal>
                    </b-modal>
                </div>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Progress from "easy-circular-progress";
import TrainModal from '@/components/TrainModal'

export default {
  name: "TodayScore",
  data() {
    return {
      showModal: false,
    };
  },
  components: {
      Progress,
      TrainModal
  },
  computed: {
      ...mapState('tests', ['todayScore', 'status']),
  },
  created() {
      this.getTodayScore();
  },
  methods: {
      ...mapActions('tests', ['getTodayScore', 'testCompleted']),
      testHasCompleted() {
        this.testCompleted().then(() => {
            if (this.status == 'completed') {
                this.$router.push({ name: 'train' });
            } else {
                this.showModal = true;
            }
        }).catch((error) => {
            return Promise.reject(error);
        });
      },
  },
};
</script>
