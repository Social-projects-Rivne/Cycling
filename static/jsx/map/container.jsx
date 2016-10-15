import React from 'react';
import MapComponent from './map_component.jsx';


class MapContainer extends React.Component{
  render(){
    return (
      <div className="content-container">
          <MapComponent />
      </div>
    )
  }
};

export default MapContainer;
