import axios from 'axios';
import { countries } from './constants';
import getCities from './getCities';
import getCoordinates from './getCoordinates';
import getRandomCoordinates from './getRandomCoordinates';

const token = '36681ad836681ad836681ad8a536027c113366836681ad86ab815febfad14433ab16462';
const cors = 'https://cors-anywhere.herokuapp.com/';
const getRandomFloat = (min, max) => Math.round(Math.random() * (max - min) + min);
const index = getRandomFloat(1, countries.length - 1);
const id = countries[index];
const citiesUrl = `${cors}https://api.vk.com/method/database.getCities?access_token=${token}&v=5.5&need_all=1&count=15&country_id=${id}`;

export default (arr) => {
  axios.get(citiesUrl)
    .then((response) => {
      const cities = getCities(response);
      const requests = cities.map((city) => {
        const url = `https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${city}&apikey=02ceae87-2673-4933-90f5-b7f0498bbc4b`;
        return axios.get(url);
      });
      axios.all(requests)
        .then((data) => {
          arr.push(...getCoordinates(data));
        });
    });
};
