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
            </ul>
        </div>
        );
    }
}

export {Base};