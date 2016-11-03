import React        from 'react';
import L            from 'leaflet';
import { LayersControl, Marker, Popup } from 'react-leaflet';


const src = require('../../../images/marker-icon-green.png');
//Extend the Default marker class
let GreenIcon = L.Icon.Default.extend({
  options: {
        iconSize: [25, 41],
        iconUrl: src
  }
});
let greenIcon = new GreenIcon();

let placesMarkers = function(places){
  console.log('Places: ', places.length);
  if (places){
    let my_array = places.map(function(place, i){
        const position = [parseFloat(place.fields.lat), parseFloat(place.fields.lng)];
        // console.log(position);
        return(
          <Marker position={position} key={i} icon={greenIcon}>
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