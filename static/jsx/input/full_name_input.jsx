import React from 'react';

import { BaseInput } from './base_input.jsx';


export class FullNameInput extends BaseInput {

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    return (
      <BaseInput placeholder="full name" type="text" id={this.props.id} name={this.props.name} icon="person_outline"
       value={this.state.value} father={this.props.father} error={this.props.error}/>
    );
  }
}
