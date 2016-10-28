import React from 'react';

export class MarkerDetails extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			marker_type: this.props.location.query.type,
			marker_id: this.props.params.id
		};
	}

	componentDidMount() {
		let data = [this.state.marker_type, this.state.marker_id];
		$.ajax({
            type: 'POST',
            url: 'api/marker_details',
            data: data,
            dataType: "json",
            success: function(response){
            	console.log("I where on server!");
            }
        });
	}

	render() {
		console.log(this.props);
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
