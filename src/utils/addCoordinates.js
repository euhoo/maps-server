import axios from 'axios';
import { shuffle } from 'lodash';
import { countries, token, cors } from './constants';
import getCities from './getCities';
import normalize from './normalize';

export default () => {
  const randomCountryId = shuffle(countries)[0];
  const citiesUrl = `${cors}https://api.vk.com/method/database.getCities?access_token=${token}&v=5.5&need_all=1&count=15&country_id=${randomCountryId}`;

  axios.get(citiesUrl)
    .then((response) => {
      const cities = getCities(response);
      const requests = cities.map((city) => {
        const url = `https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${city}&apikey=02ceae87-2673-4933-90f5-b7f0498bbc4b`;
        return axios.get(url);
      });
      axios.all(requests)
        .then((data) => {
          const coord = normalize(data);
          axios.post('/api/v1/coordinates/', coord);
        });
    });
};
