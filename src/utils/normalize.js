import { shuffle } from 'lodash';
import coordinates from './coordinates';

export default data => data.map((item) => {
  const part = item.data.response.GeoObjectCollection.featureMember[0];
  if (!part) return shuffle(coordinates)[0];
  const result = part.GeoObject.Point.pos;
  if (!result) return shuffle(coordinates)[0];
  const coord = result.split(' ');
  const lng = Number(coord[0]);
  const lat = Number(coord[1]);
  return { lat, lng };
});
