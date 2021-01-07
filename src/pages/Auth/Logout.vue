<template>
    <div class="main-wrapper">
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import logo from './../../../../public/images/logo.png';
export default {
    data () {
        return {}
    },
    created() {
      this.logout();
    },
    methods: {
        ...mapActions('account', ['logout']),
    },
};
</script>
