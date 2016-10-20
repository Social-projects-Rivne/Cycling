import React        from 'react';
import { LayersControl, Marker, Popup } from 'react-leaflet';


let stolenMarkers = function(bikes){
  console.log('Stolen bikes: ', bikes.length);
  if (bikes){
    let my_array = bikes.map(function(bike, i){
        const position = [parseFloat(bike.fields.lat), parseFloat(bike.fields.lng)];
        // console.log(position);
        return(
          <Marker position={position} key={i}>
            <Popup>
              <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
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