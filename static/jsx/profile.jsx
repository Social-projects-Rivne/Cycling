import React from 'react';
import { Modal } from 'react-bootstrap';


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
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.revert = this.revert.bind(this);
      //  this.getAvatar = this.getAvatar.bind(this);
        this.avatarPreview = this.avatarPreview.bind(this);
        this.avatarUrlPreview = this.avatarUrlPreview.bind(this);
    }


    componentDidMount() {
        // Fetch data from the django api.
        $.get("/api/user_data/" + this.props.user_id + "/",
            function (response) {
                console.log(response);
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
                }.bind(this)
        );

    }
    avatarPreview(event) {
        // Make avatar preview event if user uploads image file.
        /*
        let img = document.getElementById('avatarPreview');
        img.src = URL.createObjectURL(event.target.files[0]);
        */
        console.log(URL.createObjectURL(event.target.files[0]));

        this.setState({avatarPreviewSrc: URL.createObjectURL(event.target.files[0])});


    }
    avatarUrlPreview(event) {
        // Make avatar preview event if user notes image url in the input field.
        this.setState({avatarPreviewSrc: document.getElementById("modalAvatarUrl").value})
    }
    /*
    getAvatar() {
        if (this.state.api_output.avatar == 'None') {
            this.setState ({avatarSrc: "/static/av.png"});
        } else {
            this.setState({avatarSrc: this.state.api_output.avatar});
        }
    }
    */
    close() {
        // Event for modal pop-up closing.
        this.setState({ showModal: false });
        this.revert();
    }

    open () {
        // Event for modal pop-up appearance when user has clicked on the 
        // "Edit user" button.
        this.setState({showModal: true });
    }
    revert () {
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

/*
    save() {
        let formData = JSON.stringify(document.getElementById('edit_user_form').serializeArray());
        $.ajax({
                type: 'POST',
                url: '/api/edit_user_data/' + this.props.user_id + '/',
                dataType: "json",
                data: formData
        });
    }
*/
    render() {
        return (
            <div>
            <div className="profile-header">
            <div id="centralizer" className="container">

                <div id="headerDataRow" className="row">
                <div className="col-md-2 headerItems vertical-center">
                <img id="userAvatar" src={this.state.avatarSrc}
                    className="img-responsive img-circle margin"
                    width="150px" height="150px" alt="image unavailable"/>
                </div>
                <div className="col-md-3 headerItems vertical-center">
                <span>
                    <p id="headerFullName">{this.state.api_output.full_name}</p>
                    <p id="headerEmail">{this.state.api_output.email}</p>
                </span>
                </div>
                <div className="col-md-3 headerItems vertical-center"></div>
                <div className="col-md-2 headerItems vertical-center">
                <button id="editUserButton" type="button"
                    className="btn btn-default" onClick={this.open}>
                    Edit profile</button>
                </div>
                </div>
            </div>
            </div>

            {/* make this modal as separate component later */}
            {/*<EditUserPopup api_output={this.state.api_output} /> */}

            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="edit_user_form" className="form-horizontal"
                        action="/api/edit_user_data/1/" method="post">

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
                                    className="form-control" onChange={this.avatarUrlPreview}
                                    defaultValue={this.state.api_output.avatar} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="control-label col-sm-3"> Upload:</label>
                            <div className="col-sm-5">
                                <label className="btn btn-default btn-file">
                                    Browse...
                                    <input type="file" accept="image/*" style={{"display": "none"}}
                                        onChange={this.avatarPreview}/>
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
                    <button className="btn btn-default" onClick={this.close}>Close</button>
                    <button className="btn btn-danger" onClick={this.revert} type="button">Revert</button>
                    <label className="btn btn-success" htmlFor="submit-form">Save</label>
                </Modal.Footer>
            </Modal>

            </div>
        )
    }

};

/*
class EditUserPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            api_output: this.props.api_output,
            showModal: false
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open () {
        this.setState({showModal: true });
    }

    render () {
        return (
            <Modal show={UserData.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="edit_user_form" className="form-horizontal" action="/api/edit_user_data/1/" method="post">

                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="fullName">Full name:</label>
                        <div className="col-sm-5">
                            <input type="text" name="full_name"
                                className="form-control"
                                defaultValue={this.state.api_output.full_name} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-2"> Avatar:</label>
                        <div className="col-sm-5">
                            <label className="btn btn-default btn-file">
                                Browse...
                                <input type="file" style={{"display": "none"}}
                                    onChange="$('#upload-file-info').html($(this).val());"/>
                            </label>
                            <span className="label label-info" id="upload-file-info"></span>
                        </div>
                    </div>
                        <input type="submit" id="submit-form" className="hidden" />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-default" onClick={this.close}>Close</button>
                    <button className="btn btn-danger" type="button">Revert</button>
                    <label className="btn btn-success" htmlFor="submit-form">Save</label>
                </Modal.Footer>
            </Modal>
        )
    }

}
*/

class Bike extends React.Component {
    // Render single card for the bike.
    render () {
        return (
        <div className="my-card col-md-5">

            <div>
                <h4 className="item-name">{this.props.bike.name}</h4>
                <span id="location-icon" className="material-icons pencil">edit</span>
            </div>
            <img src={this.props.bike.images_urls[0].url} className="item-image"
            alt="image unavailable" />
            <div className="card-block">
                <p> {this.props.bike.description} </p>
            </div>

        </div>
        )
    }
}

