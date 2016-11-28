import React from 'react';
import { Modal } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Link }           from 'react-router';

class UserData extends React.Component {
    // Render header of profile page which contains user's avatar, full name
    // and email. Edit user data possibility is also provided with modal
    // pop-up.
    constructor(props) {
        super(props);
        this.state =  {
            api_output: '',
            showModal: false,
            avatarSrc: null,
            avatarPreviewSrc: null,
            fullName: null
        };
        this.renderEditButtonIfLogged = this.renderEditButtonIfLogged.bind(this);
        this._open = this._open.bind(this);
        this._close = this._close.bind(this);
        this._revert = this._revert.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._avatarPreview = this._avatarPreview.bind(this);
        this._avatarUrlPreview = this._avatarUrlPreview.bind(this);
    }

    componentWillMount () {
        //Fetch data from the django api.

        $.ajax({
                type: "GET",
                url: `/api/user_data/${this.props.user_id}/`,
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    console.log('get_user_data api output: ');

                    console.log(JSON.stringify(response));
                    // If user has no avatar create default one for him.
                    if (response.avatar != 'None') {
                        this.setState ({
                            avatarSrc: response.avatar,
                            avatarPreviewSrc: response.avatar,
                        });
                    } else {
                        this.setState ({
                            avatarSrc: "/static/av.png",
                            avatarPreviewSrc: "/static/av.png"
                        });
                    }

                    this.setState ({
                        api_output: response,
                        //    avatarSrc: response.avatar,
                        fullName: response.full_name
                    });
                }.bind(this),
                error: function (response) {
                    console.log("error loading api with ajax");
                    browserHistory.push('/404');
                }
        });
    }

    renderEditButtonIfLogged() {
        // Make edit button to be rendered only on the profile page
        // of logged-in user.
        if (this.props.user_id === localStorage['id']) {
            return (
                <button id="editUserButton" type="button"
                    className="btn btn-default center-block" onClick={this._open}>
                    Edit profile
                </button>
            );
        }
    }

    
    _avatarPreview(event) {
        // Make avatar preview event if user uploads image file.
        console.log(URL.createObjectURL(event.target.files[0]));

        this.setState({avatarPreviewSrc: URL.createObjectURL(event.target.files[0])});


    }
    _avatarUrlPreview(event) {
        // Make avatar preview event if user notes image url in the input field.
        this.setState({avatarPreviewSrc: document.getElementById("modalAvatarUrl").value})
    }

    _close() {
        // Event for modal pop-up closing.
        this.setState({ showModal: false });
    }

    _open () {
        // Event for modal pop-up appearance when user has clicked on the 
        // "Edit user" button.
        this.setState({showModal: true });
    a
    }
    _revert () {
        // Event for Revert button which restores after edits all old user's 
        // data which came from API initial request.
        this.setState({
            avatarPreviewSrc: this.state.avatarSrc
        // I can't change state of .defaultValue attribute of input tag cause it's purpose is
            // only for component initialization. On the other hand, I can't use .value attribute,
            // because it makes text inside this input non-editable by the user. That's why instead
            // changes of component's state I'm getting value of the input using non-react methods
            // but DOM and pure JS below (avoiding jQuery for now too, cause it may be excluded from
            // project's scripts).
            // This thing makes me crazy.
        // fullName: this.state.api_output.full_name,
        });
        document.getElementById("modalFullName").value = this.state.api_output.full_name;
    }
    
    _handleSubmit(event) {
        // Catch modal popup form submit, get data from it, add user's token
        // and send to it to the server with POST method.
        event.preventDefault();
        let data_to_send = JSON.stringify({
            full_name: event.target.elements[0].value,
            avatar_url: event.target.elements[1].value,
            token: localStorage['token']
        });
        $.ajax({
                type: 'POST',
                url: `/api/edit_user_data/${this.props.user_id}/`,
                // url: '/api/edit_user_data/' + this.props.user_id + '/',
                dataType: "json",
                data: data_to_send,
                success: function(response) {
                    // INSERT SUCCESS CONFIRMATION NOTIFICATION
                    console.log('success!!!');
                    this._close();
                    //let path = `/user/${this.props.user_id}`;
                    //browserHistory.push(path);
                    
                    // browserHistory.push doesn't work for urls with dynamic 
                    // ids. Need to do more research, refresh the page for now.
                    window.location.reload()
                }.bind(this),
                error: function(response) {
                    console.log('error');
                }
        });
    }

    render() {
        return (
            <div>
            <div className="profile-header">
                <div id="data-container" className="container">

                    <div id="vertical-center-row" className="row">

                        <div className="col-md-2">
                            <img id="userAvatar" src={this.state.avatarSrc}
                            className="img-responsive img-circle margin"
                            width="150px" height="150px" alt="image unavailable"/>
                        </div>

                        <div className="col-md-3">
                            <span>
                                <p id="headerFullName">{this.state.api_output.full_name}</p>
                                <p id="headerEmail">{this.state.api_output.email}</p>
                            </span>
                        </div>

                        <div className="col-md-3">
                        </div>

                        <div className="col-md-2">
                            {this.renderEditButtonIfLogged()}
                        </div>

                </div>
            </div>
            </div>

            {/* make this modal as separate component later */}
            {/*<EditUserPopup api_output={this.state.api_output} /> */}

            <Modal show={this.state.showModal} onHide={this._close}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="edit_user_form" className="form-horizontal"
                        onSubmit={this._handleSubmit}>
                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="fullName">
                                Full name:
                            </label>
                            <div className="col-sm-5">
                                <input type="text" name="full_name" id="modalFullName"
                                    className="form-control"
                                    defaultValue={this.state.fullName} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="">
                                Avatar URL:
                            </label>
                            <div className="col-sm-5">
                                <input type="text" name="avatar_url" id="modalAvatarUrl"
                                    className="form-control" onChange={this._avatarUrlPreview}
                                    defaultValue={this.state.api_output.avatar} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="control-label col-sm-3"> Upload:</label>
                            <div className="col-sm-5">
                                <label className="btn btn-default btn-file">
                                    Browse...
                                    <input type="file" accept="image/*" style={{"display": "none"}}
                                        onChange={this._avatarPreview}/>
                                </label>
                                <span className="label label-info" id="upload-file-info"></span>
                            </div>
                        </div>
                        <div className="row">
                            <img id="avatarPreview" src={this.state.avatarPreviewSrc}
                                className="img-responsive img-circle margin"
                                width="150px" height="150px" alt="image unavailable"/>
                        </div>
                        <input type="submit" id="submit-form" className="hidden" />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-default" onClick={this._close}>Close</button>
                    <button className="btn btn-danger" onClick={this._revert} type="button">Revert</button>
                    <label className="btn btn-success" htmlFor="submit-form">Save</label>
               </Modal.Footer>
            </Modal>

            </div>
        )
    }

};

