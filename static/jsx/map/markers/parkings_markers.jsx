import React        from 'react';
import { LayersControl, Marker, Popup } from 'react-leaflet';


let parkingsMarkers = function(parkings){
  console.log('Parkings: ', parkings.length);
  if (parkings){
    let my_array = parkings.map(function(parkng, i){
        const position = [parseFloat(parkng.fields.lat), parseFloat(parkng.fields.lng)];
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

export default parkingsMarkers;