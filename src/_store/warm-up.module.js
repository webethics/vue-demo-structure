import { warmUpService } from '@/_services';

const state = {
    warmups: {},
    warmUpsIsLoading: true,
};

const actions = {
    getAll({commit}) {
      warmUpService.get().then((response) => {
          commit('SET_WARM_UPS', response.data);
          commit('SET_WARM_UP_IS_LOADING', false);
      }).catch((error) => {
          return Promise.reject(error);
      });
    },
};

const mutations = {
    SET_WARM_UPS(state, data) {
      state.warmups = data.warm_ups;
    },
    SET_WARM_UP_IS_LOADING(state, value) {
      state.warmUpsIsLoading = value;
    },
};

export const warmup = {
    namespaced: true,
    state,
    actions,
    mutations
};
