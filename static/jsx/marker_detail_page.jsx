import React from 'react';

export class MarkerDetails extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		};
	}
	render() {
		return (
			<div>
				<div className="photo-container">
					<h1 className="photo-header">Name</h1>
				</div>
				<div className="card card-1"></div>
				<div className="card card-1"></div>
				<div className="card card-1"></div>
			</div>
		);
	}
}
