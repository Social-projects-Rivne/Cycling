var layer_list = [
  {
    name: 'MapBox',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3ljbGluZyIsImEiOiJjaXU5cnVyMnkwMDE5Mm9wamtzYzkza21jIn0.khJEQSbAQ6FgecP4w1cFug'
  },
  {
    name: 'OSM Standard',
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
  },
  {
    name: 'Satelite',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    url: 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3ljbGluZyIsImEiOiJjaXU5cnVyMnkwMDE5Mm9wamtzYzkza21jIn0.khJEQSbAQ6FgecP4w1cFug'
  // },
  // {
  //   name: 'OSM Greyscale',
  //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  //   url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
  // },
  // {
  //   name: 'OSM Positron',
  //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  //   url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
  // },
  // {
  //   name: 'OSM Demo',
  //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  //   url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'
  // },
  // {
  //   name: 'OSM Humanitarian',
  //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  //   url: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
  // },
  // {
  //   name: 'OSM Hike&Bike',
  //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  //   url: 'http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png'
  // },
  // {
  //   name: 'OSM Black&White',
  //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  //   url: 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png'
  // },
  // {
  //   name: 'OSM Transport',
  //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  //   url: 'http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png'
  // },
  // {
  //   name: 'OSM Landscape',
  //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  //   url: 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png'
  }
]

export default layer_list;