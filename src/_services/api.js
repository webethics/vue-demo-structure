import axios from 'axios'
import config from '@/config';
import { userService } from '@/_services';

const axiosInstance =  axios.create({
    baseURL: `${config.API_URL}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});


axiosInstance.interceptors.request.use((config) => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.data.token) {
       config.headers['Authorization'] = `Bearer ${ user.data.token }`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
     if ([401, 403].includes(error.response.status)) {
         userService.logout();
         location.reload(true);
     };
     return Promise.reject(error);
});

export default() => {
    return axiosInstance;
}
