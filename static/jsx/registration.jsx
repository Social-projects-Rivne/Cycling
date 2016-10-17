import React from 'react';


class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rightStyle: {borderBottom: '1px solid #E04B39 !important'},
            wrongStyle: {borderBottom: '1px solid #20e841 !important'}
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
                name_color: this.state.rightStyle
            });
        }
        else{
            this.setState({
                name_color: this.state.wrongStyle
            });
        }

        if(email === false) {
            this.setState({
                email_color: this.state.rightStyle
            });
        }
        else{
            this.setState({
                email_color: this.state.wrongStyle
            });
        }

        if(this.state.password === this.state.password_confirm) {
            this.setState({
                password_color: this.state.rightStyle
            });
        }
        else{
            this.setState({
                password_color: this.state.wrongStyle
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
                url: 'v1/registration',
                dataType: "json",
                data: data,
                success: function(response){
                    //let responseResult = JSON.parse(response);
                    console.log(response);
                }
            });
            
            this.setState({
                  icon_color: {color: '#20e841'}
            });
            
            /*if(this.responseResult['Success'] === 'true') {
                this.setState({
                    icon_color: {color: '#20e841'}
                });
            }
            else{
                this.setState({
                    icon_color: {color: '#E04B39'}
                }); 
            }*/
        }
        else {
            this.setState({
                icon_color: {color: '#E04B39'}
            });
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
                <UserName styleProp={this.state.name_color} iconProp={this.state.icon_color} valChange={this.changeName}
                 val={this.state.name} className={this.state.name_error}/>
                <Email styleProp={this.state.email_color} iconProp={this.state.icon_color} valChange={this.changeEmail} val={this.state.email}/>
                <Pass  styleProp={this.state.password_color} iconProp={this.state.icon_color} valChange={this.changePassword} val={this.state.password}/>
                <PassConfirm styleProp={this.state.password_color} iconProp={this.state.icon_color} valChange={this.changePassConfirm} val={this.state.password_confirm}/>

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
    }

    render() {
        return(
        <div className="control-group">
            <div className="controls">
                <span style={this.props.iconProp} className="material-icons input-icons">person_outline</span>
                <input style={this.props.styleProp} placeholder="Fullname" type="text" id="fullname" name="full_name"
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
    }

    render() {
        return (
        <div className="control-group">
            <div className="controls">
                <span style={this.props.iconProp} className="material-icons input-icons">email</span>
                <input style={this.props.styleProp} placeholder="Email" type="text" id="email" name="email" 
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
    }

    render() {
        return (
        <div className="control-group">
            <div className="controls">
                <span style={this.props.iconProp} className="material-icons input-icons">lock_outline</span>
                <input style={this.props.styleProp} placeholder="Password" type="password" id="password" name="password" 
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
    }

    render() {
        return (
        <div className="control-group">
            <div className="controls">
                <span style={this.props.iconProp} className="material-icons input-icons">lock_outline</span>
                <input style={this.props.styleProp} placeholder="Re-type password" type="password" id="password_confirm" 
                name="password_confirm" className="input-xlarge value-input" 
                onChange={this.props.valChange} value= {this.props.val}/>
            </div>
        </div>
        );
    }
}

export {FormComponent};