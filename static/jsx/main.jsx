import React              from 'react';
import { Router,
  Route,
  Link,
  hashHistory,
  browserHistory,
  IndexRoute }            from 'react-router';
import ReactDOM           from 'react-dom';
import { RegistrationComponent }  from './registration.jsx';
import { LoginComponent } from './login.jsx';
import Home               from './home.jsx';
import { MarkerDetails } from './marker_detail_page.jsx';
import { Profile }        from './profile.jsx';
import { MapSettings } from './map/map_settings.jsx';
import layers_list          from './map/layers.jsx';


const PLACES_MARKER_NAME = "Places";
const PARKINGS_MARKER_NAME = "Parkings";
const STOLEN_BICYCLES_MARKER_NAME = "Stolen bicycles";


class APP extends React.Component{
    /*
     * Main component that include header,
     *  sidebar and provive rouning on page
     */
    constructor(props) {
        super(props);
        this.state = {
          showHideSidenav: false,
          map_settings: new MapSettings()
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      /*
       * Change main div class in case of clicking on button,
       * to provide posibility of hidding and opening sidevar
       */
      this.setState({showHideSidenav:!this.state.showHideSidenav ? "toggled" : ""});
    }

    setDisplay(display) {
          this.state.map_settings.display = display;
          this.setState({map_settings: this.state.map_settings});
    }

    refreshMap() {
        this.setState({map_settings: this.state.map_settings})
    }

    setActiveCategories(categories) {
      this.state.map_settings.categories = categories;
      this.setState({map_settings: this.state.map_settings});
    }

    getChildProps() {
      if (this.props.children.type === Home) {
        return { map_settings: this.state.map_settings };
      }
    }

    render(){
      //Render main component
      return (
        <div className={this.state.showHideSidenav} id="wrapper">
              <Header onButtonClick={this.handleClick}/>
              <SideBar app={this} map_settings={this.state.map_settings}/>

              <div className="page-content-wrapper">
                {React.cloneElement(this.props.children, this.getChildProps())}
              </div>
        </div>
        );
    }
}


class Header extends React.Component {

    constructor(props){
      super(props);

      this.state = {};
    }

    headerRightContent() {
      // we need to check if user is logged in
      // if yes we should instead of login and registration buttons return
      // avatar image
      var headerRightContent;

      if (localStorage['token']) {

        // if he is logged in but there is no profile data
        // we should place loading spinner
        if (this.state.avatar){
          return (
            <img src={this.state.avatar} id="avatar" className="header-right avatar-header"/>
          );
        }
        else{

          $.get(
          {
            url: '/api/avatar',
            data: {token: localStorage['token']}
          },
          function (data) {
            if ("error" in data){
              localStorage.removeItem('token');
              this.setState({avatar: null});
              browserHistory.push("/login");
            }
            else{
              this.setState({avatar: data.result.avatar});
            }
          }.bind(this));

          return (
            <div className="spinner header-right">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          );

        }
      }
      else {
        return (
          <div className="header-right">
            <Link className="header-button" id="header-button-a" to='/login'>Login</Link>
            <Link className="header-button" id="header-button-a" to='/registration'>Registration</Link>
          </div>
        );
      }
    }

    render() {

      return(
          <div className="navbar navbar-fixed-top main-header" role="navigation">
            <div className="navbar-header">
                <a onClick={this.props.onButtonClick} id="menu-toggle" className="logo-a"><span className="icon material-icons">menu</span></a>
                <Link className="navbar-brand logo-line" to='/'>Cycling</Link>
                {this.headerRightContent()}
            </div>
          </div>
      );
    }
}

class SideBar extends React.Component {
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
              success: function(response) {
                  if ("response" in response) {
                    for(let i = 0; i < response.response.length; i++){
                      response.response[i].active = true;
                    }
                    context.props.app.setActiveCategories(response.response);
                  }
              },
              error: function(response) {
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
      if (this.props.map_settings.categories) {

          categories_list = this.props.map_settings.categories.map(function(category, index){
            return (<CategoryItem categoryName={category.name} isActive={category.active}
                              onClick={context.handleCategoryItemClick.bind(context, category.id)} key={index}/>);
          });
      }
      return categories_list;
    }

