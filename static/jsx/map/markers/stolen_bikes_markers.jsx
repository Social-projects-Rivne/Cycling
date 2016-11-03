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

let stolenMarkers = function(bikes){
  console.log('Stolen bikes: ', bikes.length);
  if (bikes){
    let my_array = bikes.map(function(bike, i){
        const position = [parseFloat(bike.fields.lat), parseFloat(bike.fields.lng)];
        // console.log(position);
        return(
          <Marker position={position} key={i} icon={redIcon}>
            <Popup>
              <span>Stolen bicycle. <br/> Day: {bike.fields.day}.</span>
            </Popup>
          </Marker>
        );
        }
      );

    return my_array;
  }else{
    return (
      null
    )
  }
}

export default stolenMarkers;