import axios from 'axios';

const bookingAxios = axios.create({
  baseURL: 'http://localhost:5000',
});

export default bookingAxios;
