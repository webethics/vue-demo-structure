<template>
    <div class="modal-cont">
        <b-row class="text-center">
            <b-col class="mt-2">
                <h4 v-if="status === 'need to give first test'"> You have not completed today testing. Would you like to test </h4>
                <h4 v-else> You have not completed today testing. Would you like to test or use your most recent testing results. </h4>
            </b-col>
        </b-row>
        <b-row class="text-center">
            <b-col class="mt-4">
                <router-link :to="'/tests'" class="btn btn-link ctm-btm-sin ctm-reg">
                    <span> Test </span>
                </router-link>
            </b-col>
        </b-row>
        <b-row class="text-center">
            <b-col class="mt-4">
                <router-link :to="'#'" class="btn btn-link ctm-btm-sin ctm-reg" v-if="status !== 'need to give first test'">
                    <span> Use Most Recent Test </span>
                </router-link>
            </b-col>
        </b-row>
        <b-row class="text-center">
            <b-col class="mt-4">
                <b-button class="btn btn-link ctm-btm-sin ctm-reg" @click.prevent="$emit('closeModal')">
                    <span> Cancel </span>
                </b-button>
            </b-col>
        </b-row>
    </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import TrainModal from '@/components/TrainModal'

  export default {
    name: 'TrainModal',
    props: {
        status: {
            type: String,
            required: true
        },
    },
  };
</script>
