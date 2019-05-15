import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { uniqueId } from 'lodash';
import { scale as zoom } from '../utils/constants';

const MyYandex = (props) => {
  const { positions } = props;
  const parsedPositions = positions.map(item => [item.lat, item.lng]);
  return (
    <YMaps>
      <Map defaultState={{ center: [0, 0], zoom }} style={{ height: '100vh' }}>
        {parsedPositions.map(coordinate => <Placemark geometry={coordinate} key={uniqueId()} />)}
      </Map>
    </YMaps>
  );
};
export default MyYandex;
