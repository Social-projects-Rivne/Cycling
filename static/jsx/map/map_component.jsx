import React        from 'react';
import { Map, TileLayer, Marker, Popup, LayersControl, FeatureGroup, Circle, ScaleControl, ZoomControl } from 'react-leaflet';
import layers_list  from './layers.jsx';
import stolenMarkers from './markers/stolen_bikes_markers.jsx'
import parkingsMarkers from './markers/parkings_markers.jsx'
import placesMarkers from './markers/places_markers.jsx'

var pref = 'MapBox';
var show_parkings = false;
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
    this.abortRequests = this.abortRequests.bind(this);
  }

  componentDidMount(){
    // console.log(this.refs.map.leafletElement.getBounds());
    let Bounds = this.refs.map.leafletElement.getBounds();
    this.loadPointers(Bounds);
  };

  componentWillUnmount() {
    this.abortRequests();
  };

  abortRequests(){
    this.serverRequest1.abort();
    this.serverRequest2.abort();
    this.serverRequest3.abort();
  }

  loadPointers(bounds_obj){
    let ne = bounds_obj._northEast.lat.toPrecision(9) + ',' + bounds_obj._northEast.lng.toPrecision(9);
    let sw = bounds_obj._southWest.lat.toPrecision(9) + ',' + bounds_obj._southWest.lng.toPrecision(9);
    let params = {ne:ne, sw:sw};

    this.serverRequest1 = $.get(
    {
      url: 'api/v1/parkings/search',
      data: {ne:ne, sw:sw}
    },
    function (data) {
      this.setState({parkings: data});
      // console.log(this.state.parkings.length);
    }.bind(this));

    // forming data object for places
    let placeParamsObject = {ne:ne, sw:sw};
    if (this.props.categories) {
      placeParamsObject.categories =  this.getActiveCategoriesString();
    }
    // console.log("Formed active categories request: ", placeParamsObject);

    this.serverRequest2 = $.get(
    {
      url: 'api/v1/places/search',
      data: placeParamsObject,
      success: function (data) {
        this.setState({places: data});
      }.bind(this),
      error: function(response) {
        console.log("get places error:\n", response);
      }

    });

    this.serverRequest3 = $.get(
    {
      url: 'api/v1/stolen/search',
      data: JSON.stringify({ne:ne, sw:sw})
    },
    function (data) {
        this.setState({stolens: data});
    }.bind(this));
  };

  onOverlayadd(e){
     switch (e.name) {
      case 'Parkings':
        show_parkings = true;
        break;
      case 'Places':
        show_places = true;
        break;
      case 'Stolen bicycles':
        show_stolens = true;
        break;
    };
  };

  onBaselayerchange(e){
    console.log(e.name);
    pref = e.name;
  };

  onOverlayremove(e){
    switch (e.name) {
      case 'Parkings':
        show_parkings = false;
        break;
      case 'Places':
        show_places = false;
        break;
      case 'Stolen bicycles':
        show_stolens = false;
        break;
    };
  };

  /*
  * This method form string to tell server which categories are active
  * Output example: "[1, 2]"
  */
  getActiveCategoriesString(){
    let activeCategories = [];
    for(let i = 0; i < this.props.categories.length; i+=1) {
      if (this.props.categories[i].active)
        activeCategories.push(this.props.categories[i].id);
    }
    return "[" + activeCategories.join() + "]";
  }

  onBoundsChange(e){
    this.abortRequests();
    let Bounds = e.target.getBounds();
    this.loadPointers(Bounds);
    // console.log(this.getCenter());
    // console.log(this.getZoom());
  };

  // onMoveend(e){
  //   console.log(this.getCenter());
  //   // console.log(this.getZoom());
  // };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}
              zoomControl={false}
              ref='map'
              style={{height: '100vh', width:'100vw'}}
              onOverlayadd={this.onOverlayadd}
              onBaselayerchange={this.onBaselayerchange}
              onOverlayremove={this.onOverlayremove}
              onMoveend={this.onBoundsChange}
              // onDragend={this.onBoundsChange}
              onZoomend={this.onBoundsChange}>
        <ScaleControl position='bottomright'></ScaleControl>
        <ZoomControl position='bottomleft'></ZoomControl>
        <LayersControl position='topleft'>
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

          <LayersControl.Overlay name='Parkings' checked={show_parkings} >
            <FeatureGroup color='green'>
              {parkingsMarkers(this.state.parkings)}
            </FeatureGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name='Places' checked={show_places} >
            <FeatureGroup color='blue'>
              {placesMarkers(this.state.places, this.props.categories)}
            </FeatureGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name='Stolen bicycles' checked={show_stolens} >
            <FeatureGroup color='purple'>
              {stolenMarkers(this.state.stolens)}
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>

      </Map>
    );
  }
}

export default MapComponent;
