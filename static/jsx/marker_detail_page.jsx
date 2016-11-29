import React from 'react';

import { browserHistory } from 'react-router';
import { BaseInput } from './input/base_input.jsx'


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
			full_street: "",
			name_change: "",
			number_change: 0,
			desc_change: "",
			from_hour_select: 0,
			to_hour_select: 0,
			is_free_select: 0,
			is_secure_select: 0,
			hoursList: [...Array(24).keys()],
		};
		this.ajaxSuccess = this.ajaxSuccess.bind(this);
		this.streetAjaxSuccess = this.streetAjaxSuccess.bind(this);
		this.changeValue = this.changeValue.bind(this);
		this.confirmEdit = this.confirmEdit.bind(this);
		this.ajaxEditSuccess = this.ajaxEditSuccess.bind(this);
	}

	markerData(){
		if (!localStorage['token']) {
            browserHistory.push("/login");
        }
        else
        {
        	$.ajax({
				type: 'GET',
      			url: '/api/marker_details',
      			dataType: "json",
      			data: {type: this.state.marker_type, id: this.state.marker_id},
      			success: this.ajaxSuccess
			});
        }
	}

	componentWillMount() {
		/*
		 * Cheks if localStorage doesn't have token
		 * and redirect to login page
		 */
        this.markerData();
    }

	streetAjaxSuccess(response){
		/*
	 	 * Method, that is used in case of openstreetmap
	 	 * ajax success. Set state value of 'street' as
	 	 * address of marker
	 	 */
		this.setState({
			street: response.display_name,
			full_street: response.address,
			name_change: this.state.marker_value.name,
			number_change: this.state.marker_value.amount,
			desc_change: this.state.marker_value.description,
			from_hour_select: this.state.marker_value.from_hour,
			to_hour_select: this.state.marker_value.to_hour,
			is_free_select: this.state.marker_value.is_free ? 1 : 0,
			is_secure_select: parseInt(this.state.marker_value.security)
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
		if(response.error){
			this.setState({
				error: true
			});
		}
		else{
			let parsedData = JSON.parse(response.marker_details);
			this.setState({
				marker_value: parsedData[0].fields
			});
			$.ajax({
					type: 'GET',
    				url: 'http://nominatim.openstreetmap.org/reverse?format=json&lat=' + this.state.marker_value.lat 
    				+ '&lon=' + this.state.marker_value.lng + '&addressdetails=1&accept-language=en',
    				success: this.streetAjaxSuccess
			});
		}
	}

	changeValue(event) {
       let state = [];
       state[event.target.name] = event.target.value;
       this.setState(state);
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
					<p>{this.state.marker_value.is_free ? "This parking is free" : "This parking isn't free"}</p>
				</div>
			)
		}
	}

	renderLocationCondition(){
		if(this.state.full_street.house_number && this.state.full_street.road){
			return [this.state.full_street.house_number, this.state.full_street.road].join(', ');
		}
		else if(!this.state.full_street.house_number){
			return this.state.full_street.road;
		}
		else if(!this.state.full_street.road){
			return "Can't display";
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

	descriptionEditCondition(){
			if(this.state.marker_type !== "Parking"){
				return (
					<div className="control-group reg-log edit-div">
          				<div className="controls">
						    <label className="edit-label">Edit description</label>
              				<span className="material-icons input-icons desc-icon">content_paste</span>
              				<textarea className="edit-input" rows="2" type="text" name="desc_change" placeholder="Edit description of the marker"
              				className="input-xlarge edit-input" value={this.state.desc_change} onChange={this.changeValue}></textarea>
          				</div>
      				</div>
				);
			}
		}

	infoEditCondition(){
		if(this.state.marker_type === "Place"){
			return (
				<div className="select-div">
					<div className="edit-div">
						<label className="edit-label">Edit works to...</label>
						<span className="material-icons input-icons">hourglass_empty</span>
						<select className="edit-input" name="from_hour_select" onChange={this.changeValue}
						value={this.state.from_hour_select}>
                    		{this.state.hoursList.map((hour)=>(<option key={hour} value={hour}>{hour}</option>))}
                    	</select>
					</div>

					<div className="edit-div">
						<label className="edit-label">Edit works to...</label>
						<span className="material-icons input-icons">hourglass_full</span>
						<select className="edit-input" name="to_hour_select" onChange={this.changeValue}
						value={this.state.to_hour_select}>
                    		{this.state.hoursList.map((hour)=>(<option key={hour} value={hour}>{hour}</option>))}
                    	</select>
					</div>
				</div>
			);
		}
		else if(this.state.marker_type === "Parking"){
			return (
				<div className="select-div">
					<div className="edit-div">
						<label className="edit-label">Edit cost</label>
						<span className="material-icons input-icons">attach_money</span>
						<select name="is_free_select" onChange={this.changeValue}
						value={this.state.is_free_select} className="edit-input"> 
                    		<option value="0">not free</option>
                            <option value="1">free</option>
                    	</select>
					</div>

					<div className="edit-div">
						<label className="edit-label">Edit security</label>
						<span className="material-icons input-icons">security</span>
						<select name="is_secure_select" onChange={this.changeValue}
						value={this.state.is_secure_select} className="edit-input">
                    		<option value="0">no</option>
                            <option value="1">yes</option>
                    	</select>
					</div>
					<div className="control-group reg-log edit-div">
          			    <div className="controls">
						  <label className="edit-label">Edit number of places</label>
              				<span className="material-icons input-icons">directions_bike</span>
              				<input type="number" name="number_change" placeholder="Edit amount of parking places"
              				className="input-xlarge edit-input" value={this.state.number_change} onChange={this.changeValue}/>
          				</div>
      				</div>
				</div>
			);
		}
	}

	ajaxEditSuccess(response){
		if(response["Success"]){
			this.markerData();
		}
		else if(response["Error"]){
			console.log("Error occured...");
		}
	}

	confirmEdit(event){
		event.preventDefault;
		let data;
		if(this.state.marker_type === "Parking"){
			data = {
				type: "Parking",
				id: this.state.marker_id,
				name: this.state.name_change,
				amount: this.state.number_change,
				security: this.state.is_secure_select,
				is_free: this.state.is_free_select
			}
		}
		else if(this.state.marker_type === "Place"){
			data = {
				type: "Place",
				id: this.state.marker_id,
				name: this.state.name_change,
				description: this.state.desc_change,
				from_hour: this.state.from_hour_select,
				to_hour: this.state.to_hour_select
			}
		}
		$.ajax({
           	type: 'POST',
           	url: '/api/edit_marker_details',
           	dataType: "json",
           	data: data,
           	success: this.ajaxEditSuccess
        });
	}
	
	renderEdit()
	{
		if(this.state.marker_value.owner == localStorage['id']){
			return (
				<div>
					<div className="marker-edit-button" data-toggle="modal" data-target="#myModal"><span>Edit marker</span></div>
					{/*<button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>*/}

					{/* Need to togle class name and/or toggle style display: none */}
					<div id="myModal" className="modal fade" role="dialog">
					  <div className="modal-dialog">
				  
					    <div className="modal-content">
					      <div className="modal-header">
					          <button type="button" className="close" data-dismiss="modal">&times;</button>
					          <h4 className="modal-title">Edit marker</h4>
					      </div>
					      <div className="modal-body">
							  <div className="control-group reg-log edit-div">
          					      <div className="controls">
									  <label className="edit-label">Edit marker name</label>
              				          <span className="material-icons input-icons">account_circle</span>
              				          <input type="text" name="name_change" placeholder="Edit your name"
              				          className="input-xlarge edit-input" value={this.state.name_change} onChange={this.changeValue}/>
          				          </div>
      				          </div>
						      { this.descriptionEditCondition() }
							  { this.infoEditCondition() }
						  </div>
				         <div className="modal-footer">
						 	  <div name="cancel" type="submit" className="btn" id="edit-modal-button" className="edit-close" onClick={this.submitEdit} data-dismiss="modal"><span>Cancel</span></div>
							  <div name="revert" type="submit" className="btn" id="edit-modal-button" className="edit-revert" onClick={this.submitEdit} data-dismiss="modal"><span>Revert</span></div>
							  <div name="confirm" type="submit" className="btn" id="edit-modal-button" className="edit-confirm" onClick={this.confirmEdit} data-dismiss="modal"><span>Confirm</span></div>
				         </div>
				    </div>
				
				  </div>
				</div>
				</div>
			);
		}
	}

	render() {
		//Render method of marker details component
		if(!this.state.error) {
			return (
				<div className="container-fluid marker-details-content">
					<div className="row">
						<div className="col-xs-12 photo-container">
							<h1 className="photo-header">{this.state.marker_value.name}</h1>
							{ this.renderEdit() }
						</div>
					</div>
					<div className="row">
						{ this.renderDetails() }
						<div className="col-xs-12 col-md-6 col-lg-6">
							<div className="card location">
								<h3 className="detail-cards-header">Location</h3>
								<p className="address">
									<span id="location-icon" className="material-icons">place</span>
									<span className="location-text">
									{ this.renderLocationCondition() }
									</span>
								</p>
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
		else {
			return ( 
				<h2 className="reg-log-header">Such marker doesn't' exist</h2>
			);
		}
	}
}
