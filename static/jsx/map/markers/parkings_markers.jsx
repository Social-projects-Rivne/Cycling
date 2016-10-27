import React        from 'react';
import { LayersControl, Marker, Popup } from 'react-leaflet';
import { Link, browserHistory } from 'react-router'


let parkingsMarkers = function(parkings){
  console.log('Parkings: ', parkings.length);
  if (parkings){
    let my_array = parkings.map(function(parkng, i){
        const position = [parseFloat(parkng.fields.lat), parseFloat(parkng.fields.lng)];
        // console.log(position);
        return(
          <Marker position={position} key={i}>
            <Popup>
              <div className="inner-marker-div"><span>Parking: {parkng.fields.name}</span>
              <p>Parking (amount: {parkng.fields.amount})</p>
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

export default parkingsMarkers;