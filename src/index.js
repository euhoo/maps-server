import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import io from 'socket.io-client';
import gon from 'gon';
import { countOfMarkers } from './utils/constants';
import App from './components/index';
import addCoordinates from './utils/addCoordinates';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const store = gon.coordinates;

const addingCoordinates = setInterval(() => {
  addCoordinates();
  if (countOfMarkers * 2 < store.length) clearInterval(addingCoordinates);
}, 1000);

App(store);
const socket = io();
socket.on('newCoordinates', (data) => {
  store.push(...data);
});
