import layers_list          from './layers.jsx';
/**
* This is default map settings
*/
const DEFAULT_CITY_LAT = 50.619776;
const DEFAULT_CITY_LONG = 26.251265;
const DEFAULT_ZOOM = 16;
const DEFAULT_LAYER_NAME = layers_list[0].name;
const DEFAULT_LAYER = layers_list[0];

/**
*  This class used to easily control map component settings.
*  Should be sended in map props.
*/
export class MapSettings {

  constructor() {
    this.active_layer = () => (localStorage['active_layer']? layers_list[localStorage['active_layer']] : DEFAULT_LAYER);
    this.stored_layer = () => (localStorage['map_layer'] || DEFAULT_LAYER_NAME);
    this.show_parkings = () => (localStorage['show_parkings'] !== 'false');
    this.show_places = () => (localStorage['show_places'] !== 'false');
    this.show_stolens = () => (localStorage['show_stolens'] === 'true');
    this.center_lat = () => (localStorage['center_lat'] ? parseFloat(localStorage['center_lat']) : DEFAULT_CITY_LAT);
    this.center_lng = () => (localStorage['center_lng'] ? parseFloat(localStorage['center_lng']) : DEFAULT_CITY_LONG);
    this.zoom = () => (localStorage['zoom'] ? parseInt(localStorage['zoom']) : DEFAULT_ZOOM);
  }

}
