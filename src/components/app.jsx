import React from 'react';
import _ from 'lodash';
import MyGoogle from './MyGoogle';
import constants from '../utils/constants';
import MyYandex from './MyYandex';

export default class App extends React.PureComponent {
  state = {
    markersList: [],
    markersCount: 0,
    map: 'Yandex',
  }


  componentDidMount() {
    const { store } = this.props;
    //console.log(store);
    const interval = setInterval(() => {
      const { markersCount, markersList } = this.state;
      const randomed = _.shuffle(store);
      const coord = randomed[markersCount];
      //console.log(this.state.markersList);
      this.setState({ markersList: [...markersList, coord], markersCount: markersCount + 1 });
      if (markersCount > constants.countOfMarkers) clearInterval(interval);

    }, constants.delay());
  }


  changeMap = () => {
    const { map } = this.state;
    const newMap = map === 'Google' ? 'Yandex' : 'Google';
    this.setState({ map: newMap });
  }

  render() {
    const { map } = this.state;
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
          ? <MyGoogle positions={this.state.markersList} isMarkerShown />
          : <MyYandex positions={this.state.markersList} />
    }
      </>
    );
  }
}
