import config from '../config';
import { authHeader } from '../_helpers';
import api from "@/_services/api";

export const userService = {
    login,
    logout,
    verifyEmail,
    sendPasswordResetLink,
    resetPassword,
    checkValidToken,
    register,
    getAll,
    getById,
    update,
    getProfile,
    updateWeight,
    updateHeight,
    delete: _delete
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.API_URL}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
        return user;
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(user)
    };
    return fetch(`${config.API_URL}/register`, requestOptions).then(handleResponse);
}

function getProfile() {
    return api().get(`${config.API_URL}/user/profile`);
}

function updateWeight(weight) {
    return api().post(`${config.API_URL}/user/profile/update/weight`, weight);
}

function updateHeight(height) {
    return api().post(`${config.API_URL}/user/profile/update/height`, height);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function verifyEmail(token) {
  const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ token: token })
  };
  return fetch(`${config.API_URL}/verify/email`, requestOptions).then(handleResponse);
}

function checkValidToken(token) {
  const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ token: token })
  };
  return fetch(`${config.API_URL}/check/token`, requestOptions).then(handleResponse);
}

function resetPassword(credentials, token) {
  const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ credentials, token: token })
  };
  return fetch(`${config.API_URL}/reset/password`, requestOptions).then(handleResponse);
}

function sendPasswordResetLink(email) {
  const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email: email })
  };

  return fetch(`${config.API_URL}/password/reset/link`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 422) {
                return Promise.reject(data);
            } else if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
