import React from 'react';


export class FormPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }; 
  }

  render() {
    return (
      <p className="triangle-border">{this.state.value}</p>
    );
  }
}
