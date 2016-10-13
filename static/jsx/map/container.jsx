import React from 'react';
import MapComponent from './map_component.jsx';


class MapContainer extends React.Component{
  render(){
    return (
      <div>
        and this is the <b>{this.props.name}</b>.
        <div>
          <MapComponent />
        </div>
      </div>
    )
  }
};

export default MapContainer;
