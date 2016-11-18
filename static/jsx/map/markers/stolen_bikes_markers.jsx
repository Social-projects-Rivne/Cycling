import React        from 'react';
import L            from 'leaflet';
import { LayersControl, Marker, Popup } from 'react-leaflet';
import { Link, browserHistory} from 'react-router';

function handleClick(link){
  browserHistory.push(link);
}

const src = require('../../../images/marker-icon-red.png');
//Extend the Default marker class
let RedIcon = L.Icon.Default.extend({
  options: {
        iconSize: [25, 41],
        iconUrl: src
  }
});
let redIcon = new RedIcon();

let stolenMarkers = function(bikes){
  // console.log('Stolen bikes: ', bikes.length);
  if (bikes){
    let my_array = bikes.map(function(bike, i){
        if(bike.fields.is_found ){
          return(null);
        };
        const position = [parseFloat(bike.fields.lat), parseFloat(bike.fields.lng)];
        let id = bike.pk;
        return(
          <Marker position={position} key={i} icon={redIcon}>
            <Popup>
              <div id="inner-marker-div"><span>Stolen bicycle</span>
              <p>Stolen at {bike.fields.day}</p>
              <div className="marker-link" onClick={handleClick.bind(this, "marker_details/" + id + "?type=StolenBike")}>Show details...</div>
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