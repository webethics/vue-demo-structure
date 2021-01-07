import { trainService } from '@/_services';

const state = {
    exercises: {},
    exercise: {},
    exerciseIsLoading: true,
};

const actions = {
    getAllExercises({ commit }) {
        trainService.getAllExercises().then((response) => {
           commit('SET_EXERCISES', response.data);
           commit('SET_EXERCISE_IS_LOADING', false);
        }).catch((error) => {
            return Promise.reject(error);
        });
    },
    getExerciseById({ commit }, id) {
        return trainService.getExerciseById(id).then((response) => {
           commit('SET_EXERCISE', response.data);
        }).catch((error) => {
            return Promise.reject(error);
        });
    },
};

const mutations = {
  SET_EXERCISES(state, data) {
      state.exercises = data.exercises;
  },
  SET_EXERCISE(state, data) {
      state.exercise = data.exercise;
  },
  SET_EXERCISE_IS_LOADING(state, value) {
      state.exerciseIsLoading = value;
  },
};

export const trains = {
    namespaced: true,
    state,
    actions,
    mutations
};
