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


class APP extends React.Component{
    /*
     * Main component that include header,
     *  sidebar and provive rouning on page
     */
    constructor(props) {
        super(props);
        this.state = {
          "showHideSidenav":""
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      /*
       * Change main div class in case of clicking on button,
       * to provide posibility of hidding and opening sidevar
       */
      var css = (this.state.showHideSidenav === "") ? "toggled" : ""
      this.setState({"showHideSidenav":css});
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
    render() {
      //Header component
      return(
            <div className="navbar navbar-fixed-top main-header" role="navigation">
              <div className="navbar-header">
                  <a onClick={this.props.onButtonClick} id="menu-toggle" className="logo-a">
                  <span className="icon material-icons">menu</span></a>
                  <Link className="navbar-brand logo-line" to='/'>Cycling</Link>
                  <div className="header-button"><Link to='/registration'>Registration</Link></div>
              </div>
            </div>
      );
    }
}

class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        // this.handleCategoryClick = this.handleCategoryClick.bind(this);
    }

    /*
    * This method fetch all categories from server and update state
    */
    getCategories() {
      let context = this;
      $.ajax({
              type: 'GET',
              url: 'api/v1/categories',
              contentType: 'application/json',
              dataType: "json",
              success: function(response) {
                  console.log("Server responsed with: ");
                  console.log(response);
                  if ("response" in response) {
                      context.setState({
                        categories: response.response
                      });
                  }

              },
              error: function(response) {
                console.log(response);
              }

          });
    }

    componentDidMount() {
      this.getCategories();
    }

    handleCategoryClick(id) {
      // TODO make ajax places data refresh
      let stateObj = {};
      stateObj["active_category_" + id] = !this.state["active_category_" + id];
      this.setState(stateObj);
    }

    render() {
        let context = this;
        let categories_list;
        if (this.state.categories) {

            categories_list = this.state.categories.map(function(category, index){
              if (context.state["active_category_" + category.id] == null)
                context.state["active_category_" + category.id] = true;
              return (<Category categoryName={category.name} isActive={context.state["active_category_" + category.id]}
                                onClick={context.handleCategoryClick.bind(context, category.id)} key={index}/>);
            });
        }
        return (
        <div id="sidebar-wrapper" role="navigation">
            <ul className="sidebar-nav">
                <li className="sidebar-brand"><a to='/'>Welcome</a></li>
                <li><Link onlyActiveOnIndex activeStyle={{color:'#53acff'}} to='/'>Home</Link></li>
                <li><a href="#">View</a></li>
                <li><a href="#">Display Objects</a>
                  <ul className="sidenav-ul">
                    {categories_list}
                  </ul>
                </li>
                <li><a href="#">Stolen Bycicles</a></li>
                <li><a href="#">Races Table</a></li>
                <li><a href="#">Profile</a></li>
            </ul>
        </div>
      );
    }
};

class Category extends React.Component {

  render() {

    if (this.props.isActive){
      var styleObj = {
        backgroundColor: "#ff0000"
      };
    }
    else {
        backgroundColor: "#000000"
    }
    return (
      <li style={styleObj}><a href="#" onClick={this.props.onClick}>{this.props.categoryName}</a></li>
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
         <Route path='*' component={NotFound} />
      </Route>
  </Router>),
  document.getElementById('app'));
