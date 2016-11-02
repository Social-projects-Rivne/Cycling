import React from 'react';

export class MarkerDetails extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			marker_type: this.props.location.query.type,
			marker_id: this.props.params.id,
			marker_value: {name: "Name", description: "..."}
		};
		this.ajaxSuccess = this.ajaxSuccess.bind(this);
	}

	ajaxSuccess(response) {
		let parsedData = JSON.parse(response.marker_details);
		this.setState({
			marker_value: parsedData[0].fields
		});
	}

	componentDidMount() {
		$.ajax({
			type: 'GET',
      		url: '/api/marker_details',
      		dataType: "json",
      		data: {type: this.state.marker_type, id: this.state.marker_id},
      		success: this.ajaxSuccess
		});
	}

	render() {
		console.log(this.state.marker_value);
		return (
			<div className="container-fluid marker-details-content">
				<div className="row">
					<div className="col-xs-12 photo-container">
						<h1 className="photo-header">{this.state.marker_value.name}</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-md-6 col-lg-6">
						<div className="card details">
							<h3 className="detail-cards-header">Description</h3>
							<p>{this.state.marker_value.description}</p>
						</div>
					</div>
					<div className="col-xs-12 col-md-6 col-lg-6">
						<div className="card location">
							<h3 className="detail-cards-header">Location</h3>
							<span className="material-icons">place</span>
							<span>location...</span>
						</div>
					</div>
					<div className="col-xs-12 col-md-6 col-lg-6">
						<div className="card info">
							<h3 className="detail-cards-header">Info</h3>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
