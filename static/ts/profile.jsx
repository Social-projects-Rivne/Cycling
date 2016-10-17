import React from 'react';

class UserData extends React.Component {

    state =  {
        api_output: ''
    } 

    async loadApi() {
        this.setState(
        { api_output: await fetch("/api/user_data/1/").then(response => response.json()) }
        )
    }


    componentDidMount() {
    this.loadApi();

    }
    render() {
        return (
        <div>
        <img src="static/images/av.png" />
        <p> user fullname: {this.state.api_output.full_name} </p>
        <p> user email: {this.state.api_output.email} </p>
        <button type="button">Edit</button>
        </div>
        )
    }

};

class BicycleData extends React.Component {

    state =  {
        api_output: ''
    } 

    async loadApi() {
        this.setState(
        { api_output: await fetch("/api/user_bikes_data/1/").then(response => response.json()) }
        )
    }


    componentDidMount() {
    this.loadApi();

    /*
    console.log(JSON.stringify(this.state.api_output));
    this.setState(
        {api_output: JSON.parse("[" + JSON.stringify(this.state.api_output) + "]")}, function () {console.log(this.state.output_api)}
    ),
    console.log(typeof [1,2]);
    console.log(typeof this.state.api_output);
    console.log(JSON.stringify(this.state.api_output));
    */


    }
    /*
    render() {
        return (
        <div>
        <ul>
        {this.state.api_output.map((bike) => (<li>{bike}</li>))}
        </ul>
        </div>
        )
    }
    */
    render() {
        return (
        <p>bikes: {JSON.stringify(this.state.api_output)}</p>
        )
    }
};























class PlacesData extends React.Component {

    state =  {
        api_output: ''
    } 

    async loadApi() {
        this.setState(
        { api_output: await fetch("/api/user_places_data/1/").then(response => response.json()) }
        )
    }


    componentDidMount() {
    this.loadApi();

    }
    render() {
        return (
        <div>
        <p> places: {JSON.stringify(this.state.api_output)}</p>
        </div>
        )
    }

};

class ParkingsData extends React.Component {

    state =  {
        api_output: ''
    } 

    async loadApi() {
        this.setState(
        { api_output: await fetch("/api/user_parkings_data/1/").then(response => response.json()) }
        )
    }


    componentDidMount() {
    this.loadApi();

    }
    render() {
        return (
        <p>{JSON.stringify(this.state.api_output)}</p>
        )
    }

};


class Profile extends React.Component {

    render() {
        return (
        <div>
        <UserData />
        <BicycleData />
        <PlacesData />
        <ParkingsData />
        </div>
        )
    }

};


/*

        { api_output: await fetch("/api/user_bikes_data/1/").then(response => JSON.parse("[" + JSON.stringify(response.json()) + "]")) }

        JSON.parse("[" + JSON.stringify(output) + "]")
        {JSON.stringify(this.state.api_output).map((bike) => (<li>{bike}</li>))}
        <p> put it here: {JSON.stringify(this.state.api_output)} </p>
        <p> put it here: {this.state.api_output.email} </p>
*/

export {Profile};