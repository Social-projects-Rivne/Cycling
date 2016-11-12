import React from 'react';

import { Link, browserHistory } from 'react-router';

import { EmailInput } from './input/email_input.jsx';
import { PasswordInput } from './input/password_input.jsx';
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
        console.log("CLICK");
        let valid_pass = this.validator.validatePassword(this.password);
        let valid_email = this.validator.validateEmail(this.email);
        console.log(valid_pass + " " + valid_email);

        // if one of params is false, than we can`t accept input...
        // prepare new state
        if (!valid_pass || !valid_email){
          console.log(valid_email + " " + valid_pass);
          this.setState({
            email_error: !valid_email,
            password_error: !valid_pass
          });
        }


        let data = {
          email: this.email,
          password: this.password
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
                  <div className="header-div">
                      <h2 className="register-header">Login</h2>
                  </div>
                  {this.getErrorLabel()}
                  <EmailInput value={this.email} name="email" id="email-input-field" father={this} error={this.state.email_error}/>
                  <PasswordInput value={this.password} name="password" id="password-input-field" father={this} error={this.state.password_error}/>
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