    getProfileUrlString() {
        /* Function for 'to' attribute of profile Link button in the sidebar.
         * Returns user's profile URL if he's logged in,
         * otherwise redirects him to the /login page
         */
        if (localStorage['token']) {
            return '/user/' + localStorage['id']
        } else {
            return '/login'
        }
    }

    getLayersView() {
        let context = this;
        let layers_list_view;

        layers_list_view = layers_list.map(function(layer, index){
          return (<LayerItem layerName={layer.name} isActive={layer.name === context.props.map_settings.active_layer().name}
                            onClick={context.handleLayerItemClick.bind(context, index)} key={index}/>);
        });

        return layers_list_view;
    }

    // This method return Parkings, Places and Stolen Bikes Markers Controllers
    // This include place categories controller
    getDisplayView() {
        let context = this;
        let show_places = this.props.map_settings.show_places();

        let additionalClassesPlaces = ["categories-expand"];
        let placesUlClasses = ["categories-ul collapse"];

        if (show_places)
            placesUlClasses.push("in");
        else
            additionalClassesPlaces.push("collapsed");

        return (
            <ul className="collapse display-ul" id="markers-list">
                <DisplayItem markerName={PARKINGS_MARKER_NAME} isActive={this.props.map_settings.show_parkings()}
                    onClick={context.handleMarkerItemClick.bind(context, "show_parkings")}/>
                <DisplayItem markerName={STOLEN_BICYCLES_MARKER_NAME} isActive={this.props.map_settings.show_stolens()}
                    onClick={context.handleMarkerItemClick.bind(context, "show_stolens")}/>
                <DisplayItem markerName={PLACES_MARKER_NAME} isActive={show_places}
                    onClick={context.handleMarkerItemClick.bind(context, "show_places")} additionalClasses={additionalClassesPlaces.join(" ")}
                    data_toggle="collapse" data_target="#display-list">

                    <ul className={placesUlClasses.join(" ")} id="display-list">
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
                <li><Link onlyActiveOnIndex activeStyle={{color:'#53acff'}} to='/'>Home</Link></li>
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
                <li><a href="#">Races Table</a></li>
                <li><Link onlyActiveOnIndex activeStyle={{color:'#53acff'}} to={this.getProfileUrlString()}>Profile</Link></li>
            </ul>
        </div>
      );
    }
};

class CategoryItem extends React.Component {

  render() {
    let liStyleClass = "categories-li-unactive";
    if (this.props.isActive)
       liStyleClass = "categories-li-active";

    return (
       <li className={"categories-li " + liStyleClass} onClick={this.props.onClick}>{this.props.categoryName}</li>
    );
  }

}

class LayerItem extends React.Component {

    render() {
        let liStyleClass = "layers-li-unactive";
        if (this.props.isActive)
            liStyleClass = "layers-li-active";

        return (
            <li className={"layers-li " + liStyleClass} onClick={this.props.onClick}>
                {this.props.layerName}
            </li>
        );
    }
}

class DisplayItem extends React.Component {

    render() {
        let liStyleClass = "display-li-unactive";
        if (this.props.isActive)
            liStyleClass = "display-li-active";

        if (this.props.additionalClasses)
            liStyleClass = [liStyleClass,  this.props.additionalClasses].join(" ");

        return (
            <li>
                <div className={"display-li " + liStyleClass} onClick={this.props.onClick}
                    id={this.props.id} data-toggle={this.props.data_toggle} data-target={this.props.data_target}>
                    <span className="li-name">{this.props.markerName}</span>
                </div>
                {this.props.children}
            </li>
        );
    }
}


const NotFound = () => (
  <h1>404.. This page is not found!</h1>)

ReactDOM.render(
  //React routing
  (<Router history = {browserHistory}>
      <Route path = "/" component = {APP}>
         <IndexRoute component = {Home} />
         <Route path = "home" component = {Home}/>
         <Route path = "/login" component = {LoginComponent} />
         <Route path = "/registration" component = {RegistrationComponent} />
         <Route path = "/marker_details/:id" component = {MarkerDetails} />
         <Route path = "/user/:user_id" component = {Profile} />
         <Route path = '*' component={NotFound} />
      </Route>
  </Router>),
  document.getElementById('app'));
