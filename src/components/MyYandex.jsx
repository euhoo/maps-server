import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { uniqueId } from 'lodash';

export default class MyYandex extends React.Component {
  render() {
    const { positions } = this.props;
    const parsedPositions = positions.map((item) => [item.lat, item.lng]);
    return (
      <YMaps>
          <Map defaultState={{ center: [0, 0], zoom: 1 }} style={{ height: '100vh' }}>
            {parsedPositions.map(coordinate => <Placemark geometry={coordinate} key={uniqueId()} />)}
          </Map>
        </YMaps>
    );
  }
}