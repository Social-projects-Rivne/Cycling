import React from 'react';
import { browserHistory } from 'react-router';


const DISTANCE_STEP = 1;
const SCROLL_SPACE = 20;
const CONTAINER_CLASS = "card-container";
const HEADER_CLASS = "card-header-h";

export default class StolePage extends React.Component {

    constructor(props) {
        super(props);
        //
        this.blockOnScroll = false;
        this.state = {
            bike_amount: 0,
            server_amount: 0,
            data: [],
            min_distance: 0,
            max_distance: DISTANCE_STEP
        };
    }

    componentDidMount() {
        document.onscroll = this.onScroll.bind(this);
        this.uploadBikes();
    }

    componentWillUnmount() {
        document.onscroll = null;
    }

    onScroll() {

        if (this.blockOnScroll || this.state.bike_amount === this.state.server_amount){
            return;
        }

        let lastDiv = document.querySelector([".", CONTAINER_CLASS, " > .", HEADER_CLASS ,":last-child"].join(""));
        let lastDivOffset = lastDiv.offsetTop + lastDiv.clientHeight;
        let pageOffset = window.pageYOffset + window.innerHeight;

        if(pageOffset > lastDivOffset - SCROLL_SPACE) {
            this.uploadBikes();
        }

    }

    uploadBikes() {
        this.blockOnScroll = false;
        let dataObj = {
            lat: localStorage["center_lat"],
            lng: localStorage["center_lng"],
            distance: this.state.max_distance,
            distance_min: this.state.min_distance
        };

        $.get({
            url: "api/stolen/all",
            data: dataObj,
            success: function success(data) {

                if ("data" in data){

                    let old_data = this.state.data;
                    let old_data_length = old_data.length;

                    if (old_data_length > 1 && "text" in old_data[old_data_length - 1] && "text" in old_data[old_data_length - 2]){
                            old_data.pop(old_data_length - 1);
                    }

                    let new_bike_amount = this.state.bike_amount + data.count;

                    if (new_bike_amount === data.count_all){
                        data.data.push({text: "No more stolen bikes."});
                    }
                    else{
                        data.data.push({text: [this.state.max_distance, "km"].join("")});
                    }

                    this.setState({
                        server_amount: data.count_all,
                        bike_amount: new_bike_amount,
                        data: this.state.data.concat(data.data),
                        min_distance: this.state.max_distance,
                        max_distance: this.state.max_distance + DISTANCE_STEP
                    });

                    this.blockOnScroll = false;

                    this.onScroll();

                }
                else {
                    console.log("Error: ", data);
                }
            }.bind(this),
            error: function error(data) {
                console.log("Error, response: ", data);
            }
        });

    }

    handleBike(id) {
        browserHistory.push([
            "/marker_details/", id, "?type=StolenBike"].join(""));
    }

    handleLocation(lat, lng) {
        localStorage["center_lat"] = lat;
        localStorage["center_lng"] = lng;
        localStorage["zoom"] = 16;
        browserHistory.push("/");
    }

    getStolenList() {

        if (this.state.data.length !== 0) {
            return this.state.data.map(function(item, index) {

                if ("id" in item){
                    return (
                        <GetStolenView handleBike={this.handleBike.bind(this, item.id)} key={index}
                            handleLocation={this.handleLocation.bind(this, item.lat, item.lng)}
                            name={item.bike.name} image_url={item.bike.image_url}
                            description={item.description} lat={item.lat} lng={item.lng}/>
                    );
                }
                else {
                    return (
                        <GetHeaderView text={item.text} key={index}/>
                    )
                }

            }.bind(this));
        }
        else {
            return <h1>Loading</h1>;
        }
    }

    render() {
        return (
            <div className={CONTAINER_CLASS}>{this.getStolenList()}</div>
        );
    }

}

let GetStolenView = function GetStolenView(props) {

    return (
        <div className="card-body">
            <div onClick={props.handleBike} className="card-top-content">
                <div>
                    <h4 className="card-name">{props.name}</h4>
                </div>
                <img src={props.image_url}
                    className="img-responsive item-image card-image"
                    alt="image unavailable" />
                <div className="card-description">
                    <p> {props.description} </p>
                </div>
            </div>
            <div className="card-location" onClick={props.handleLocation}>
                    <span className="card-icon material-icons">room</span>
                    <span className="card-location-text "> {[props.lat, props.lng].join(", ")} </span>
            </div>
        </div>
    );
}

let GetHeaderView = function GetHeaderView(props) {

    return (
        <h4 className={HEADER_CLASS}><span className="card-header-span">{props.text}</span></h4>
    );

}
