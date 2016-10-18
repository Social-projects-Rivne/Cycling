import React from 'react';

import {EmailInput} from './input/email_input.jsx';
import {PasswordInput} from './input/password_input.jsx';
import {FullNameInput} from './input/full_name_input.jsx';
import {Validator} from './validator.jsx';

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.ajaxSuccess = this.ajaxSuccess.bind(this);
        this.submitAll = this.submitAll.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.validator = new Validator();
    }

    changeName(event) {
        this.setState({name: event.target.value});
    }

    changeEmail(event) {
        this.setState({email: event.target.value});
    }

    changePassword(event) {
        this.setState({password: event.target.value});
    }

    changePassConfirm(event) {
        this.setState({password_confirm: event.target.value});
    }

    /*clearForm() {
      this.setState({
        name: '',
        email: '',
        password: '',
        password_confirm: ''

      });
    }*/

    ajaxSuccess(response) {
        if(response['EmailError'] === 1){
            this.setState({
                email_exist: false
            });
        }
        else if(response['Success'] === 1){
            //this.clearForm();
            console.log(response);
        }
    }

    submitAll(event) {
        event.preventDefault();
        let ajaxSuccess=this.ajaxSuccess;        
        let self;
        self = this;
        let valid_name = this.validator.validateName(this.name);
        let valid_pass = this.validator.validatePassword(this.password);
        let valid_email = this.validator.validateEmail(this.email);
        let valid_confirm_password = (this.password === this.password_confirm);

        if (!valid_name || !valid_email || !valid_pass || !valid_confirm_password){
          this.setState({
            name_error: !valid_name,
            email_error: !valid_email,
            password_error: !valid_pass,
            password_confirm_error: !valid_confirm_password
          });
          return;
        }

        let data = {
            full_name: this.name,
            email: this.email,
            password: this.password
        }

        $.ajax({
            type: 'POST',
            url: 'api/v1/registration',
            dataType: "json",
            data: data,
            success: ajaxSuccess
        });
    }

    render() {
        return (
        <form onSubmit={this.submit} className="form-horizontal registration-form">
            <fieldset>
                <div className="header-div">
                    <h2 className="register-header">{this.state.registration_process}</h2>
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
}

class UserName extends React.Component {
    constructor(props){
    super(props);
    this.state = {};
    this.changeColor = this.changeColor.bind(this);
    }

    changeColor() {
        if(this.props.iconProp === true){
            return {
                color: '#106CC8'
            }
        }
        else{
            return {
                color: '#E04B39'
            }
        }
    }

    render() {
        return(
        <div className="control-group">
            <div className="controls">
                <span style={this.changeColor()} className="material-icons input-icons">person_outline</span>
                <input placeholder="Fullname" type="text" id="fullname" name="full_name"
                 className="input-xlarge value-input" onChange={this.props.valChange} value={this.props.val}/>
                 <p style={{color: '#E04B39'}}>{this.props.error_message}</p>
            </div>
        </div>
        );
    }
}

class PassConfirm extends React.Component {
    constructor(props) {
    super(props);
    this.state = {};
    this.changeColor = this.changeColor.bind(this);
    }

    changeColor() {
        if(this.props.iconProp){
            return {
                color: '#106CC8'
            }
        }
        else{
            return {
                color: '#E04B39'
            }
        }
    }

    render() {
        return (
        <div className="control-group">
            <div className="controls">
                <span style={this.changeColor()} className="material-icons input-icons">lock_outline</span>
                <input placeholder="Re-type password" type="password" id="password_confirm"
                name="password_confirm" className="input-xlarge value-input"
                onChange={this.props.valChange} value= {this.props.val}/>
            </div>
        </div>
        );
    }
}

export {FormComponent};
