import React        from 'react';
import { LayersControl, Marker, Popup } from 'react-leaflet';
import { Link, browserHistory} from 'react-router';


let stolenMarkers = function(bikes){
  console.log('Stolen bikes: ', bikes.length);
  if (bikes){
    let my_array = bikes.map(function(bike, i){
        const position = [parseFloat(bike.fields.lat), parseFloat(bike.fields.lng)];
        // console.log(position);
        return(
          <Marker position={position} key={i}>
            <Popup>
              <div className="inner-marker-div"><span>Stolen bicycle</span>
              <p>Stolen at {bike.fields.day}</p>
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

export default stolenMarkers;