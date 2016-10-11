var dict = []
class FormComponent extends React.Component {
    render() {
        return (
        <form className="form-horizontal">
            <fieldset>
                <Legend/>
                <UserName name="Please, enter your super full name"/>
                <Email name="Please, provide your E-mail"/>
                <Pass name="Please, enter password"/>
                <PassConfirm name="Please, confirm password"/>
                <SuccessButton/>
            </fieldset>
        </form>
        );
    }
}

class Legend extends React.Component {
    render() {
        return(
        <div id="legend">
            <legend>Register</legend>
        </div>
        );
    }
}

class UserName extends React.Component {
    constructor(props){
    super(props);    
    this.state = {full_name: 'Your beautiful full name here!'};
    this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({full_name: event.target.value});
        dict.push({
            full_name: event.target.value
        })
        console.log(dict);
    }

    render() {
        return(
        <div className="control-group">
            <label className="control-label" htmlFor="username">Username</label>
            <div className="controls">
                <input type="text" id="username" name="full_name"
                 className="input-xlarge" value={this.state.full_name} onChange={this.handleChange}/>
                <p className="help-block">{this.props.name}</p>
            </div>
        </div>
        );
    }
}


class Email extends React.Component {
    constructor(props) {
    super(props);    
    this.state = {email: 'Your perfect email here!'};
    this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({email: event.target.value});
        console.log(this.state)
    }
    render() {
        return (
        <div className="control-group">
            <label className="control-label" htmlFor="email"></label>
            <div className="controls">
                <input type="text" id="email" name="email" 
                className="input-xlarge" value={this.state.email} onChange={this.handleChange}/>
                <p className="help-block">{this.props.name}</p>
            </div>
        </div>
        );
    }
}

class Pass extends React.Component {
    constructor(props) {
    super(props);    
    this.state = {password: ''};
    this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({password: event.target.value});
        console.log(this.state)
    }
    render() {
        return (
        <div className="control-group">
            <label className="control-label" htmlFor="password"></label>
            <div className="controls">
                <input type="password" id="password" name="password" className="input-xlarge" 
                value={this.state.password} onChange={this.handleChange}/>
                <p className="help-block">{this.props.name}</p>
            </div>
        </div>
        );
    }
}

class PassConfirm extends React.Component {
    constructor(props) {
    super(props);    
    this.state = {password_confirm: ''};
    this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({password_confirm: event.target.value});
        console.log(this.state)
    }
    render() {
        return (
        <div className="control-group">
            <label className="control-label"  htmlFor="password_confirm"></label>
            <div className="controls">
                <input type="password" id="password_confirm" name="password_confirm" className="input-xlarge" 
                value={this.state.password_confirm} onChange={this.handleChange}/>
                <p className="help-block">{this.props.name}</p>
            </div>
        </div>
        );
    }
}

class SuccessButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {formValues: []};
    }

    handleClick(event) {
        event.preventDefault();
    }

    render() {
        return (
        <div className="control-group">
            <div className="controls">
                <button className="btn btn-success" onClick={this.handleClick}>Register</button>
            </div>
        </div>
        );
    }
}

ReactDOM.render(<FormComponent name="Please, enter your super full name!)"/>, document.getElementById('registration'));