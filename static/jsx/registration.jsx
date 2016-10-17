import React from 'react';

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error_message_name: "",
            error_message_email: "",
            error_message_pass: "",
            registration_process: "Registration",
            icon_color_name: true,
            icon_color_email: true,
            icon_color_password: true
        };
        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePassConfirm = this.changePassConfirm.bind(this);
        this.submitAll = this.submitAll.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.showErrors = this.showErrors.bind(this);
        this.ajaxSuccess = this.ajaxSuccess.bind(this);
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

    clearForm() {
      this.setState({
        name: '',
        email: '',
        password: '',
        password_confirm: ''
        
      });
    }

    validateName(full_name) {    
        var re = /^(?:[\u00c0-\u01ffa-zA-Z'-]){2,}(?:\s[\u00c0-\u01ffa-zA-Z'-]{2,})+$/i;
        return re.test(full_name);
    }

    validateEmail(email) {
        var re = /[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$/;
        return re.test(email);
    };

    showErrors(name, email) {
        if(name === false) {
            this.setState({
                icon_color_name: false
            });
        }
        else{
            this.setState({
                icon_color_name: true
            });
        }

        if(email === false) {
            this.setState({
                icon_color_email: false
            });
        }
        else{
            this.setState({
                icon_color_email: true
            });
        }

        if((this.state.password === this.state.password_confirm) && (this.state.password)) {
            this.setState({
                icon_color_password: true
            });
        }
        else{
            this.setState({
                icon_color_password: false
            });
        }
    }

    ajaxSuccess(response) {
        if(response["NameError"] === 1){
            this.setState({
                error_message_name: "Such full name already exists!"
            });
        }
        else{
            this.setState({
                error_message_name: ""
            });
        };
        if(response["EmailError"] === 1){
            this.setState({
                error_message_email: "Such email already exists!"
            });
        }
        else{
            this.setState({
                error_message_email: ""
            });
        };
        if(response["PassError"] === 1){
            this.setState({
                error_message_pass: "Such password already exists!"
            });
        }
        else{
            this.setState({
                error_message_pass: ""
            });
        };
        if(response["Success"] === 1) {
            this.setState({
                registration_process: "Congratulations! You have been successfully registrated."
            });
        }
    }

    submitAll(event){
        var self;
        var ajaxSuccess=this.ajaxSuccess;
        event.preventDefault();
        if ((this.state.password === this.state.password_confirm) 
            && this.validateName(this.state.name) && this.validateEmail(this.state.email)) {
            self = this;
            var data = {
                full_name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }
            $.ajax({
                type: 'POST',
                url: 'v1/registration',
                dataType: "json",
                data: data,
                success: ajaxSuccess
            });
        }
        this.showErrors(this.validateName(this.state.name), this.validateEmail(this.state.email));
    }

    render() {
        return (
        <form onSubmit={this.submit} className="form-horizontal registration-form">
            <fieldset>
                <div className="header-div">
                    <h2 className="register-header">{this.state.registration_process}</h2>
                </div>
                <UserName error_message={this.state.error_message_name} iconProp={this.state.icon_color_name} valChange={this.changeName}
                 val={this.state.name} className={this.state.name_error}/>
                <Email error_message={this.state.error_message_email} iconProp={this.state.icon_color_email} valChange={this.changeEmail} val={this.state.email}/>
                <Pass error_message={this.state.error_message_pass} iconProp={this.state.icon_color_password} valChange={this.changePassword} val={this.state.password}/>
                <PassConfirm iconProp={this.state.icon_color_password} valChange={this.changePassConfirm} val={this.state.password_confirm}/>

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


class Email extends React.Component {
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
                <span style={this.changeColor()} className="material-icons input-icons">email</span>
                <input placeholder="Email" type="text" id="email" name="email" 
                className="input-xlarge value-input " onChange={this.props.valChange} value={this.props.val}/>
                <p style={{color: '#E04B39'}}>{this.props.error_message}</p>
            </div>
        </div>
        );
    }
}

class Pass extends React.Component {
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
                <input placeholder="Password" type="password" id="password" name="password" 
                className="input-xlarge value-input" 
                onChange={this.props.valChange} value= {this.props.val}/>
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