let editBikeButton = function(bike){
    if(bike.owner_id != localStorage['id']){
        return null;
    };
    return (
        <span className="material-icons pencil">
            <Link type="button" className="btn btn-default btn-xs" to={'/bike/' + bike.id}>edit</Link>
        </span>
    );
};

class Bike extends React.Component {
    // Render single card for the bike.
    
    constructor(props) {
        super(props);
        this.renderImg = this.renderImg.bind(this);
    }


    
    renderImg() {
        if (this.props.bike.images_urls == null) {
            return (
                <img src="" alt="No picture was provided yet" />
            )
        } else {
            return (
            <img src={this.props.bike.images_urls[0].url} 
                className="img-responsive item-image"
                alt="image unavailable" />
            )
        }
    }
 
    
    render () {
        return (
        <div className="my-card col-md-5">

            <div>
                <h4 className="item-name">{this.props.bike.name}</h4>
                { editBikeButton(this.props.bike) }
            </div>
            {this.renderImg()}
            <div className="card-block">
                <p> {this.props.bike.description} </p>
            </div>

        </div>
        )
    }
}

class BikesRow extends React.Component {
    // Render Bootstrap's row from one or two existing bikes.
    render () {
            return (
            <div className="row">
                {
                    this.props.bikesPair.map((bike, index) => (
                        <Bike key={index} bike={bike} />
                    ))
                }
            </div>
            )
        }
}

class BicycleData extends React.Component {
    // Render data about all user's bikes.

    state = {
        api_output: ''
    }

    componentWillMount() {
        // Fetch data from the django api.
        //  $.get("/api/user_bikes_data/"+this.props.owner_id+"/",
        $.get(`/api/user_bikes_data/${this.props.owner_id}/`,   
            function (response) {
                this.setState ({
                        api_output: response
                    });
            }.bind(this)
        )

    }

    render() {
        if (this.state.api_output[0] == undefined) {
            return (<p>No bikes were added</p>);
        } else {
            return (
                <div className="container">
                {
                    this.state.api_output.reduce((pairs, bike, index) => {
                        if (index % 2 === 0) {
                            pairs.push([]);
                        }
                        pairs[pairs.length -1].push(bike);
                        return pairs;
                    }, []).map(function(pair, index) {
                        return (<BikesRow key={index} bikesPair={pair} />)
                    })
                }
                </div>
            );
        }
    }
}

class Place extends React.Component {
    // Render single card for the place.
    constructor(props) {
        super(props);
        this.renderImg = this.renderImg.bind(this);
    }


    
    renderImg() {
        if (this.props.place.images_urls == null) {
            return (
                <img src="" alt="No picture was provided yet" />
            )
        } else {
            return (
            <img src={this.props.place.images_urls[0].url} 
                className="img-responsive item-image"
                alt="image unavailable" />
            )
        }
    }
    
    render () {
        return (
        <div className="my-card col-md-5">

            <div >
                <h4 className="item-name">{this.props.place.name}</h4>
                <span id="location-icon" className="material-icons pencil">edit</span>
            </div>
            {this.renderImg()}
            <div className="card-block">
                <p>Lattitude: {this.props.place.lat} Longtitude: {this.props.place.lng}</p>
                <p> {this.props.place.description} </p>
                <p>Open from {this.props.place.from_hour} to {this.props.place.to_hour} </p>
            </div>

        </div>
        )
    }
}

