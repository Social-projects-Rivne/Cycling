import React from 'react';

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

    login(event){
        event.preventDefault();
        let valid_pass = this.validator.validatePassword(this.password);
        let valid_email = this.validator.validateEmail(this.email);

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


        $.ajax({
                type: 'POST',
                url: 'api/v1/login',
                dataType: "json",
                data: data,
                success: function(response) {

                    console.log(response);
                    if ("error" in response) {
                      console.log(response.error);
                    }
                    else {
                      // save token in local storage
                    }
                }
            });

        // if ((this.state.password === this.state.password_confirm)
        //     && this.validateName(this.state.name) && this.validateEmail(this.state.email)) {
        //     self = this;
        //     var data = {
        //         email: this.email,
        //         password: this.password
        //     }
        //     console.log(data);
        //     $.ajax({
        //         type: 'POST',
        //         url: 'v1/login',
        //         dataType: "json",
        //         data: data,
        //         success: function(response){
        //             console.log(response);
        //         }
        //     });
        // }
        // else {
        //     console.log("Your values are incorrect");
        // }
    }

    render() {
        return (
          <form onSubmit={this.submit} className="form-horizontal registration-form">
              <fieldset>
                  <div className="header-div">
                      <h2 className="register-header">Login</h2>
                  </div>
                  <EmailInput value={this.email} name="email" id="email-input-field" father={this} error={this.state.email_error}/>
                  <PasswordInput value={this.password} name="password" id="password-input-field" father={this} error={this.state.password_error}/>
                  <div className="control-group">
                      <div className="controls">
                          <button type="submit" className="btn btn-success register-button" onClick={this.login}>Login</button>
                      </div>
                  </div>

              </fieldset>
          </form>
        );

    }
}
