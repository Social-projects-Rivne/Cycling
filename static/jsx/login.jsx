import React from 'react';

import { Link, browserHistory } from 'react-router';

import { BaseInput } from './input/base_input.jsx';
import { Validator } from './validator.jsx';

//this component handle logining...
export class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          email_error: false,
          password_error: false
        };
        this.validator = new Validator();
        this.login = this.login.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    // this part check if user is already logged in...
    // and if it is redirect on home page
    componentWillMount() {
        if (localStorage['token']) {
          $.get(
          {
            url: '/api/tokenvalid',
            data: {token: localStorage['token']}
          },
          function (data) {

            if (data["result"] === "ok")
              browserHistory.push("/");
          }.bind(this));
        }
    }

    login(event){
        event.preventDefault();

        let valid_pass = this.validator.validatePassword(this.state.password);
        let valid_email = this.validator.validateEmail(this.state.email);
        console.log(this.state.email);
        console.log(this.state.password);
        console.log(valid_pass + " " + valid_email);

        // if one of params is false, than we can`t accept input...
        // prepare new state
        if (!valid_pass || !valid_email){
          this.setState({
            email_error: !valid_email,
            password_error: !valid_pass
          });
        }


        let data = {
          email: this.state.email,
          password: this.state.password
        };

        let context = this;
        $.ajax({
                type: 'POST',
                url: 'api/login',
                contentType: 'application/json',
                dataType: "json",
                data: JSON.stringify(data),
                success: function(response) {
                    console.log("Server responsed with: ");
                    console.log(response);
                    if ("error" in response) {
                      if (response.code === 103 || response.code === 104){
                        context.setState({error_message: response.error});
                      }
                    }
                    else {
                      localStorage['token'] = response.token;
                      localStorage['id'] = response.id;
                      browserHistory.push("/");
                    }
                },
                error: function(response) {
                  console.log(response);
                }

            });
    }

    changeValue(event) {
       let state = [];
       state[event.target.name] = event.target.value;
       this.setState(state);
    }

    getErrorLabel() {
      if (this.state.error_message){
        return (
          <center>
            <div className="label label-danger">{this.state.error_message}</div>
          </center>
        );
      }
      else {
        return null;
      }
    }

    render() {
      return (
        <div>
          <form onSubmit={this.submit} className="form-horizontal registration-form">
              <fieldset>
                  <h2 className="reg-log-header">Login</h2>

                  {this.getErrorLabel()}

                  <BaseInput value={this.state.email} name="email" placeholder="full name" icon="email"
                  type="text" id="email-input-field" valChange={this.changeValue} error={this.state.email_error}/>

                  <BaseInput value={this.state.password} name="password" placeholder="password" icon="lock_outline"
                  type="password" id="password-input-field" valChange={this.changeValue} error={this.state.password_error}/>

                  <div className="control-group reg-log">
                      <div className="controls">
                          <button type="submit" className="btn" id="register-button" onClick={this.login}>Login</button>
                      </div>
                  </div>
              </fieldset>
          </form>

        </div>
      );

    }
}
