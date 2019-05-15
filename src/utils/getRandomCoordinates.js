import { coordinates } from './constants';

const random = length => Math.round(Math.random() * (length - 1));

export default () => {
  const i = random(coordinates.length);
  const coord = coordinates[i];
  return coord;
};
