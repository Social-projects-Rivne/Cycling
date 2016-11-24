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
			hoursList: [...Array(24).keys()],
		};
		this.ajaxSuccess = this.ajaxSuccess.bind(this);
		this.streetAjaxSuccess = this.streetAjaxSuccess.bind(this);
		this.changeValue = this.changeValue.bind(this);
	}

	componentWillMount() {
		/*
		 * Cheks if localStorage doesn't have token
		 * and redirect to login page
		 */
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

	streetAjaxSuccess(response){
		/*
	 	 * Method, that is used in case of openstreetmap
	 	 * ajax success. Set state value of 'street' as
	 	 * address of marker
	 	 */
		this.setState({
			street: response.display_name,
			full_street: response.address,
			selectOne: this.state.marker_value.from_hour,
			selectTwo: this.state.marker_value.to_hour
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
					<BaseInput style="width: 70% !important" name="desc_change" valChange={this.changeValue} 
				    icon="content_paste" value={this.state.name_change} placeholder="Edit description of the marker">
					</BaseInput>
				);
			}
		}
	
	handleSelect(event){
		this.setState({
			select1: event.target.value
		});
	}

	infoEditCondition(){
		if(this.state.marker_type === "Place"){
			return (
				<div className="select-div">
					<div>
						<span className="material-icons input-icons">hourglass_empty</span>
						<select name="selectOne" onChange={this.changeValue}
						value={this.state.selectOne} id="hour-select">
                    	    <option>--</option>
                    		{this.state.hoursList.map((hour)=>(<option key={hour} value={hour}>{hour}</option>))}
                    	</select>
					</div>

					<div>
						<span className="material-icons input-icons">hourglass_full</span>
						<select name="selectTwo" onChange={this.changeValue}
						value={this.state.selectTwo} id="hour-select">
                    	    <option>--</option>
                    		{this.state.hoursList.map((hour)=>(<option key={hour} value={hour}>{hour}</option>))}
                    	</select>
					</div>
				</div>
			);
		}
		else if(this.state.marker_type === "Parking"){
			return (
				<div className="select-div">
					<div>
					<span className="material-icons input-icons">hourglass_empty</span>
						<select name="parkingSelectOne" onChange={this.changeValue}
						value={this.state.parkingSelectOne} id="hour-select"> 
                    	    <option>--</option>
                    		<option value="0">not free</option>
                            <option value="1">free</option>
                    	</select>
					</div>

					<div>
						<span className="material-icons input-icons">hourglass_empty</span>
						<select name="parkingSelectTwo" onChange={this.changeValue}
						value={this.state.parkingSelectTwo} id="hour-select">
                    	    <option>--</option>
                    		<option value="0">no</option>
                            <option value="1">good</option>
                            <option value="2">high</option>
                    	</select>
					</div>
				</div>
			);
		}
	}
	

	renderEdit()
	{
		if(this.state.marker_value.owner == localStorage['id']){
			return (
				<div>
					<div className="marker-edit-button" data-toggle="modal" data-target="#myModal"><span>Edit marker</span></div>
					{/*<button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>*/}

					<div id="myModal" className="modal fade" role="dialog">
					  <div className="modal-dialog">
				  
					    <div className="modal-content">
					      <div className="modal-header">
					          <button type="button" className="close" data-dismiss="modal">&times;</button>
					          <h4 className="modal-title">Edit marker</h4>
					      </div>
					      <div className="modal-body">
					      	  <BaseInput name="name_change" valChange={this.changeValue} 
							   icon="account_circle" value={this.state.name_change} placeholder="Edit your name">
							  </BaseInput>
						      { this.descriptionEditCondition() }
							  { this.infoEditCondition() }
						  </div>
				         <div className="modal-footer">
				        	  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
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
		console.log(this.state.marker_value);
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
