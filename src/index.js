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

const store = gon.coordinates;

const addingCoordinates = setInterval(() => {
  addCoordinates();
  if (constants.countOfMarkers < store.length) clearInterval(addingCoordinates);
}, 1000);

App(store);
const socket = io();
socket.on('newCoordinates', (data) => store.push(...data));
