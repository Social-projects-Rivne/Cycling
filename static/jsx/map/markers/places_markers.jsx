import React        from 'react';
import { LayersControl, Marker, Popup } from 'react-leaflet';
import { Link, browserHistory } from 'react-router';

function handleClick(link){
  browserHistory.push(link);
}

let placesMarkers = function(places){
  console.log('Places: ', places.length);
  if (places){
    let my_array = places.map(function(place, i){
        const position = [parseFloat(place.fields.lat), parseFloat(place.fields.lng)];
        let id = place.pk;
        return(
          <Marker position={position} key={i}>
            <Popup>
              <div className="inner-marker-div"><span>Place: {place.fields.name}</span>
              <div onClick={handleClick.bind(this, "marker_details/" + id + "?type=Place")}>Show details...</div>
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