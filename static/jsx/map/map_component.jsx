import React        from 'react';
import { Map, TileLayer, Marker, Popup, LayersControl, FeatureGroup, Circle, ScaleControl } from 'react-leaflet';
import layers_list  from './layers.jsx';
import stolenMarker from './stolen_marker.jsx'

var pref = 'Satelite';
var show_parkings = true;
var show_places = true;
var show_stolens = true;

class MapComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 50.619776, //51.505,
      lng: 26.251265, //-0.09,
      zoom: 14,
      parkings: [],
      places: [],
      stolens: []
    };
    this.onBoundsChange = this.onBoundsChange.bind(this);
    this.loadPointers = this.loadPointers.bind(this);
    // this.myAJAX = this.myAJAX.bind(this);
  }

  componentDidMount(){
    // console.log(this.refs.map.leafletElement.getBounds());
    let Bounds = this.refs.map.leafletElement.getBounds();
    this.loadPointers(Bounds);
  };

  componentWillUnmount() {
    this.serverRequest.abort();
  };

  // myAJAX(obj_type, ne, sw){
  //   this.serverRequest = $.get(
  //     {
  //       url: '/v1/' + obj_type + '/search',
  //       data: {ne:ne, sw:sw}
  //     },
  //     function (data) {
  //       console.log(data);
  //     }.bind(this));
  // };

  // myAJAX(obj_type, ne, sw, compnnt){
  //   $.ajax({
  //     type: 'GET',
  //     url: '/v1/' + obj_type + '/search',
  //     data: {ne:ne, sw:sw},
  //     success: function(data){
  //         let my_madness = {
  //           'parkings': this.states.parkings,
  //           'places': this.states.places,
  //           'stolen': this.states.stolen
  //         };
  //       compnnt.setState({my_madness[obj_type]: data});
  //       console.log(compnnt.state);
  //       } 
  //   })
  //   .fail(function(jqXHR) {
  //     console.log('Failed to fetch ' + obj_type);
  //   });
  // }

  loadPointers(bounds_obj){
    let ne = bounds_obj._northEast.lat.toPrecision(9) + ',' + bounds_obj._northEast.lng.toPrecision(9);
    let sw = bounds_obj._southWest.lat.toPrecision(9) + ',' + bounds_obj._southWest.lng.toPrecision(9);
    let params = {ne:ne, sw:sw};
    if (show_parkings) {
      this.serverRequest = $.get(
      {
        url: '/v1/parkings/search',
        data: {ne:ne, sw:sw}
      },
      function (data) {
        this.setState({parkings: data});
      }.bind(this));
    };
    
    if (show_places) {
      this.serverRequest = $.get(
      {
        url: '/v1/places/search',
        data: {ne:ne, sw:sw}
      },
      function (data) {
        this.setState({places: data});
      }.bind(this));
    };
    
    if (show_stolens) {
      this.serverRequest = $.get(
      {
        url: '/v1/stolen/search',
        data: {ne:ne, sw:sw}
      },
      function (data) {
          this.setState({stolens: data});
      }.bind(this));
    };
  };

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
    let Bounds = e.target.getBounds();
    this.loadPointers(Bounds);
    // console.log(this.getCenter());
    // console.log(this.getZoom());
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom} ref='map'
              style={{height: '100vh', width:'100vw'}}
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
            <Marker position={[50.625, 26.26]}>
              <Popup>
                <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Stolen bikes'>
            {
              stolenMarker(this.state.stolens)
            }
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Feature group' checked={true} >
            <FeatureGroup color='purple'>
              <Popup>
                <span>Popup in FeatureGroup</span>
              </Popup>
              <Circle center={[50.625, 26.26]} radius={200} />
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </Map>
    );
  }
}

export default MapComponent;