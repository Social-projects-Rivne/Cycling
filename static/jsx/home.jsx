import React from 'react';
import MapContainer from './map/container.jsx';

class Home extends React.Component{

  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    // console.log("RENDER Home, categories: ", this.props.categories);
    return (
      <div>
        <MapContainer name="map-container" categories = {this.props.categories} />
      </div>
    )
  }
};

export default Home;
