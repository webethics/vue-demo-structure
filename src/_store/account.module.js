import { userService } from '../_services';
import { router } from '../_helpers';

const user = JSON.parse(localStorage.getItem('user'));
const state = user ? { status: { loggedIn: true }, user, validationErrors: {}, loading: false, linkSend: false} : { status: {}, user: null, validationErrors: {}, loading : false, linkSend: false };

const actions = {
    login({ dispatch, commit }, { email, password }) {
        commit('loginRequest', { email });

        userService.login(email, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/home');
                },
                error => {
                    if (error.errors) {
                        commit('setErrors422', error.errors);
                    }

                    const errorMessage = error.message || error;

                    commit('loginFailure', errorMessage);
                    dispatch('alert/error', errorMessage, { root: true });
                }
            );
    },
    verifyEmail({ dispatch, commit }, token) {
        userService.verifyEmail(token)
            .then(
                data => {
                  router.push('/login');
                  setTimeout(() => {
                      // display success message after route change completes
                      dispatch('alert/success', data.message, { root: true });
                  })
                },
                error => {
                  router.push('/login');
                  setTimeout(() => {
                      // display success message after route change completes
                      dispatch('alert/error', error, { root: true });
                  })
                }
            );
    },
    resetPassword({ dispatch, commit }, { credentials, token }) {
        userService.resetPassword(credentials, token)
            .then(
                data => {
                  router.push('/login');
                  setTimeout(() => {
                      // display success message after route change completes
                      dispatch('alert/success', data.message, { root: true });
                  })
                },
                error => {
                    const errorMessage = error.message || error;
                    dispatch('alert/error', errorMessage, { root: true });
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/error', error, { root: true });
                    })
                }
            );
    },
    checkValidToken({ dispatch, commit }, token) {
        userService.checkValidToken(token)
            .then(
                data => {},
                error => {
                  router.push('/login');
                  setTimeout(() => {
                      // display success message after route change completes
                      dispatch('alert/error', error, { root: true });
                  })
                }
            );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
        router.push('/login');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
        commit('setLoading', true);
        userService.register(user)
            .then(
                data => {
                    commit('registerSuccess', data);
                    commit('setLoading', false);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', data.message, { root: true });
                    })
                },
                error => {
                    if (error.errors) {
                        commit('setErrors422', error.errors);
                    }
                    commit('setLoading', false);
                    const errorMessage = error.message || error;
                    commit('registerFailure', errorMessage);
                    dispatch('alert/error', errorMessage, { root: true });
                }
            );
    },

    sendPasswordResetLink({ dispatch, commit }, email) {
      commit('setLoading', true);
      userService.sendPasswordResetLink(email)
          .then(
              data => {
                  commit('setLoading', false);
                  commit('setLinkSend', true);
                  setTimeout(() => {
                      // display success message after route change completes
                      dispatch('alert/success', data.message, { root: true });
                  })
              },
              error => {
                  if (error.errors) {
                      commit('setErrors422', error.errors);
                  }
                  commit('setLoading', false);
                  commit('setLinkSend');
                  const errorMessage = error.message || error;
                  commit('registerFailure', errorMessage);
                  dispatch('alert/error', errorMessage, { root: true });
              }
          );
    },
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    },
    setErrors422(state, errors) {
        state.validationErrors = errors;
    },
    resetValidationErrors(state) {
        state.validationErrors = {};
    },
    setLoading(state, value) {
       state.loading = value;
    },
    setLinkSend(state, value = false) {
        state.linkSend = value;
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
