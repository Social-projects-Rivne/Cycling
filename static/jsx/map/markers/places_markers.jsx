import React        from 'react';
import { LayersControl, Marker, Popup } from 'react-leaflet';
import { Link, browserHistory } from 'react-router';

let placesMarkers = function(places){
  console.log('Places: ', places.length);
  if (places){
    let my_array = places.map(function(place, i){
        const position = [parseFloat(place.fields.lat), parseFloat(place.fields.lng)];
        // console.log(position);
        return(
          <Marker position={position} key={i}>
            <Popup>
              <div className="inner-marker-div"><span>Place: {place.fields.name}</span>
              <div onClick={browserHistory.push('/marker_details')}>Show details...</div>
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