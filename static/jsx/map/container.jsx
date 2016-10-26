import React from 'react';
import MapComponent from './map_component.jsx';


class MapContainer extends React.Component{
  render(){
    return (
          	<MapComponent categories={this.props.categories}/>
    )
  }
};

export default MapContainer;
