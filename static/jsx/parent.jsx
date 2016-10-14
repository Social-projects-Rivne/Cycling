import React from 'react';
import MapContainer from './map/container.jsx';

class Parent extends React.Component{
  render(){
    return (
      <div>
        <div> This is the parent. </div>
        <MapContainer name="map-container" />
      </div>
    )
  }
};

export default Parent;
