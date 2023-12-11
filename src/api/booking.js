import axios from 'axios';

const bookingAxios = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

export default bookingAxios;
