import React              from 'react';
import { Router,
  Route,
  Link,
  hashHistory,
  browserHistory,
  IndexRoute }            from 'react-router';
import ReactDOM           from 'react-dom';
import { FormComponent }  from './registration.jsx';
import Parent             from './parent.jsx';
import {Profile}          from './profile.jsx';

class APP extends React.Component{
    constructor(props) {
        super(props);    
        this.state = {
          "showHideSidenav":""
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      var css = (this.state.showHideSidenav === "") ? "toggled" : ""
      this.setState({"showHideSidenav":css});
    }

    render(){
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

    render() {
        return(
            <div className="navbar navbar-fixed-top main-header" role="navigation">
              <div className="navbar-header">
                  <a onClick={this.props.onButtonClick} id="menu-toggle" className="logo-a"><span className="icon material-icons">menu</span></a>
                  <Link className="navbar-brand logo-line" to='/'>Cycling</Link>
                  <button className="btn btn-info header-button"><Link to='/registration'>Registration</Link></button>
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
        return (
        <div id="sidebar-wrapper" role="navigation">
            <ul className="sidebar-nav">
                <li className="sidebar-brand"><a to='/'>Welcome</a></li>
                <li><Link onlyActiveOnIndex activeStyle={{color:'#53acff'}} to='/'>Home</Link></li>
                <li><a href="#">View</a></li>
                <li><a href="#">Display Objects</a></li>
                <li><a href="#">Stolen Bycicles</a></li>
                <li><a href="#">Races Table</a></li>
                <li><Link onlyActiveOnIndex activeStyle={{color:'#53acff'}} to='/profile'>ProfileHome</Link></li>
            </ul>
        </div>
        );
    }
};

const NotFound = () => (
  <h1>404.. This page is not found!</h1>)

ReactDOM.render(
  (<Router history = {browserHistory}>
      <Route path = "/" component = {APP}>
         <IndexRoute component = {Parent} />
         <Route path = "home" component = {Parent} />
         <Route path = "/registration" component = {FormComponent} />
         <Route path = "/registration" component = {Profile} />
         <Route path='*' component={NotFound} />
      </Route>
  </Router>),
  document.getElementById('app'));