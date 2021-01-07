import api from "@/_services/api";

export const trainService = {
    getAllExercises,
    getExerciseById
};

const endpoint = '/exercises';

function getAllExercises() {
    return api().get(endpoint);
}

function getExerciseById(id) {
    return api().get(`${endpoint}/${id}`);
}
