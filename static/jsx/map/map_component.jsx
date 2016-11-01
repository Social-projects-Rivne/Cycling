import React                from 'react';
import L                    from 'leaflet';
import { Map, TileLayer, Marker, Popup, LayersControl, FeatureGroup, Circle, ScaleControl, ZoomControl } from 'react-leaflet';
import layers_list          from './layers.jsx';
import stolenMarkers        from './markers/stolen_bikes_markers.jsx';
import parkingsMarkers      from './markers/parkings_markers.jsx';
import placesMarkers        from './markers/places_markers.jsx';
import createPointerPopup, {MyPopup} from './popups/create_pointer.jsx';
import RedMarker            from './markers/red_marker.jsx';

let stored_layer = () => (localStorage['map_layer'] || 'MapBox');
let show_parkings = () => (localStorage['show_parkings'] === 'true');
let show_places = () => (localStorage['show_places'] === 'true');
let show_stolens = () => (localStorage['show_stolens'] === 'true');
let center_lat = () => (localStorage['center_lat'] ? parseFloat(localStorage['center_lat']) : 50.619776);
let center_lng = () => (localStorage['center_lng'] ? parseFloat(localStorage['center_lng']) : 26.251265);
let zoom = () => (localStorage['zoom'] ? parseInt(localStorage['zoom']) : 16);

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parkings: [],
      places: [],
      stolens: [],
      redMarkerLatLng: null
    };
    this.onBoundsChange = this.onBoundsChange.bind(this);
    this.loadPointers = this.loadPointers.bind(this);
    this.abortRequests = this.abortRequests.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);
    this.convertRedMarkerToParking = this.convertRedMarkerToParking.bind(this);
    this.convertRedMarkerToPlace = this.convertRedMarkerToPlace.bind(this);
    this.convertRedMarkerToStolen = this.convertRedMarkerToStolen.bind(this);
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
      url: '/api/parkings/search',
      data: {ne:ne, sw:sw}
    },
    function (data) {
      this.setState({parkings: data, redMarkerLatLng: null});
      // console.log(this.state.parkings.length);
    }.bind(this));
      
    this.serverRequest2 = $.get(
    {
      url: '/api/places/search',
      data: {ne:ne, sw:sw}
    },
    function (data) {
      this.setState({places: data, redMarkerLatLng: null});
    }.bind(this));
  
    this.serverRequest3 = $.get(
    {
      url: '/api/stolen/search',
      data: {ne:ne, sw:sw}
    },
    function (data) {
        this.setState({stolens: data, redMarkerLatLng: null});
    }.bind(this));
  };

  onOverlayadd(e){
     switch (e.name) {
      case 'Parkings':
        localStorage['show_parkings'] = true;
        break;
      case 'Places':
        localStorage['show_places'] = true;
        break;
      case 'Stolen bicycles':
        localStorage['show_stolens'] = true;
        break;
    };
  };

  onBaselayerchange(e){
    // console.log(e.name);
    localStorage['map_layer'] = e.name;
  };

  onOverlayremove(e){
    switch (e.name) {
      case 'Parkings':
        localStorage['show_parkings'] = false;
        break;
      case 'Places':
        localStorage['show_places'] = false;
        break;
      case 'Stolen bicycles':
        localStorage['show_stolens'] = false;
        break;
    };
  };

  onBoundsChange(e){
    this.abortRequests();
    let Bounds = e.target.getBounds();
    this.loadPointers(Bounds);
    // console.log(this.getCenter());
    // console.log(this.getZoom());
    localStorage['zoom'] = e.target.getZoom();
    localStorage['center_lat'] = e.target.getCenter().lat;
    localStorage['center_lng'] = e.target.getCenter().lng;
  };

  // onMoveend(e){
  //   console.log(this.getCenter());
  //   // console.log(this.getZoom());
  // };

  onMouseClick(e){
    // this.openPopup(createPointerPopup(), e.latlng);
    // this.openPopup(MyPopup.setLatLng(e.latlng));
    // console.log(localStorage['token']);
    if(!localStorage['token']){return};
    this.setState({redMarkerLatLng: e.latlng});
    this.props.newPointer(e.latlng);
    // this.props.father.refs.modal.showMe('e.latlng');
  };

  onRightClick(e){
    // console.log(e.latlng);
    // this.openPopup("Right click", e.latlng, {minWidth:300, className:"test"});
  };

  convertRedMarkerToPlace(){
    let places =  this.state.places;
    places.push({
        fields: {
          lat: this.state.redMarkerLatLng.lat,
          lng: this.state.redMarkerLatLng.lng,
          name: "",
          category_id: "",
          owner: "",
          from_hour: "",
          to_hour: "",
          description: ""
        },
        pk: "",
        model: "APP.place"
      });
    this.setState({
      places: places,
      redMarkerLatLng: null
    });
  };

  convertRedMarkerToParking(){
    let parkings =  this.state.parkings;
    parkings.push({
        fields: {
          lat: this.state.redMarkerLatLng.lat,
          lng: this.state.redMarkerLatLng.lng,
          name: "",
          security: "",
          owner: "",
          amount: "",
          is_free: ""
        },
        pk: "",
        model: "APP.parking"
      });
    this.setState({
      parkings: parkings,
      redMarkerLatLng: null
    });
  };

  convertRedMarkerToStolen(){
    let stolens =  this.state.stolens;
    stolens.push({
        fields: {
          lat: this.state.redMarkerLatLng.lat,
          lng: this.state.redMarkerLatLng.lng,
          bike: "",
          day: "",
          is_found: "",
          description: ""
        },
        pk: "",
        model: "APP.stolenbike"
      });
    this.setState({
      stolens: stolens,
      redMarkerLatLng: null
    });
  };

  render() {
    const position = [center_lat(), center_lng()];
    return (
      <Map center={position} zoom={zoom()}
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
                                       checked={layer.name === stored_layer()}>
                <TileLayer
                  attribution={layer.attribution}
                  url={layer.url}
                />
              </LayersControl.BaseLayer>
            ))
          }

          <LayersControl.Overlay name='Parkings' checked={show_parkings()} >
            <FeatureGroup color='green'>
              {parkingsMarkers(this.state.parkings)}
            </FeatureGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name='Places' checked={show_places()} >
            <FeatureGroup color='blue'>
              {placesMarkers(this.state.places)}
            </FeatureGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name='Stolen bicycles' checked={show_stolens()} >
            <FeatureGroup color='purple'>
              {stolenMarkers(this.state.stolens)}
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>

        {this.state.redMarkerLatLng ? <RedMarker position={this.state.redMarkerLatLng} /> : null}
        
      </Map>
    );
  }
}

export default MapComponent;
