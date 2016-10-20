import React from 'react';
import MapContainer from './map/container.jsx';

class Home extends React.Component{
  render(){
    return (
      <div>
        <MapContainer name="map-container" />
      </div>
    )
  }
};

export default Home;
