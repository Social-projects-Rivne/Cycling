import React      from 'react';
import { Map, TileLayer, Marker, Popup, LayersControl, FeatureGroup, Circle, ScaleControl } from 'react-leaflet';
import layers_list from './layers.jsx';

var pref = 'Satelite';

class MapComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
    };
  }

  onOverlayadd(e){
    console.log('overlay add')
  };

  onBaselayerchange(e){
    console.log(e.name);
    pref = e.name;
  };

  onOverlayremove(e){
    console.log(e.name)
  };

  onBoundsChange(e){
    console.log(this.getBounds());
    console.log(this.getCenter());
    console.log(this.getZoom());
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom} ref='map'
              style={{height: '90vh', width:'99vw'}}
              onOverlayadd={this.onOverlayadd}
              onBaselayerchange={this.onBaselayerchange}
              onOverlayremove={this.onOverlayremove}
              // onMoveend={this.onBoundsChange}
              onDragend={this.onBoundsChange}
              onZoomend={this.onBoundsChange}>
        <ScaleControl position='bottomright'></ScaleControl>
        <LayersControl position='topright'>
          {
            layers_list.map((layer)=>(
              <LayersControl.BaseLayer key={layer.name}
                                       name={layer.name}
                                       checked={layer.name === pref}>
                <TileLayer
                  attribution={layer.attribution}
                  url={layer.url}
                />
              </LayersControl.BaseLayer>
            ))
          }

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