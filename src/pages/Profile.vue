<template>
  <div>
    <b-row>
        <div class="personal-info">
          <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>

            <h1> Personal Information </h1>
            <b-row >
                <b-col sm="4" >
                    <label for="input-small">Name</label>
                </b-col>
                <b-col sm="8" >
                    <b-form-input  class="ctm-select" size="sm" v-model ="profile.full_name" placeholder="Johan Deo"  readonly></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col sm="4" >
                    <label for="input-small">Email</label>
                </b-col>
                <b-col sm="8" >
                    <b-form-input  class="ctm-select" size="sm" v-model ="profile.email" readonly></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col sm="4" >
                    <label for="input-small">Birthday</label>
                </b-col>
                <b-col sm="8" v-if="profile.profile">
                    <b-form-input  class="ctm-select" size="sm" v-model ="profile.profile.birth_date" readonly></b-form-input>
                </b-col>
            </b-row>
        </div>
    </b-row>
    <b-row>
        <div class="personal-info up-mrgn-b" v-if="profile.profile">
            <h1> Body Measurement </h1>
            <b-row>
                <b-col sm="4" >
                    <label for="input-small">Height</label>
                </b-col>
                <b-col sm="8" class="edit-field">
                  <template v-if="!showHeightDropdown">
                      <b-form-input  class="ctm-select" size="sm" v-model="profile.profile.height + ' inches'" readonly></b-form-input>
                      <b-button class="btn btn-link" @click.prevent="showHeightDropdown = true" v-if="profile.profile.age < 25">
                          <font-awesome-icon icon="pencil-alt" />
                      </b-button>
                    </template>
                    <b-form-select class="ctm-select" v-if="showHeightDropdown" v-model="profile.profile.height" name="height" @change="changeHeight($event)">
                        <b-form-select-option :value="height.key" v-for="(height, key) in heights" :key="key" >
                          {{ height.value }}
                        </b-form-select-option>
                    </b-form-select>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="4" >
                    <label for="input-small">Weight</label>
                </b-col>
                <b-col sm="8" class="edit-field">
                  <template v-if="!showWeightDropdown">
                      <b-form-input  class="ctm-select" size="sm" v-model="profile.profile.weight + ' lbs'" readonly></b-form-input>
                      <b-button class="btn btn-link" @click.prevent="showWeightDropdown = true">
                          <font-awesome-icon icon="pencil-alt" />
                      </b-button>
                  </template>
                  <b-form-select class="ctm-select" v-if="showWeightDropdown" v-model="profile.profile.weight"  @change="changeWeight($event)">
                      <b-form-select-option :value="weight.key" v-for="(weight, key) in weights" :key="key">
                        {{ weight.value }}
                      </b-form-select-option>
                  </b-form-select>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="4" >
                    <label for="input-small">Shoulder To Wrist</label>
                </b-col>
                <b-col sm="8" >
                    <b-form-input  class="ctm-select" size="sm" v-model="profile.profile.shoulder_to_wrist" readonly></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="4" >
                    <label for="input-small">Elbow To Wrist</label>
                </b-col>
                <b-col sm="8" >
                    <b-form-input  class="ctm-select" size="sm" v-model="profile.profile.ellbow_to_wrist" readonly></b-form-input>
                </b-col>
            </b-row>
        </div>
    </b-row>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { library,config } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { weights, heights } from '@/utils';
library.add(faPencilAlt)

export default {
    name: 'Profile',
    data () {
        return {
            user: {
                height:null,
                weight:null
            },
            showWeightDropdown: false,
            showHeightDropdown: false,
            weights: weights,
            heights: heights,
            submitted: false,
        }
    },
    computed: {
        ...mapState('users', ['profile']),
        ...mapState({
            alert: state => state.alert
        })
    },
    created() {
        this.getProfile();
        this.clearAlert();
    },
    methods: {
        ...mapActions('users', ['getProfile', 'updateHeight', 'updateWeight']),
        ...mapActions({
            clearAlert: 'alert/clear'
        }),
        changeWeight(value) {
          this.updateWeight(value).then(() => {
              this.showWeightDropdown = false;
          });
        },
        changeHeight(value) {
          this.updateHeight(value).then(() => {
              this.showHeightDropdown = false;
          });
        },
    },
};
</script>
