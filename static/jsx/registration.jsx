import React from 'react';

import {EmailInput} from './input/email_input.jsx';
import {PasswordInput} from './input/password_input.jsx';
import {FullNameInput} from './input/full_name_input.jsx';
import {Validator} from './validator.jsx';

class RegistrationComponent extends React.Component {
    /*
     * React component of registration form
     * that use our reusable inputs. When submit
     * button is pressed, it validate credentials
     * and in case of error make icons red or in case of success
     * send requst to server by ajax and registrate user,
     * or make red icon, if something is wrong on server
     */
    constructor(props) {
        super(props);
        this.state = {
            registration_process: "Registration",
            isRegistrated: false
        };
        this.ajaxSuccess = this.ajaxSuccess.bind(this);
        this.submitAll = this.submitAll.bind(this);
        this.validator = new Validator();
    }

    ajaxSuccess(response) {
        /*
         * In case of error from server show it to user,
         * in case of success change form header
         */
        this.setState({
            password_confirm_error: false,
            password_error: false
        });
        if(response['EmailError'] === 1){
            this.setState({
                email_error: true
            });
            console.log(response);
        }
        else if(response['Success'] === 1){
            this.setState({
                isRegistrated: true
            });
        }
    }

    submitAll(event) {
        /* 
         * When submit button is ckliked it validate
         * input values and send to server in case of success.
         * If something is wrong, it show it to user
         */
        event.preventDefault();
        let ajaxSuccess=this.ajaxSuccess;        
        let self;
        self = this;
        let valid_name = this.validator.validateName(this.name);
        let valid_pass = this.validator.validatePassword(this.password);
        let valid_email = this.validator.validateEmail(this.email);
        let valid_confirm_password = (this.password === this.password_confirm);

        //Validate input values.
        if (!valid_name || !valid_email || !valid_pass || !valid_confirm_password){
          this.setState({
            name_error: !valid_name,
            email_error: !valid_email,
            password_error: !valid_pass,
            password_confirm_error: !valid_confirm_password
          });
          return;
        }

        //Prepare data for sending to server.
        let data = {
            full_name: this.name,
            email: this.email,
            password: this.password
        }

        //In case of success validation, send data to server
        $.ajax({
            type: 'POST',
            url: 'api/v1/registration',
            dataType: "json",
            data: data,
            success: ajaxSuccess
        });
    }

    render() {
        //Render form component
        if(this.state.isRegistrated === false) {
        return (
        <form onSubmit={this.submit} className="form-horizontal registration-form">
            <fieldset>
                <div className="header-div">
                    <h2>Registration</h2>
                </div>
                <FullNameInput value={this.name} name="name" id="name-input-field" father={this} error={this.state.name_error}/>
                <EmailInput value={this.email} name="email" id="email-input-field" father={this} error={this.state.email_error}/>
                <PasswordInput value={this.password} name="password" id="password-input-field" father={this} error={this.state.password_error}/>                
                <PasswordInput value={this.password_confirm} name="password_confirm" id="password-confirm-input-field" father={this} error={this.state.password_confirm_error}/>
                <div className="control-group">
                    <div className="controls">
                        <button type="submit" className="btn btn-success register-button" onClick={this.submitAll}>Register</button>
                    </div>
                </div>
            </fieldset>
        </form>
        );
        }
        else{
            return (
                <div className="header-div registrated">
                    <h2>You have been successfully registrated!</h2>
                </div>
            );
        }
    }
}

export {RegistrationComponent};
