import axios from 'axios';
import getCities from './getCities';
import getRandomCoordinates from './getRandomCoordinates';

export default data => data.map((item) => {
  const part = item.data.response.GeoObjectCollection.featureMember[0];
  if (!part) return getRandomCoordinates();
  const result = part.GeoObject.Point.pos;
  if (!result) return getRandomCoordinates();
  const coord = result.split(' ');
  const lng = Number(coord[0]);
  const lat = Number(coord[1]);
  const obj = { lat, lng };
  return obj;
});
