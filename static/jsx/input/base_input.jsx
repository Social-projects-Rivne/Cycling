import React from 'react';


// this input should be used as basic component
// required props:
// name - this prop is name of variable that represents value of input in father
// father - ref to father class which should handle this input value
class BaseInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    // setting up default values
    if ("error" in this.props)
      this.state.error = this.props.error;
    else
      this.state.error = false;

    if ("placeholder" in this.props)
      this.state.placeholder = this.props.placeholder;
    else
      this.state.placeholder = "";

    if ("type" in this.props)
      this.state.type = this.props.type;
    else
      this.state.type = "text";

    if ("value" in this.props)
      this.state.value = this.props.value;
    else
      this.state.value = "";

    this.handleChange = this.handleChange.bind(this);
  }

  getStyle() {
    // this part define style in common
    let styleObj = {

    };
    // this part set specific part depending on state of field
    if (!this.props.error) {
      styleObj.color = '#106CC8';
    }
    else {
      styleObj.color = '#E04B39';
    }

    return styleObj;
  }

  // this method handle input and refresh data to father
  handleChange(e) {
    let value = e.target.value;
    this.props.father[this.props.name] = value;
    this.setState({value: value});
  }

  render() {
    return (
      <div className="control-group">
          <div className="controls">
              <span style={this.getStyle()} className="material-icons input-icons">{this.props.icon}</span>
              <input placeholder={this.state.placeholder} type={this.state.type} id={this.props.id} name={this.props.name}
              className="input-xlarge value-input" value={this.state.value} onChange={this.handleChange}/>
          </div>
      </div>
    );
  }
}

export { BaseInput };
