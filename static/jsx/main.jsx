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
            <ul>
               <li><Link onlyActiveOnIndex activeStyle={{color:'#53acff'}} to='/'>Home</Link></li>
               <li><Link activeStyle={{color:'#53acff'}} to='/registration'>Registration</Link></li>
            </ul>
				
           {this.props.children}
         </div>
      )
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