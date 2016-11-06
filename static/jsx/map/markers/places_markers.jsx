import React        from 'react';
import { LayersControl, Marker, Popup } from 'react-leaflet';


let placesMarkers = function(places, categories){
  console.log('Places: ', places.length);

  // making list of categories id for faster check
  if (categories){
    var activeCategories = [];
    for(let i = 0; i < categories.length; i+=1) {
      if (categories[i].active)
        activeCategories.push(categories[i].id);
    }
  }

  if (places){
    let my_array = places.map(function(place, i){
        // if categories not empty, then we should filter markers
        if (categories)
          if (activeCategories.indexOf(place.fields.category_id) == -1)
            return null;
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

    });

    return my_array;
  }else{
    return (
      null
    )
  }
}

export default placesMarkers;
