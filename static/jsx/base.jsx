import React from 'react';


class Base extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
                <Header/>
                <SideBar/>
        );
    }
}

class Header extends React.Component {
    constructor(props){
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
    constructor(props){
        super(props);
        this.state = {};

        getCategories();
    }

    /*
    * This method fetch all categories from server and update state
    */
    getCategories() {
      console.log("getCategories");
      $.ajax({
              type: 'GET',
              url: 'api/v1/categories',
              contentType: 'application/json',
              dataType: "json",
              success: function(response) {
                  console.log("Server responsed with: ");
                  console.log(response);
                  if ("response" in response) {
                      this.setState({
                        categories: response.categories
                      });
                  }

              },
              error: function(response) {
                console.log(response);
              }

          });
    }

    handleCategoryClick(name) {
      localStorage["category"]["name"] = !localStorage["category"]["name"];
      this.setState({});
    }

    render() {
        let categories_list;
        if (this.state.categories) {
            let isActive;
            categories_list = this.state.categories.map((category, index)=>{

              stor_category_id = localStorage["category"][category.id];
              if (stor_category_id)
                isActive = stor_category_id;
              else
                isActive = true;

              return <Category name={category["name"]} isActive={isActive} onClick={handleCategoryClick(category["id"]).bind(this)}/>
            });
        }

        return (
        <div className="navmenu navmenu-default" role="navigation">
            <a className="navmenu-brand menu-title" href="#">Cycling</a>
            <ul className="nav navmenu-nav sidenav-ul">
                <li><Link onlyActiveOnIndex activeStyle={{color:'#53acff'}} to='/'>Home</Link></li>
                <li><Link activeStyle={{color:'#53acff'}} to='/registration'>Registration</Link></li>
                <li><a href="#">View</a></li>
                <li><a href="#">Display Objects</a>
                  <ul className="nav navmenu-nav sidenav-ul">
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
}

class Category extends React.Component {

  render() {
    if (this.props.isActive){
      styleObj = {
        "background-color": "#ff0000"
      };
    }
    return (
      <li style={styleObj}>this.props.name</li>
    );
  }

}

export {Base};
