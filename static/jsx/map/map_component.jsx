import React                from 'react';
import L                    from 'leaflet';
import { Map, TileLayer, Marker, Popup, LayersControl, FeatureGroup, Circle, ScaleControl, ZoomControl } from 'react-leaflet';
import layers_list          from './layers.jsx';
import stolenMarkers        from './markers/stolen_bikes_markers.jsx';
import parkingsMarkers      from './markers/parkings_markers.jsx';
import placesMarkers        from './markers/places_markers.jsx';
import createPointerPopup, {MyPopup} from './popups/create_pointer.jsx';
import SilverMarker            from './markers/silver_marker.jsx';


class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parkings: [],
      places: [],
      stolens: [],
      silverMarkerLatLng: null
    };
    this.onBoundsChange = this.onBoundsChange.bind(this);
    this.loadPointers = this.loadPointers.bind(this);
    this.abortRequests = this.abortRequests.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);
    this.convertSilverMarkerToParking = this.convertSilverMarkerToParking.bind(this);
    this.convertSilverMarkerToPlace = this.convertSilverMarkerToPlace.bind(this);
    this.convertSilverMarkerToStolen = this.convertSilverMarkerToStolen.bind(this);
  }

  componentDidMount(){
    // console.log(this.refs.map.leafletElement.getBounds());
    let Bounds = this.refs.map.leafletElement.getBounds();
    this.loadPointers(Bounds);
  };

  // componentWillUnmount() {
  //   this.abortRequests();
  // };

  abortRequests(){
    if (this.serverRequest1)
      this.serverRequest1.abort();
    if (this.serverRequest2)
      this.serverRequest2.abort();
    if (this.serverRequest3)
      this.serverRequest3.abort();
  }

  loadPointers(bounds_obj){
    let ne = bounds_obj._northEast.lat.toPrecision(9) + ',' + bounds_obj._northEast.lng.toPrecision(9);
    let sw = bounds_obj._southWest.lat.toPrecision(9) + ',' + bounds_obj._southWest.lng.toPrecision(9);
    let pointData = {ne:ne, sw:sw};

    this.serverRequest1 = $.get(
    {
      url: '/api/parkings/search',
      data: pointData
    },
    function (data) {
      this.setState({parkings: data, silverMarkerLatLng: null});
      // console.log(this.state.parkings.length);
    }.bind(this));

    this.serverRequest2 = $.get(
    {
      url: '/api/places/search',
      data: pointData,
      success: function (data) {
        this.setState({places: data, silverMarkerLatLng: null});
      }.bind(this),
      error: function(response) {
        console.log("get places error:\n", response);
      }
    });

    this.serverRequest3 = $.get(
    {
      url: '/api/stolen/search',
      data: pointData
    },
    function (data) {
        this.setState({stolens: data, silverMarkerLatLng: null});
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
    this.setState({silverMarkerLatLng: e.latlng});
    this.props.newPointer(e.latlng);
    // this.props.father.refs.modal.showMe('e.latlng');
  };

  onRightClick(e){
    // console.log(e.latlng);
    // this.openPopup("Right click", e.latlng, {minWidth:300, className:"test"});
  };

  convertSilverMarkerToPlace(state){
    let places =  this.state.places;
    places.push({
        fields: {
          lat: this.state.silverMarkerLatLng.lat,
          lng: this.state.silverMarkerLatLng.lng,
          name: state.nameValue,
          category_id: state.categoryValue,
          owner: "",
          from_hour: "",
          to_hour: "",
          description: state.descriptionValue
        },
        pk: "",
        model: "APP.place"
      });
    this.setState({
      places: places,
      silverMarkerLatLng: null
    });
  };

  convertSilverMarkerToParking(){
    let parkings =  this.state.parkings;
    parkings.push({
        fields: {
          lat: this.state.silverMarkerLatLng.lat,
          lng: this.state.silverMarkerLatLng.lng,
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
      silverMarkerLatLng: null
    });
  };

  convertSilverMarkerToStolen(){
    let stolens =  this.state.stolens;
    stolens.push({
        fields: {
          lat: this.state.silverMarkerLatLng.lat,
          lng: this.state.silverMarkerLatLng.lng,
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
      silverMarkerLatLng: null
    });
  };

    getParkingMarkersView(){

        if (this.props.map_settings.show_parkings()){
            return (
                <FeatureGroup color='green'>
                  {parkingsMarkers(this.state.parkings)}
                </FeatureGroup>
            );
        }
        else{
            return null;
        }

    }

    getPlaceMarkersView(){

        if (this.props.map_settings.show_places()){
            return (
                <FeatureGroup color='blue'>
                  {placesMarkers(this.state.places, this.props.map_settings.categories)}
                </FeatureGroup>
            );
        }
        else{
            return null;
        }

    }

    getStolenMarkersView(){

        if (this.props.map_settings.show_stolens()){
            return (
                <FeatureGroup color='purple'>
                  {stolenMarkers(this.state.stolens)}
                </FeatureGroup>

            );
        }
        else{
            return null;
        }

    }


  render() {
    const position = [this.props.map_settings.center_lat(), this.props.map_settings.center_lng()];
    const active_layer = this.props.map_settings.active_layer();

    return (
        <Map center={position} zoom={this.props.map_settings.zoom()}
                zoomControl={false}
                ref='map'
                style={{height: 'calc(100vh - 51px)', width:'100vw'}}
                onOverlayadd={this.onOverlayadd}
                onBaselayerchange={this.onBaselayerchange}
                onOverlayremove={this.onOverlayremove}
                onMoveend={this.onBoundsChange}
                // onDragend={this.onBoundsChange}
                onZoomend={this.onBoundsChange}
                onClick={this.onMouseClick}
                // onContextmenu={this.onRightClick}
                >
            <TileLayer
                attribution={active_layer.attribution}
                url={active_layer.url}
            />
            <ScaleControl position='bottomright'></ScaleControl>
            <ZoomControl position='bottomleft'></ZoomControl>

            {this.getParkingMarkersView()}

            {this.getPlaceMarkersView()}

            {this.getStolenMarkersView()}


            {this.state.silverMarkerLatLng ? <SilverMarker position={this.state.silverMarkerLatLng} /> : null}
      </Map>
    );
  }
}

export default MapComponent;