class BikesRow extends React.Component {
    // Render Bootstrap's row from one or two existing bikes. If there is only
    // one bike this class inserts to this row AddItem card with plus button as
    // the second item.
    render () {
        if (this.props.bikesPair.length === 1) {
            return (
                <div className="row">
                    <Bike key="1" bike={this.props.bikesPair[0]} />
                    <AddItemCard />
                </div>
            )
        } else {
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
}

class BicycleData extends React.Component {
    // Render data about all user's bikes.

    state = {
        api_output: ''
    }

    componentDidMount() {
        // Fetch data from the django api.
        $.get("/api/user_bikes_data/"+this.props.owner_id+"/",
            function (response) {
                console.log(JSON.stringify(response));
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
                    }, []).map(function(pair, index, arr) {

                        if (index == arr.length-1 && this.state.api_output.length % 2 === 0) {
                            return (
                            <div>
                                <BikesRow key={index} bikesPair={pair} />
                                <div className="row">
                                    <AddItemCard />
                                </div>
                            </div>
                            );
                        } else {
                        return (<BikesRow key={index} bikesPair={pair} />)
                        }
                    }.bind(this))
                }
                </div>
            );
        }
    }
}

class Place extends React.Component {
    // Render single card for the place.
    render () {
        return (
        <div className="my-card col-md-5">

            <div >
                <h4 className="item-name">{this.props.place.name}</h4>
                <span id="location-icon" className="material-icons pencil">edit</span>
            </div>
            <img src=""
            alt="image unavailable" />
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
    // Render Bootstrap's row from one or two existing places. If there is only
    // one place this class inserts to this row AddItem card with plus button as
    // the second item.
    render () {
        if (this.props.placesPair.length === 1) {
            return (
                <div className="row">
                    <Place key="1" place={this.props.placesPair[0]} />
                    <AddItemCard />
                </div>
            )
        } else {
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
}


class PlacesData extends React.Component {
    // Render data about all user's places.

    state =  {
        api_output: ''
    }
    componentDidMount() {
        // Fetch data from the django api.
        $.get("/api/user_places_data/" + this.props.owner_id + "/",
            function (response) {
                console.log(JSON.stringify(response));
                this.setState ({
                        api_output: response
                    });
            }.bind(this)
        )
    }
/*
    render() {
        if (this.state.api_output[0] == undefined) {
            return (<p>No places were added</p>);
        }
        else {
            return (
                <div>
                {this.state.api_output.map((place, index) => (<p key={index}>{JSON.stringify(place)}</p>))}
                </div>
            );
        }
    }
*/

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
                    }, []).map(function(pair, index, arr) {

                        if (index == arr.length-1 && this.state.api_output.length % 2 === 0) {
                            return (
                            <div>
                                <PlacesRow key={index} placesPair={pair} />
                                <div className="row">
                                    <AddItemCard />
                                </div>
                            </div>
                            );
                        } else {
                        return (<PlacesRow key={index} placesPair={pair} />)
                        }
                    }.bind(this))
                }
                </div>
            );
        }
    }

};

class Parking extends React.Component {
    // Render single card for the parking.
    render () {
        return (
        <div className="my-card col-md-5">

            <div >
                <h4 className="item-name">{this.props.parking.name}</h4>
                <span id="location-icon" className="material-icons pencil">edit</span>
            </div>
            <img src=""
            alt="image unavailable" />
            <div className="card-block">
                <p>Lattitude: {this.props.parking.lat} Longtitude: {this.props.parking.lng}</p>
                <p> {this.props.parking.description} </p>
                <p> Is free {this.props.parking.is_free} </p>
                <p> Slots avail.: {this.props.parking.amount} </p>
                <p> Security: {this.props.parking.security} </p>
            </div>

        </div>
        )
    }
}

class ParkingsRow extends React.Component {
    // Render Bootstrap's row from one or two existing parkings. If there is 
    // only one parking then this class inserts to this row AddItem card with 
    // plus button as the second item. 
    render () {
        if (this.props.parkingsPair.length === 1) {
            return (
                <div className="row">
                    <Parking key="1" parking={this.props.parkingsPair[0]} />
                    <AddItemCard />
                </div>
            )
        } else {
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
}


class ParkingsData extends React.Component {
    // Render data about all user's parkings.

    state =  {
        api_output: ''
    }

    componentDidMount() {
        $.get("/api/user_parkings_data/" + this.props.owner_id + "/",
            function (response) {
                console.log(JSON.stringify(response));
                this.setState ({
                        api_output: response
                    });
            }.bind(this)
        )
    }
/*
    render() {
        if (this.state.api_output[0] == undefined) {
            return (<p>No parkings were added</p>);
        }
        else {
            return (
                <div>
                {this.state.api_output.map((parking, index) => (<p key={index}>{JSON.stringify(parking)}</p>))}
                </div>
            );
        }
    }
*/
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
                    }, []).map(function(pair, index, arr) {

                        if (index == arr.length-1 && this.state.api_output.length % 2 === 0) {
                            return (
                            <div>
                                <ParkingsRow key={index} parkingsPair={pair} />
                                <div className="row">
                                    <AddItemCard />
                                </div>
                            </div>
                            );
                        } else {
                        return (<ParkingsRow key={index} parkingsPair={pair} />)
                        }
                    }.bind(this))
                }
                </div>
            );
        }
    }

};

class AddItemCard extends React.Component {
    // Render Add item card with button.
    render () {
        return (
            <div className="my-card col-md-5">
                <button type="button"
                className="btn-lg btn-default btn-circle">
                +
                </button>
            </div>
        )
    }
}


class Profile extends React.Component {
    // Render components with user's data, bikes, places and parkings.
    render() {
        this.user_id = this.props.params['user_id'];
        return (
            <div id="profile-container" className="container" >


            <UserData user_id={this.user_id}/>

            <h4>My bikes</h4>
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
