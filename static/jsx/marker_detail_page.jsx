import React from 'react';


export class MarkerDetails extends React.Component {
	/*
 	 * Component of marker detail page, that shows
 	 * default photo, location, description and special 
 	 * info, that depends on marker type
 	 */
	constructor(props){
		super(props);
		this.state = {
			marker_type: this.props.location.query.type,
			marker_id: this.props.params.id,
			marker_value: "",
			street: ""
		};
		this.ajaxSuccess = this.ajaxSuccess.bind(this);
		this.streetAjaxSuccess = this.streetAjaxSuccess.bind(this);
	}

	streetAjaxSuccess(response){
		/*
	 	 * Method, that is used in case of openstreetmap
	 	 * ajax success. Set state value of 'street' as
	 	 * address of marker
	 	 */
		this.setState({
			street: response.display_name
		});
	}

	ajaxSuccess(response) {
		/*
	     * Method, that is used in case of marker details
	     * ajax success. 'Set state of marker_value' as
	     * marker details info from database.
	     * Also make ajax response for openstreetmap
	     * api and get address by lat lan
	     */
		let parsedData = JSON.parse(response.marker_details);
		this.setState({
			marker_value: parsedData[0].fields
		});
		$.ajax({
				type: 'GET',
    			url: 'http://nominatim.openstreetmap.org/reverse?format=json&lat=' + this.state.marker_value.lat + '&lon=' + this.state.marker_value.lng + '&addressdetails=1',
    			success: this.streetAjaxSuccess
		});
	}

	componentDidMount() {
		/*
		 * When component is mounted, make ajax response
		 * to server and get marker details that depends
		 * on marker type and id
		 */
		$.ajax({
			type: 'GET',
      		url: '/api/marker_details',
      		dataType: "json",
      		data: {type: this.state.marker_type, id: this.state.marker_id},
      		success: this.ajaxSuccess
		});
	}

	renderPlaceCondition(){
		//Checks marker type and return jsx of info card in case of 'Place' type
		if(this.state.marker_type === "Place"){
			return(
				<div className="card info">
					<h3 className="detail-cards-header">Info</h3>
					<p>Works from {this.state.marker_value.from_hour} to {this.state.marker_value.to_hour}</p>
				</div>
			)
		}
	}

	renderBikeCondition(){
		//Checks marker type and return jsx of info card in case of 'StolenBike' type
		if(this.state.marker_type === "StolenBike"){
			return(
				<div className="card info">
					<h3 className="detail-cards-header">Info</h3>
					<p>This bike was stolen at {this.state.marker_value.day}</p>
					<p>{this.state.marker_value.is_found ? "This bike was already found" : "This bike still lost"}</p>
				</div>
			)
		}
	}

	renderParkingCondition(){
		//Checks marker type and return jsx of info card in case of 'Parking' type
		if(this.state.marker_type === "Parking"){
			return(
				<div className="card info">
					<h3 className="detail-cards-header">Info</h3>
					<p>Amount of this parking is {this.state.marker_value.amount}</p>
					<p>{parseInt(this.state.marker_value.security) ? "This parking is secure" : "This parking isn't secure"}</p>
				</div>
			)
		}
	}

	renderDetails(){
		//Checks marker type and return jsx of details type is not 'Parking'
		if(this.state.marker_type !== "Parking"){
			return (
				<div className="col-xs-12 col-md-6 col-lg-6">
					<div className="card details">
						<h3 className="detail-cards-header">Description</h3>
						<p>{this.state.marker_value.description}</p>
					</div>
				</div>
			);
		}	
	}

	render() {
		//Render method of component
		console.log(this.state.street.split(','));
		return (
			<div className="container-fluid marker-details-content">
				<div className="row">
					<div className="col-xs-12 photo-container">
						<h1 className="photo-header">{this.state.marker_value.name}</h1>
					</div>
				</div>
				<div className="row">
					{ this.renderDetails() }
					<div className="col-xs-12 col-md-6 col-lg-6">
						<div className="card location">
							<h3 className="detail-cards-header">Location</h3>
							<p className="address"><span id="location-icon" className="material-icons">place</span>{this.state.street.split(',', 4).join(',')}</p>
						</div>
					</div>
					<div className="col-xs-12 col-md-6 col-lg-6">
							{ this.renderPlaceCondition() }
							{ this.renderBikeCondition() }
							{ this.renderParkingCondition() }
					</div>
				</div>
			</div>
		);
	}
}
