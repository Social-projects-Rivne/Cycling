import React        from 'react';
import L            from 'leaflet';
import { LayersControl, Marker, Popup } from 'react-leaflet';

const src = require('../../../images/marker-icon-red.png');
//Extend the Default marker class
let RedIcon = L.Icon.Default.extend({
  options: {
        iconSize: [25, 41],
        iconUrl: src
  }
});
let redIcon = new RedIcon();

class RedMarker extends React.Component{
    render(){
        return(
          <Marker position={this.props.position} icon={redIcon}>
            {null}
          </Marker>
        );
  }
}

export default RedMarker;