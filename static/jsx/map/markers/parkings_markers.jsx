import React        from 'react';
import L            from 'leaflet';
import { LayersControl, Marker, Popup } from 'react-leaflet';

const src = require('../../../images/marker-icon-azure.png');
//Extend the Default marker class
let AzureIcon = L.Icon.Default.extend({
  options: {
        iconSize: [41, 41],
        iconAnchor: [20, 41],
        iconUrl: src
  }
});
let azureIcon = new AzureIcon();
// console.log(redIcon.iconUrl);
/*
//Other things we could have changed
  iconSize:     [25, 41], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [12, 41]  // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor

   <Marker position={position} key={i} icon={redIcon}>
*/

let parkingsMarkers = function(parkings){
  console.log('Parkings: ', parkings.length);
  if (parkings){
    let my_array = parkings.map(function(parkng, i){
        const position = [parseFloat(parkng.fields.lat), parseFloat(parkng.fields.lng)];
        // console.log(position);
        return(
          <Marker position={position} key={i} icon={azureIcon}>
            <Popup>
              <span>Parking (amount: {parkng.fields.amount}). <br/>
                  Name: {parkng.fields.name}.</span>
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