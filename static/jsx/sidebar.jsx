import React from 'react';
import { browserHistory, Link } from 'react-router';
import layers_list from './map/layers.jsx';
import ReactDOM from 'react-dom';
import CategoryItem from "./sidebar_items/category_item.jsx";
import LayerItem from "./sidebar_items/layer_item.jsx";
import DisplayItem from "./sidebar_items/display_item.jsx";


const PLACES_MARKER_NAME = "Places";
const PARKINGS_MARKER_NAME = "Parkings";
const STOLEN_BICYCLES_MARKER_NAME = "Stolen bicycles";

export class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        // this.getProfileUrl = this.getProfileUrl.bind(this);
        // this.handleCategoryItemClick = this.handleCategoryItemClick.bind(this);
    }

    /*
    * This method fetch all categories from server and update state
    */
    getCategories() {
      let context = this;
      $.ajax({
              type: 'GET',
              url: '/api/categories',
              contentType: 'application/json',
              dataType: "json",
              success: function success(response) {
                  if ("response" in response) {
                    for(let i = 0; i < response.response.length; i+=1){
                      response.response[i].active = true;
                    }
                    context.props.app.setActiveCategories(response.response);
                  }
              },
              error: function error(response) {
                console.log("getCategories() response: ");
                console.log(response);
              }

          });
    }

    componentDidMount() {
      this.getCategories();
    }

    handleCategoryItemClick(id) {
      // creating new active categories object
      let newCategories = [];
      for (let i = 0; i < this.props.map_settings.categories.length; i+=1) {
        newCategories[i] = {};
        if (this.props.map_settings.categories[i].id === id){
          newCategories[i].active = !this.props.map_settings.categories[i].active;
        }
        else{
          newCategories[i].active = this.props.map_settings.categories[i].active;
        }
        newCategories[i].name = this.props.map_settings.categories[i].name;
        newCategories[i].id = this.props.map_settings.categories[i].id;
      }

      // send to father new active categories which cause rerender of sidebar and map
      this.props.app.setActiveCategories(newCategories);
    }

    handleLayerItemClick(id) {
        localStorage['active_layer'] = id;
        this.props.app.refreshMap();
    }

    handleMarkerItemClick(name) {
        if (localStorage[name] === "true"){
            localStorage[name] = false;
        }
        else{
            localStorage[name] = true;
        }
        this.props.app.refreshMap();
    }

    getCategoriesView() {
        let context = this;
        let categories_list;

        let is_active = this.props.map_settings.show_places();
        if (this.props.map_settings.categories) {
            categories_list = this.props.map_settings.categories.map((category, index) =>
                (<CategoryItem categoryName={category.name} isActive={category.active && is_active} disabled={this.props.map_settings.show_places()}
                                  onClick={is_active? context.handleCategoryItemClick.bind(context, category.id) : null} key={index}/>)
            );
        }
        return categories_list;
    }

    getProfileUrlString() {
        /* Function for 'to' attribute of profile Link button in the sidebar.
         * Returns user's profile URL if he's logged in,
         * otherwise redirects him to the /login page
         */
        if (localStorage['token']) {
            return ["/user/", localStorage['id']].join("")
        } else {
            return '/login'
        }
    }


    signOut(event) {
        // Clears local storage forcing current user to log out and then
        // redirects to the /login page.
        event.preventDefault();
        localStorage["token"] = null;
        browserHistory.push('/login');
    }

    renderSignOutBtn() {
        // Renders Sign out button in the left navbar
        if (localStorage['token']) {
            return (
                <li><Link onClick={this.signOut}>Sign out</Link></li>
            )

        }
    }

    getLayersView() {
        let context = this;
        let layers_list_view;

        layers_list_view = layers_list.map((layer, index) =>
          (<LayerItem layerName={layer.name} isActive={layer.name === context.props.map_settings.active_layer().name}
                            onClick={context.handleLayerItemClick.bind(context, index)} key={index}/>)
        );

        return layers_list_view;
    }

    // This method return Parkings, Places and Stolen Bikes Markers Controllers
    // This include place categories controller
    getDisplayView() {
        let context = this;
        let show_places = this.props.map_settings.show_places();

        let additionalClassesPlaces = ["categories-expand"];
        let placesUlClasses = ["categories-ul collapse"];

        if (show_places){
            placesUlClasses.push("in");
        }
        else {
            additionalClassesPlaces.push("collapsed");
        }

        return (
            <ul className="collapse display-ul" id="markers-list">
                <DisplayItem markerName={PARKINGS_MARKER_NAME} isActive={this.props.map_settings.show_parkings()}
                    onClick={context.handleMarkerItemClick.bind(context, "show_parkings")}/>
                <DisplayItem markerName={STOLEN_BICYCLES_MARKER_NAME} isActive={this.props.map_settings.show_stolens()}
                    onClick={context.handleMarkerItemClick.bind(context, "show_stolens")}/>
                <DisplayItem markerName={PLACES_MARKER_NAME} isActive={show_places}
                    onClick={context.handleMarkerItemClick.bind(context, "show_places")}>

                    <ul className="categories-ul">
                      {this.getCategoriesView()}
                    </ul>

                </DisplayItem>
            </ul>

        );
    }

    render() {

        return (
        <div id="sidebar-wrapper" role="navigation">
            <ul className="sidebar-nav">
                <li><Link onlyActiveOnIndex activeStyle={{color: "#53acff"}} to="/">Home</Link></li>
                <li>
                  <div className="layers-expand" id="layers-obj" data-toggle="collapse" data-target="#layers-list">
                    <span className="li-name">Layers</span>
                    <span className="toggle-arrow material-icons">keyboard_arrow_up</span>
                  </div>
                    <ul className="collapse in layers-ul" id="layers-list">
                      {this.getLayersView()}
                    </ul>
                </li>
                <li>
                    <div className="collapsed display-expand" id="display-obj" data-toggle="collapse" data-target="#markers-list">
                        <span className="li-name">Display</span>
                        <span className="toggle-arrow material-icons">keyboard_arrow_up</span>
                    </div>
                    {this.getDisplayView()}
                </li>
                <li><Link onlyActiveOnIndex activeStyle={{color: "#53acff"}} to="/stolen">Stolen Bicycles</Link></li>
                <li><a href="#">Races Table</a></li>
                <li><Link onlyActiveOnIndex activeStyle={{color: "#53acff"}} to={this.getProfileUrlString()}>Profile</Link></li>
                {this.renderSignOutBtn()}
            </ul>
        </div>
      );
    }
}
