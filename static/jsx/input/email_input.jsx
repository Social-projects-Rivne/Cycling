import React from 'react';

import { BaseInput } from './base_input.jsx';


export class EmailInput extends BaseInput {

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    console.log(this.props.error);
    return (
      <BaseInput placeholder="email" type="text" id={this.props.id} name={this.props.name} icon="email"
       value={this.state.value} father={this.props.father} error={this.props.error}/>
    );
  }
}
