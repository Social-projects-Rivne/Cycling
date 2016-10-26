import React                from 'react';
import { Map, TileLayer, Marker, Popup, LayersControl, FeatureGroup, Circle, ScaleControl, ZoomControl } from 'react-leaflet';
import layers_list          from './layers.jsx';
import stolenMarkers        from './markers/stolen_bikes_markers.jsx'
import parkingsMarkers      from './markers/parkings_markers.jsx'
import placesMarkers        from './markers/places_markers.jsx'
import createPointerPopup, {MyPopup} from './popups/create_pointer.jsx'

var pref = 'Satelite';
var show_parkings = false;
var show_places = true;
var show_stolens = true;

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 50.619776, //51.505,
      lng: 26.251265, //-0.09,
      zoom: 16,
      parkings: [],
      places: [],
      stolens: []
    };
    this.onBoundsChange = this.onBoundsChange.bind(this);
    this.loadPointers = this.loadPointers.bind(this);
    this.abortRequests = this.abortRequests.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);
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
      url: '/parkings/search',
      data: {ne:ne, sw:sw}
    },
    function (data) {
      this.setState({parkings: data});
      // console.log(this.state.parkings.length);
    }.bind(this));
      
    this.serverRequest2 = $.get(
    {
      url: '/places/search',
      data: {ne:ne, sw:sw}
    },
    function (data) {
      this.setState({places: data});
    }.bind(this));
  
    this.serverRequest3 = $.get(
    {
      url: '/stolen/search',
      data: {ne:ne, sw:sw}
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

  onMouseClick(e){
    // console.log(e.latlng);
    // this.openPopup(createPointerPopup(), e.latlng);
    // this.openPopup(MyPopup.setLatLng(e.latlng));
    // $('#myModal').modal();
    // console.log(localStorage['token']);
    this.props.newPointer(e.latlng);
    // this.props.father.refs.modal.showMe('e.latlng');
  };

  onRightClick(e){
    console.log(e.latlng);
    this.openPopup("Right click", e.latlng, {minWidth:300, className:"test"});
  };

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
              onZoomend={this.onBoundsChange}
              onClick={this.onMouseClick}
              // onContextmenu={this.onRightClick}
              >
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
              {placesMarkers(this.state.places)}
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