import React from 'react';

import { BaseInput } from './base_input.jsx';

class PasswordInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    return (
      <BaseInput placeholder="password" type="password" id={this.props.id} name={this.props.name} icon="lock_outline"
       value={this.state.value} father={this.props.father} error={this.props.error}/>
    );
  }
}

export { PasswordInput };
