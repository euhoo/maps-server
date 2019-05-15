import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import io from 'socket.io-client';
import gon from 'gon';
import * as queries from './utils/queries';
import constants, { coordinates } from './utils/constants';
import App from './components/index';
import addCoordinates from './utils/addCoordinates';
// import getCoordinates from './utils/getCoordinates';
// import getCities from './utils/getCities'
// import cookies from 'js-cookie';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
const data = [coordinates[0], coordinates[1]];
queries.sendCoordinate(data);
const store = gon.coordinates;

const interval = setInterval(() => {
  if (constants.countOfMarkers * 10 < store.length) clearInterval(interval);
  addCoordinates(store);
  console.log(store);
}, 1000);

App(store);
const socket = io();
socket.on('newCoordinates', response => console.log(response));
