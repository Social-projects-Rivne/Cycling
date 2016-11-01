import React        from 'react';
import { LayersControl, Marker, Popup } from 'react-leaflet';


let placesMarkers = function(places){
  console.log('Places: ', places.length);
  if (places){
    let my_array = places.map(function(place, i){
        const position = [parseFloat(place.fields.lat), parseFloat(place.fields.lng)];
        // console.log(position);
        return(
          <Marker position={position} key={i}>
            <Popup>
              <span>Place (category: {place.fields.category_id}). <br/>
                  Name: {place.fields.name}.<br/>
                  Added: {place.fields.owner}.</span>
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

export default placesMarkers;