import { BASE_URL } from '../config';
import { getData } from './services';

function getGoogleLoginURL() {
  const url = BASE_URL + `get-google-sign-in-url`;
  return getData(url, 'post');
}

function login(email, password) {
  const url = BASE_URL + 'login';
  return getData(url, 'post', {
    email,
    password
  });
}

function register({ email, password, name, password_confirmation }) {
  const url = BASE_URL + 'register';
  return getData(url, 'post', {
    email,
    password,
    name,
    password_confirmation
  });
}

export { getGoogleLoginURL, login, register };
