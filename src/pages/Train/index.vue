<template>
    <div>
        <b-row v-if="!exerciseIsLoading">
            <div class="ctm-table">
                <b-table-simple hover small caption-top responsive>
                    <b-thead >
                        <b-tr class="head-row">
                            <b-th> Name </b-th>
                            <b-th> Band </b-th>
                            <b-th> Sets </b-th>
                            <b-th> Reps </b-th>
                            <b-th> Tempo </b-th>
                            <b-th> Help </b-th>
                        </b-tr>
                    </b-thead>
                    <b-tbody>
                        <b-tr class="content-row" v-for="(exercise, key) in exercises" :key="key">
                            <b-td v-text="exercise.name" />
                            <b-td v-text="exercise.band" />
                            <b-td v-text="exercise.sets" />
                            <b-td v-text="exercise.reps" />
                            <b-td v-text="exercise.tempo" />
                            <b-td>
                                <b-button @click="showModal(exercise.id)">
                                    <font-awesome-icon icon="question-circle" />
                                </b-button>
                            </b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
            </div>
        </b-row>
        <spinner-component v-else></spinner-component>
        <b-modal v-model="modalShow" id="ctm-modal-1">
            <div class="modal-cont">
                <b-row>
                    <b-col class="mt-2" v-for="(image,key) in exercise.images" :key="key">
                        <img :src="image.thumbnail_image" class="exercise-image"/>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <div class="embed-responsive embed-responsive-16by9 modal-video">
                            <iframe class="embed-responsive-item" :src="exercise.video_url | embedUrl" allowfullscreen></iframe>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <ul class="tips-ul">
                            <li v-for="(tip, key) in exercise.tips" :key="key">
                                <font-awesome-icon icon="check" />
                                 {{ tip.text }}
                             </li>
                        </ul>
                    </b-col>
                </b-row>
            </div>
        </b-modal>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import logo from './../../../../public/images/logo.png';
import pop1 from './../../../../public/images/pop-img1.jpg';
import pop2 from './../../../../public/images/pop-img2.jpg';
import pop3 from './../../../../public/images/pop-img3.jpg';
import { library } from '@fortawesome/fontawesome-svg-core'
import {faQuestionCircle, faCheck} from '@fortawesome/free-solid-svg-icons'
import SpinnerComponent from '@/components/Spinner'

library.add(faQuestionCircle, faCheck)

export default {
    name: 'Train',
    data () {
        return {
          submitted: false,
          pop1: pop1,
          pop2: pop2,
          pop3: pop3,
          modalShow: false,
        };
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
      ...mapState('trains', [
        'exercises',
        'exercise',
        'exerciseIsLoading',
      ]),
    },
    created() {
        this.getAllExercises();
    },
    methods: {
        ...mapActions('trains', ['getAllExercises', 'getExerciseById']),
        showModal(id) {
            this.getExerciseById(id).then(() => {
                this.modalShow = true;
            });
        },
    }
};
</script>
