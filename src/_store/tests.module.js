import { testService } from '@/_services';
import { router } from '@/_helpers';

const state = {
    allTests: {},
    score: 10,
    currentStep: 1,
    todayScore: null,
    status: 'need to give first test',
    currentTest: {},
};

const actions = {
    getAll({ commit }) {
        testService.get().then((response) => {
           commit('SET_TESTS', response.data);
        }).catch((error) => {
            return Promise.reject(error);
        });
    },

    getCurrentStep({commit}) {
        return testService.getCurrentStep().then((response) => {
            commit('SET_CURRENT_STEP', response.data.current_step);
        }).catch((error) => {
            return Promise.reject(error);
        });
    },

    getPreviousTest({ commit }, step) {
        testService.getPreviousTest(step).then((response) => {
            commit('SET_CURRENT_STEP', response.data.current_step);
            commit('SHOW_PREVIOUS_TEST');
            commit('SET_SCORE', response.data.score);
        }).catch((error) => {
            return Promise.reject(error);
        });
    },

    saveTest({ commit }, data) {
        testService.save(data).then((response) => {
            if (state.currentStep == state.allTests.length ) {
                router.push({ name: 'today-score' });
            } else {
              commit('SHOW_NEXT_TEST');
              if (response.data.score) {
                commit('SET_SCORE', response.data.score)
              }
              commit('SET_CURRENT_STEP', response.data.current_step);
            }
        }).catch((error) => {
            return Promise.reject(error);
        });
    },

    getTodayScore({ commit }) {
        testService.todayScore().then((response) => {
            commit('SET_TODAY_SCORE', response.data);
        }).catch((error) => {
            return Promise.reject(error);
        });
    },

    testCompleted({ commit }) {
        return testService.testCompleted().then((response) => {
            commit('SET_TEST_STATUS', response.data.status);
        }).catch((error) => {
            return Promise.reject(error);
        });
    },
};

const mutations = {
  SET_TESTS(state, data) {
      state.allTests = data.tests;
      state.currentTest = state.allTests[state.currentStep - 1];
  },

  SET_TEST_STATUS(state, status) {
      state.status = status;
  },

  SHOW_NEXT_TEST(state) {
      state.score = 10;
      state.currentStep += 1;
      state.currentTest = state.allTests[state.currentStep - 1];
  },

  SHOW_PREVIOUS_TEST(state) {
      state.currentTest = state.allTests[state.currentStep - 1];
  },

  SET_SCORE(state, value) {
      state.score = value;
  },

  SET_TODAY_SCORE(state, value) {
      state.todayScore = value.today_score ?? 0;
  },

  SET_CURRENT_STEP(state, value) {
      if (value) {
        state.currentStep = value;
      }
  },
};

export const tests = {
    namespaced: true,
    state,
    actions,
    mutations
};