class PlacesRow extends React.Component {
    // Render Bootstrap's row from one or two existing places.
    render () {
            return (
            <div className="row">
                {
                    this.props.placesPair.map((place, index) => (
                        <Place key={index} place={place} />
                    ))
                }
            </div>
            )
        
        }
}


class PlacesData extends React.Component {
    // Render data about all user's places.

    state =  {
        api_output: ''
    }
    componentWillMount() {
        // Fetch data from the django api.
        //  $.get("/api/user_places_data/" + this.props.owner_id + "/",
        $.get(`/api/user_places_data/${this.props.owner_id}/`,
            function (response) {
                console.log('user_places_data api output: ');
                console.log(JSON.stringify(response));
                this.setState ({
                        api_output: response
                    });
            }.bind(this)
        )
    }

    render() {
        if (this.state.api_output[0] == undefined) {
            return (<p>No places were added</p>);
        } else {
            return (
                <div className="container">
                {
                    this.state.api_output.reduce((pairs, place, index) => {
                        if (index % 2 === 0) {
                            pairs.push([]);
                        }
                        pairs[pairs.length -1].push(place);
                        return pairs;
                    }, []).map(function(pair, index) {
                        return (<PlacesRow key={index} placesPair={pair} />)
                    })
                }
                </div>
            );
        }
    }

};

class Parking extends React.Component {
    // Render single card for the parking.
    constructor(props) {
        super(props);
        this.renderImg = this.renderImg.bind(this);
    }
    
    renderImg() {
        if (this.props.parking.images_urls == null) {
            return (
                <img src="" alt="No picture was provided yet" />
            )
        } else {
            return (
            <img src={this.props.parking.images_urls[0].url} 
                className="img-responsive item-image"
                alt="image unavailable" />
            )
        }
    }
 
    render () {
        return (
        <div className="my-card col-md-5">

            <div >
                <h4 className="item-name">{this.props.parking.name}</h4>
                <span id="location-icon" className="material-icons pencil">edit</span>
            </div>
            {this.renderImg()}
            <div className="card-block">
                <p>Lattitude: {this.props.parking.lat} Longtitude: {this.props.parking.lng}</p>
                <p> {this.props.parking.description} </p>
                <p> Is free: {this.props.parking.is_free ? 'Yes' : 'No'} </p>
                <p> Slots avail.: {this.props.parking.amount} </p>
                <p> Security: {this.props.parking.security} </p>
            </div>

        </div>
        )
    }
}

class ParkingsRow extends React.Component {
    // Render Bootstrap's row from one or two existing parkings.
    render () {
            return (
            <div className="row">
                {
                    this.props.parkingsPair.map((parking, index) => (
                        <Parking key={index} parking={parking} />
                    ))
                }
            </div>
            )
        }
}


class ParkingsData extends React.Component {
    // Render data about all user's parkings.

    state =  {
        api_output: ''
    }

    componentWillMount() {

        //$.get("/api/user_parkings_data/" + this.props.owner_id + "/",
        $.get(`/api/user_parkings_data/${this.props.owner_id}/`,
            function (response) {
                console.log('user_parkings_data api output: ');
                console.log(JSON.stringify(response));
                this.setState ({
                        api_output: response
                    });
            }.bind(this)
        )
    }

    render() {
        if (this.state.api_output[0] == undefined) {
            return (<p>No parkings were added</p>);
        } else {
            return (
                <div className="container">
                {
                    this.state.api_output.reduce((pairs, parking, index) => {
                        if (index % 2 === 0) {
                            pairs.push([]);
                        }
                        pairs[pairs.length -1].push(parking);
                        return pairs;
                    }, []).map(function(pair, index) {
                        return (<ParkingsRow key={index} parkingsPair={pair} />)
                    })
                }
                </div>
            );
        }
    }

};

let addBikeButton = function(user_id){
    if(user_id != localStorage['id']){
        return null;
    };
    return (
        <small style={{marginLeft: "20px", display: "inline-block", verticalAlign: "middle", float: "none"}}>
            <span className="btn-group">
                <Link type="button" className="btn btn-default btn-xs" to='/bike/create'>Add</Link>
            </span>
        </small>
    );
};

class Profile extends React.Component {
    // Render components with user's data, bikes, places and parkings.
    render() {
        this.user_id = this.props.params['user_id'];
        return (
            <div id="profile-container" className="container" >


            <UserData user_id={this.user_id}/>

            <h4>My bikes
                {addBikeButton(this.props.params['user_id'])}
            </h4>
                
            <BicycleData owner_id={this.user_id} />

            <h4>Places added by me</h4>
            <PlacesData owner_id={this.user_id} />

            <h4>Parkings added by me</h4>
            <ParkingsData owner_id={this.user_id} />

            </div>
        )
    }

};

export {Profile};
