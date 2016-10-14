import React      from 'react';
import { Map, TileLayer, Marker, Popup, LayersControl, FeatureGroup, Circle, ScaleControl } from 'react-leaflet';


class MapComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom} style={{height: '90vh', width:'99vw'}}>
        <ScaleControl position='bottomright'></ScaleControl>
        <LayersControl position='topright'>
          <LayersControl.BaseLayer name='MapBox'>
            <TileLayer
              attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
              url='https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3ljbGluZyIsImEiOiJjaXU5cnVyMnkwMDE5Mm9wamtzYzkza21jIn0.khJEQSbAQ6FgecP4w1cFug'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='OSM Standard'  checked={true}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='Satelite'>
            <TileLayer
              attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
              url='https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3ljbGluZyIsImEiOiJjaXU5cnVyMnkwMDE5Mm9wamtzYzkza21jIn0.khJEQSbAQ6FgecP4w1cFug'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='OSM Greyscale'>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='OSM Positron'>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='OSM Demo'>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='OSM Humanitarian'>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='OSM Hike&Bike'>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='OSM Black&White'>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='OSM Transport'>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='OSM Landscape'>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay name='Marker with popup'>
            <Marker position={[51.51, -0.06]}>
              <Popup>
                <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Feature group' checked={true} >
            <FeatureGroup color='purple'>
              <Popup>
                <span>Popup in FeatureGroup</span>
              </Popup>
              <Circle center={[51.51, -0.06]} radius={200} />
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default MapComponent;