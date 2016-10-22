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
      <p style={this.props.styleProp} className="triangle-border">{this.state.value}</p>
    );
  }
}
