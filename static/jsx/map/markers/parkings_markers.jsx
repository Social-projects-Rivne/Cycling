import React        from 'react';
import { LayersControl, Marker, Popup } from 'react-leaflet';
import { Link, browserHistory } from 'react-router'


function handleClick(link){
  browserHistory.push(link);
}

let parkingsMarkers = function(parkings){
  console.log('Parkings: ', parkings.length);
  if (parkings){
    let my_array = parkings.map(function(parkng, i){
        const position = [parseFloat(parkng.fields.lat), parseFloat(parkng.fields.lng)];
        let id = parkng.pk;
        return(
          <Marker position={position} key={i}>
            <Popup>
              <div className="inner-marker-div"><span>Parking: {parkng.fields.name}</span>
              <p>Parking (amount: {parkng.fields.amount})</p>
              <div className="marker-link" onClick={handleClick.bind(this, "marker_details/" + id + "?type=Parking")}>Show details...</div>
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

export default parkingsMarkers;