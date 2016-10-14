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

class APP extends React.Component{
    render(){
      return (
           <div>
              <Header/>
              <SideBar/>
          </div>
        );
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {};
    }

    render() {
        return(
            <div className="navbar navbar-fixed-top" role="navigation">
            <div className="navbar-header">
                <a className="logo-a"><span className="icon material-icons">menu</span></a>
                <a className="navbar-brand logo-line" href="/">Cycling</a>
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
        <div className="navmenu navmenu-default" role="navigation">
            <a className="navmenu-brand menu-title" href="#">Cycling</a>
            <ul className="nav navmenu-nav sidenav-ul">
                <li><Link onlyActiveOnIndex activeStyle={{color:'#53acff'}} to='/'>Home</Link></li>
                <li><Link activeStyle={{color:'#53acff'}} to='/registration'>Registration</Link></li>
                <li><a href="#">View</a></li>
                <li><a href="#">Display Objects</a></li>
                <li><a href="#">Stolen Bycicles</a></li>
                <li><a href="#">Races Table</a></li>
                <li><a href="#">Profile</a></li>
                {this.props.children}
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
         <Route path='*' component={NotFound} />
      </Route>
  </Router>),
  document.getElementById('app'));