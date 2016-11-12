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

    setActiveCategories(categories) {
      // console.log("setActiveCategories() call\nNew categories:", categories);
      this.setState({categories: categories});
    }

    render(){
      //Render main component
      return (
        <div className={this.state.showHideSidenav} id="wrapper">
              <Header onButtonClick={this.handleClick}/>
              <SideBar app={this} categories={this.state.categories}/>

              <div className="page-content-wrapper">
                {React.cloneElement(this.props.children, { categories: this.state.categories })}
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
          return (
            <img src={this.state.avatar} id="avatar" className="header-right" style={styleObj}/>
          );
        }
        else{

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
        console.log("token not found");
        return (
          <div className="header-right">
            <div className="header-button"><Link id="header-button-a" to='/login'>Login</Link></div>
            <div className="header-button"><Link id="header-button-a" to='/registration'>Registration</Link></div>
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
        // this.handleCategoryItemClick = this.handleCategoryItemClick.bind(this);
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
      for (let i = 0; i < this.props.categories.length; i+=1) {
        newCategories[i] = {};
        if (this.props.categories[i].id === id)
          newCategories[i].active = !this.props.categories[i].active;
        else
          newCategories[i].active = this.props.categories[i].active;
        newCategories[i].name = this.props.categories[i].name;
        newCategories[i].id = this.props.categories[i].id;
      }

      // send to father new active categories which cause rerender of sidebar and map
      this.props.app.setActiveCategories(newCategories);
    }

    getCategoriesView() {
      let context = this;
      let categories_list;
      if (this.props.categories) {

          categories_list = this.props.categories.map(function(category, index){
            return (<CategoryItem categoryName={category.name} isActive={category.active}
                              onClick={context.handleCategoryItemClick.bind(context, category.id)} key={index}/>);
          });
      }
      return categories_list;
    }

    render() {
        return (
        <div id="sidebar-wrapper" role="navigation">
            <ul className="sidebar-nav">
                <li><Link onlyActiveOnIndex activeStyle={{color:'#53acff'}} to='/'>Home</Link></li>
                <li><a href="#">Display Objects</a>
                  <ul className="categories-ul">
                    {this.getCategoriesView()}
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

class CategoryItem extends React.Component {

  render() {
    let liStyleClass = "ctg-li-unactive";
    if (this.props.isActive)
      liStyleClass = "ctg-li-active";

    return (
      <li className={"categories-li " + liStyleClass} onClick={this.props.onClick}>{this.props.categoryName}</li>
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


