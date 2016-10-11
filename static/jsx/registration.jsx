var dict = []
class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePassConfirm = this.changePassConfirm.bind(this);
        this.submitAll = this.submitAll.bind(this);
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

    submitAll(event){
        var self;
        event.preventDefault();
        if (this.state.password === this.state.password_confirm) {
            self = this;
            console.log(this.state);
            var data = {
                full_name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            }
            $.ajax({
                type: 'POST',
                url: '/some/url',
               data: data
            })
            .done(function(data) {
                self.clearForm()
            })
            .fail(function(jqXhr) {
                console.log('failed to register');
            });
        }
        else {
            console.log("different passwords");
        }
    }

    render() {
        return (
        <form onSubmit={this.submit} className="form-horizontal">
            <fieldset>
                <div id="legend">
                    <legend>Register</legend>
                </div>
                <UserName label="Fullname:" valChange={this.changeName} val={this.state.name}/>
                <Email label="Email:" valChange={this.changeEmail} val={this.state.email}/>
                <Pass label="Password:" valChange={this.changePassword} val={this.state.password}/>
                <PassConfirm label="Password confirm:" valChange={this.changePassConfirm} val={this.state.password_confirm}/>

                <div className="control-group">
                    <div className="controls">
                        <button type="submit" className="btn btn-success" onClick={this.submitAll}>Register</button>
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
            <label className="control-label">{this.props.label}</label>
            <div className="controls">
                <input type="text" id="fullname" name="full_name"
                 className="input-xlarge" onChange={this.props.valChange} value={this.props.val}/>
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
            <label className="control-label">{this.props.label}</label>
            <div className="controls">
                <input type="text" id="email" name="email" 
                className="input-xlarge" onChange={this.props.valChange} value={this.props.val}/>
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
            <label className="control-label">{this.props.label}</label>
            <div className="controls">
                <input type="password" id="password" name="password" className="input-xlarge" 
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
            <label className="control-label">{this.props.label}</label>
            <div className="controls">
                <input type="password" id="password_confirm" name="password_confirm" className="input-xlarge" 
                onChange={this.props.valChange} value= {this.props.val}/>
            </div>
        </div>
        );
    }
}

ReactDOM.render(<FormComponent/>, document.getElementById('registration'));