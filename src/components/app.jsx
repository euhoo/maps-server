import React from 'react';
import { shuffle } from 'lodash';
import MyGoogle from './MyGoogle';
import { countOfMarkers, delay } from '../utils/constants';
import MyYandex from './MyYandex';

export default class App extends React.PureComponent {
  state = {
    markersList: [],
    markersCount: 0,
    map: 'Yandex',
  }

  componentDidMount() {
    const { store } = this.props;
    const interval = setInterval(() => {
      const { markersCount, markersList } = this.state;
      if (markersCount + 1 >= countOfMarkers) clearInterval(interval);
      const randomed = shuffle(store);
      this.setState({ markersList: [...markersList, randomed[0]], markersCount: markersCount + 1 });
    }, delay);
  }

  changeMap = () => {
    const { map } = this.state;
    const newMap = map === 'Google' ? 'Yandex' : 'Google';
    this.setState({ map: newMap });
  }

  render() {
    const { map, markersList } = this.state;
    const buttonStyle = {
      position: 'absolute',
      right: '5vw',
      top: '2vh',
      zIndex: '1',
    };
    const titleStyle = {
      position: 'absolute',
      left: '3vw',
      top: '2vh',
      zIndex: '1',
    };
    const button = map === 'Google'
      ? <button type="button" className="btn btn-outline-warning" style={buttonStyle} onClick={this.changeMap}>to Yandex</button>
      : <button type="button" className="btn btn-outline-success" style={buttonStyle} onClick={this.changeMap}>to Google</button>;

    return (
      <>
        <h2 style={titleStyle}>
          {`${map} Maps`}
        </h2>
        {button}
        { map === 'Google'
          ? <MyGoogle positions={markersList} isMarkerShown />
          : <MyYandex positions={markersList} />
    }
      </>
    );
  }
}
