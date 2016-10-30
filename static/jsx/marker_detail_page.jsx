import React from 'react';

export class MarkerDetails extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.setState({
				marker_type: this.props.location.query.type,
				marker_id: this.props.params.id
		});
		$.get(
    	{
      		url: 'api/marker_details',
      		data: {type: this.state.marker_type, id: this.state.marker_id}
    	},
    	function (response) {
      		alert(response);
    	}.bind(this));
	}

	render() {
		return (
			<div className="marker-details-content">
				<div className="photo-container">
					<h1 className="photo-header">Name</h1>
				</div>
				<div className="card details">
					<h3 className="detail-cards-header">Description</h3>
				</div>
				<div className="card location">
					<h3 className="detail-cards-header">Location</h3>
				</div>
				<div className="card info">
					<h3 className="detail-cards-header">Info</h3>
				</div>
			</div>
		);
	}
}
