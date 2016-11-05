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


class APP extends React.Component{
    /*
     * Main component that include header,
     *  sidebar and provive rouning on page
     */
    constructor(props) {
        super(props);
        this.state = {
          showHideSidenav: false
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

    render(){
      //Render main component
      return (
        <div className={this.state.showHideSidenav} id="wrapper">
              <Header onButtonClick={this.handleClick}/>
              <SideBar/>
              <div className="page-content-wrapper">
                {this.props.children}
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

    render() {

      // we need to check if user is logged in
      // if yes we should instead of login and registration buttons return
      // avatar image
      var headerRightContent;

      if (localStorage['token']) {
        console.log("token found");
        // if he is logged in but there is no profile data
        // we should place loading spinner
        if (this.state.avatar){
          let styleObj = {
            height: "40px",
            width: "40px",
            border: "2px solid white",
            borderRadius: "20px",
            marginTop: "4px"
          };
          headerRightContent = (
            <img src={this.state.avatar} className="header-right" style={styleObj}/>
          );
        }
        else{
          headerRightContent = (
            <div className="spinner header-right">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          );

          $.get(
          {
            url: '/api/avatar',
            data: {token: localStorage['token']}
          },
          function (data) {
            console.log(data);
            if ("error" in data)
              browserHistory.push("/login");
            else
              this.setState({avatar: data.result.avatar});
          }.bind(this));
        }
      }
      else {
        console.log("token not found");
        headerRightContent = (
          <div className="header-right">
            <button className="header-button"><Link to='/login'>Login</Link></button>
            <button className="header-button"><Link to='/registration'>Registration</Link></button>
          </div>
        );
      }

      return(
          <div className="navbar navbar-fixed-top main-header" role="navigation">
            <div className="navbar-header">
                <a onClick={this.props.onButtonClick} id="menu-toggle" className="logo-a"><span className="icon material-icons">menu</span></a>
                <Link className="navbar-brand logo-line" to='/'>Cycling</Link>
                {headerRightContent}
            </div>
          </div>
      );
    }
}

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
      //Side bar component
      return (
        <div id="sidebar-wrapper" role="navigation">
            <ul className="sidebar-nav">
                <li><Link onlyActiveOnIndex activeStyle={{color:'#53acff'}} to='/'>Home</Link></li>
                <li><a href="#">View</a></li>
                <li><a href="#">Display Objects</a></li>
                <li><a href="#">Stolen Bycicles</a></li>
                <li><a href="#">Races Table</a></li>
                <li><a href="#">Profile</a></li>
            </ul>
        </div>
      );
    }
};

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
         <Route path = '*' component={NotFound} />
      </Route>
  </Router>),
  document.getElementById('app'));
