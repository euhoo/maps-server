import React from 'react';
// import MyGoogle from './MyGoogle';
// import constants from '../utils/constants';
// import getCoordinates from '../utils/getCoordinates';
// import getRandomCoordinates from '../utils/getRandomCoordinates';
// import MyYandex from './MyYandex';
// import getCities from '../../src/utils/getCities';
/*
export const allMarkers = [];

const addCoords = async () => {
  const coords = await getCoordinates();
  allMarkers.push(...coords);
};
addCoords();
*/
export default class App extends React.PureComponent {
  state = {
    markersList: [],
    markersCount: 0,
    map: 'Yandex',
  }

  /*
  componentDidMount() {
    if (this.state.markersList.length >= constants.countOfMarkers) return;
    const delay = constants.delay();
    const interval = setInterval(() => {
      if (this.state.markersCount === constants.countOfMarkers - 1) clearInterval(interval);
      if (allMarkers.length < constants.countOfMarkers - 5) addCoords();
      const { markersCount } = this.state;
      const current = allMarkers[markersCount] ? allMarkers[markersCount] : getRandomCoordinates();
      const markersList = [...this.state.markersList, current];
      this.setState({ markersList, markersCount: markersCount + 1 });
    }, delay);
  }
  */
  changeMap = () => {
    const { map } = this.state;
    const newMap = map === 'Google' ? 'Yandex' : 'Google';
    this.setState({ map: newMap });
  }

  render() {
    const allCoords = this.props.store;
    console.log(this.props);
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
        {/*map === 'Google'
          ? <MyGoogle positions={this.state.markersList} isMarkerShown />
          : <MyYandex positions={this.state.markersList} />
    */}
      </>
    );
  }
}
