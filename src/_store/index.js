import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { account } from './account.module';
import { users } from './users.module';
import { tests } from './tests.module';
import { warmup } from './warm-up.module';
import { trains } from './trains.module';


Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        account,
        users,
        tests,
        warmup,
        trains
    }
});
