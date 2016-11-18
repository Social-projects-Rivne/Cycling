import React from 'react';

import { browserHistory } from 'react-router';
import { BaseInput } from './input/base_input.jsx'
import { Validator } from './validator.jsx';


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
            isRegistrated: false,
            modal_text: ""
        };
        this.ajaxSuccess = this.ajaxSuccess.bind(this);
        this.submitAll = this.submitAll.bind(this);
        this.validator = new Validator();
        this.changeValue = this.changeValue.bind(this);
    }

    componentWillMount() {
        /*
         * Cheks if localStorage have a token
         * and redirect to main page
         */
        if (localStorage['token']) {
          $.get(
          {
            url: '/api/tokenvalid',
            data: {token: localStorage['token']}
          },
          function (data) {

            if (data["result"] === "ok")
              browserHistory.push("/");
          });
        }
    }

    changeValue(event) {
       let state = [];
       state[event.target.name] = event.target.value;
       this.setState(state);
    }

    ajaxSuccess(response) {
        /*
         * In case of error from server show it to user,
         * in case of success change form header
         */
        this.setState({
            password_confirm_error: false,
            password_error: false,
            name_error: false,
        });
        if(response['EmailError']){
            this.setState({
                email_error: true
            });
        }
        else if(response['Success']){
            browserHistory.push('/login');
        }
        else if(response['RulesError']){
            this.setState({
                modal_text: "Validation error occured on server..."
            })
        }
        else{
            this.setState({
                modal_text: "Unknown error occured...reload"
            })
        }
    }

    submitAll(event) {
        /* 
         * When submit button is ckliked it validate
         * input values and send to server in case of success.
         * If something is wrong, it show it to user
         */
        event.preventDefault();
        let valid_name = this.validator.validateName(this.state.name);
        let valid_pass = this.validator.validatePassword(this.state.password);
        let valid_email = this.validator.validateEmail(this.state.email);
        let valid_confirm_password = (this.state.password === this.state.password_confirm);

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
            full_name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        //In case of success validation, send data to server
        $.ajax({
            type: 'POST',
            url: '/api/registration',
            dataType: "json",
            data: data,
            success: this.ajaxSuccess
        });
    }

    showServerError(){
        if(this.state.modal_text)
        {
            return (
                <h2 className="reg-log-header">{this.state.modal_text}</h2>
            );
        }
    }

    render() {
        //Render form component, in case of successful registration route to login page
        if(!this.state.isRegistrated && !this.state.modal_text) {
        return (
            <form className="form-horizontal registration-form">
                <fieldset>
                    <h2 className="reg-log-header">Registration</h2>

                    <BaseInput value={this.state.name} name="name" placeholder="full name" icon="person_outline"
                    type="text" id="name-input-field" valChange={this.changeValue} error={this.state.name_error}/>
                    <p className="form-tip">Only letters(first letters - uppercase),
                     dash and apostrophe are allowed</p>

                    <BaseInput value={this.state.email} name="email" placeholder="email" icon="email" type="email"
                    id="email-input-field" valChange={this.changeValue} error={this.state.email_error}/>
                    <p className="form-tip">Standart email style, for example - youremail@gmail.com</p>

                    <BaseInput value={this.state.password} name="password" placeholder="password" icon="lock_outline" type="password"
                    id="password-input-field" valChange={this.changeValue} error={this.state.password_error}/>
                    <p className="form-tip">Length more that 8, can contain letters, numbers, dot and '_'</p>

                    <BaseInput value={this.state.password_confirm} name="password_confirm" placeholder="re-type password"
                    icon="lock_outline" type="password" id="password-confirm-input-field" valChange={this.changeValue} 
                    error={this.state.password_confirm_error}/>
                    <p className="form-tip">Length more that 8, can contain letters, numbers, dot and '_'</p>

                    <div className="control-group reg-log">
                        <div className="controls">
                            <button type="submit" className="btn" id="register-button" onClick={this.submitAll}>Register</button>
                        </div>
                    </div>
                </fieldset>
            </form>
            );
        }
        else {
            return(
                <div>
                    { this.showServerError() }
                </div>
            );
        }
    }
}


export {RegistrationComponent};