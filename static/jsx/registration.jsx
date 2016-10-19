import React from 'react';

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        var re = /[A-Za-z\s_-]+$/;
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

        if(this.state.password === this.state.password_confirm) {
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

    submitAll(event){
        var self;
        event.preventDefault();
        if ((this.state.password === this.state.password_confirm)
            && this.validateName(this.state.name) && this.validateEmail(this.state.email)) {
            self = this;
            var data = {
                full_name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }
            console.log(data);
            $.ajax({
                type: 'POST',
                url: 'api/v1/registration',
                dataType: "json",
                data: data,
                success: function(response){
                    console.log(response);
                }
            });
        }
        else {
            console.log("Your values are incorrect");
        }
        this.showErrors(this.validateName(this.state.name), this.validateEmail(this.state.email));
    }

    render() {
        return (
        <form onSubmit={this.submit} className="form-horizontal registration-form">
            <fieldset>
                <div className="header-div">
                    <h2 className="register-header">Registration</h2>
                </div>
                <UserName iconProp={this.state.icon_color_name} valChange={this.changeName}
                 val={this.state.name} className={this.state.name_error}/>
                <Email iconProp={this.state.icon_color_email} valChange={this.changeEmail} val={this.state.email}/>
                <Pass iconProp={this.state.icon_color_password} valChange={this.changePassword} val={this.state.password}/>
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
