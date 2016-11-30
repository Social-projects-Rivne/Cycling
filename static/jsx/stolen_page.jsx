import React from 'react';
import { browserHistory } from 'react-router';


const DISTANCE_STEP = 15;

export default class StolePage extends React.Component {

    constructor(props) {
        super(props);
        //
        this.state = {
            min_distance: 0,
            max_distance: DISTANCE_STEP
        };
    }

    componentWillMount() {
        this.uploadBikes(this.state.min_distance, this.state.max_distance);
    }

    uploadBikes(r_min, r_max) {
        let dataObj = {
            lat: localStorage["center_lat"],
            lng: localStorage["center_lng"],
            distance: r_max,
            distance_min: r_min
        };
        let context = this;
        $.get({
            url: "api/stolen/all",
            data: dataObj,
            success: function success(data) {
                if ("data" in data){
                    context.setState({
                        data: data.data,
                        min_distance: context.state.max_distance,
                        max_distance: context.state.max_distance + DISTANCE_STEP
                    });
                }
                else {
                    console.log("Error: ", data);
                }
            },
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
        if (this.state.data) {
            return this.state.data.map((bike, index) => (
                <GetStolenView handleBike={this.handleBike.bind(this, bike.id)} key={index}
                    handleLocation={this.handleLocation.bind(this, bike.lat, bike.lng)}
                    name={bike.bike.name} image_url={bike.bike.image_url}
                    description={bike.description} lat={bike.lat} lng={bike.lng}
                />
            ));
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <div className="card-container">{this.getStolenList()}</div>
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
