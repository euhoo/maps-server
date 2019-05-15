import axios from 'axios';

const route = '/api/v1/coordinates/';
export const sendCoordinate = data => axios.post(route, data);
export const getCoordinate = () => axios.get(route);
