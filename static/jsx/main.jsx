import React from 'react';
import { Router,
  Route,
  Link,
  hashHistory,
  browserHistory,
  IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import { RegistrationComponent } from './registration.jsx';
import { LoginComponent } from './login.jsx';
import Home from './home.jsx';
import { MarkerDetails } from './marker_detail_page.jsx';
import { Profile } from './profile.jsx';
import { MapSettings } from './map/map_settings.jsx';
import layers_list          from './map/layers.jsx';
import CreateBike, {EditBike} from './bikes/create_bike.jsx';
import FailNotification from './notifications/fail.jsx';
import SuccessNotification from './notifications/success.jsx';

import { SideBar } from './sidebar.jsx';

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
          map_settings: new MapSettings()
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      /*
       * Change main div class in case of clicking on button,
       * to provide posibility of hidding and opening sidevar
       */
      var wrapper = document.querySelector('.wrapper-div');
      wrapper.classList.toggle('toggled');
      wrapper.classList.toggle('overlay');
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
        <div className="wrapper-div" id="wrapper">

            <SuccessNotification ref="successNotification" father={this} />
            <FailNotification ref="failNotification" father={this} />

              <Header onButtonClick={this.handleClick}/>
              <SideBar app={this} map_settings={this.state.map_settings}/>

              <div className="page-content-wrapper">
                {React.cloneElement(this.props.children, this.getChildProps(), {father: this})}
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
      let headerRightContent;

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
            data: {token: localStorage['token']},
            success: function success(data) {
              if ("error" in data){
                localStorage.removeItem('token');
                this.setState({avatar: null});
                browserHistory.push("/login");
              }
              else{
                this.setState({avatar: data.result.avatar});
              }
            }.bind(this)
          });

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
            <Link className="header-button" id="header-button-a" to="/login">Login</Link>
            <Link className="header-button" id="header-button-a" to="/registration">Registration</Link>
          </div>
        );
      }
    }

    render() {

      return(
          <div className="navbar navbar-fixed-top main-header" role="navigation">
            <div className="navbar-header">
                <a onClick={this.props.onButtonClick} id="menu-toggle" className="logo-a"><span className="icon material-icons">menu</span></a>
                <Link className="navbar-brand logo-line" to="/">Cycling</Link>
                {this.headerRightContent()}
            </div>
          </div>
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
         <Route path = "/bike/create" component = {CreateBike} />
         <Route path = "/bike/:bike_id" component = {EditBike} />
         <Route path = '/404' component={NotFound} />
         <Route path = '*' component={NotFound} />
      </Route>
  </Router>),
  document.getElementById('app'));
