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
			<div className="marker-details-content">
				<div className="photo-container">
					<h1 className="photo-header">{this.state.marker_value.name}</h1>
				</div>
				<div className="card details">
					<h3 className="detail-cards-header">Description</h3>
					<p>{this.state.marker_value.description}</p>
				</div>
				<div className="card location">
					<h3 className="detail-cards-header">Location<br/></h3>
					<span className="material-icons">place</span>
				</div>
				<div className="card info">
					<h3 className="detail-cards-header">Info</h3>
				</div>
			</div>
		);
	}
}
