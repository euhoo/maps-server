import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import io from 'socket.io-client';
import gon from 'gon';
import coordinates from './utils.js/coordinates';
import * as queries from './utils.js/queries';
// import cookies from 'js-cookie';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
const data = [coordinates[0], coordinates[1]];
queries.sendCoordinate(data);
const store = gon.coordinates;
console.log(store);
const socket = io();
socket.on('newCoordinates', response => console.log(response));
