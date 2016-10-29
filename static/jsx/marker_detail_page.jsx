import React from 'react';

export class MarkerDetails extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		};
	}

	componentWillMount() {
		$.ajax({
            type: 'GET',
            url: 'api/marker_details',
            success: function(response){}
        });
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
