import api from "@/_services/api";

export const warmUpService = {
    get,
};

function get() {
    return api().get('/warm-ups');
}
