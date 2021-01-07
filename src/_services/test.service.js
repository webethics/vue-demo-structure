import api from "@/_services/api";

export const testService = {
    get,
    save,
    todayScore,
    testCompleted,
    getCurrentStep,
    getPreviousTest
};

const endpoint = '/tests';

function get() {
    return api().get(endpoint);
}

function save(data) {
  return api().post(endpoint, data);
}

function todayScore(data) {
  return api().get(`${endpoint}/today/score`);
}

function testCompleted() {
  return api().get(`${endpoint}/completed`);
}

function getCurrentStep() {
  return api().get(`${endpoint}/current/step`);
}

function getPreviousTest(step) {
  return api().get(`${endpoint}/previous/${step}`);
}
