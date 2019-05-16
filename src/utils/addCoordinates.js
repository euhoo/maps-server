import axios from 'axios';
import { shuffle } from 'lodash';
import { countries, cors } from './constants';
import { vkToken, yandexToken } from '../../API';
import getCities from './getCities';
import normalize from './normalize';

export default () => {
  const randomCountryId = shuffle(countries)[0];
  const citiesUrl = `${cors}https://api.vk.com/method/database.getCities?access_token=${vkToken}&v=5.5&need_all=1&count=15&country_id=${randomCountryId}`;

  axios.get(citiesUrl)
    .then((response) => {
      const cities = getCities(response);
      const requests = cities.map((city) => {
        const url = `https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${city}&apikey=${yandexToken}`;
        return axios.get(url);
      });
      axios.all(requests)
        .then((data) => {
          const coord = normalize(data);
          axios.post('/api/v1/coordinates/', coord);
        });
    });
};
