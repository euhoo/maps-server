
import React from "react";
import { uniqueId } from 'lodash';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import constants from '../utils/constants';


export default compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100vh` }} />,
      containerElement: <div style={{ height: `100vh` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) => {
    const { positions } = props;
    
      return (
        <GoogleMap defaultZoom={constants.scale} defaultCenter={{ lat: 0.000, lng: 0.000 }}>
          {positions.map(position => <Marker position={position} key={uniqueId()}/>) }
        </GoogleMap>
      )
    });
    