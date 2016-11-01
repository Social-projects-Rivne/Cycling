import React        from 'react';
import L            from 'leaflet';
import { LayersControl, Marker, Popup } from 'react-leaflet';

const src = require('../../../images/marker-icon-pink-silver.png');
//Extend the Default marker class
let SilverIcon = L.Icon.Default.extend({
  options: {
        iconSize: [25, 41],
        iconUrl: src
  }
});
let silverIcon = new SilverIcon();

class SilverMarker extends React.Component{
    render(){
        return(
          <Marker position={this.props.position} icon={silverIcon}>
            {null}
          </Marker>
        );
  }
}

export default SilverMarker;