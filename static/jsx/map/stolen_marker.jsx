import React        from 'react';
import { Marker, Popup } from 'react-leaflet';


let stolenMarker = function(bikes){
  if (bikes){
    return (
      bikes.map(function(bike, i){
        const position = [parseFloat(bike.fields.lat), parseFloat(bike.fields.lng)];
        console.log(position);
        return(
          <Marker position={position} key={i}>
            <Popup>
              <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
            </Popup>
          </Marker>
        )
        }
      )
    )
  }else{
    return (
      null
    )
  }
}

export default stolenMarker;