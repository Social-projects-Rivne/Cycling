import React        from 'react';
import L            from 'leaflet';
import { LayersControl, Marker, Popup } from 'react-leaflet';
import { Link, browserHistory } from 'react-router';

function handleClick(link){
  browserHistory.push(link);
}

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
        let id = place.pk;
        return(
          <Marker position={position} key={i} icon={greenIcon}>
            <Popup>
              <div className="inner-marker-div"><span>Place: {place.fields.name}</span>
              <div className="marker-link" onClick={handleClick.bind(this, "marker_details/" + id + "?type=Place")}>Show details...</div>
              </div>
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