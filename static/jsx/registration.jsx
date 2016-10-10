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
    }
    handleEmailChange(e) {
        this.setState({full_name: e.target.value});
    }
    render() {
        return(
        <div className="control-group">
            <label className="control-label" htmlFor="username">Username</label>
            <div className="controls">
                <input type="text" id="username" name="full_name" placeholder=""
                 className="input-xlarge" onChange={this.state.full_name}/>
                <p className="help-block">{this.props.name}</p>
            </div>
        </div>
        );
    }
}


class Email extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
        <div className="control-group">
            <label className="control-label" htmlFor="email"></label>
            <div className="controls">
                <input type="text" id="email" name="email" placeholder="" className="input-xlarge" />
                <p className="help-block">{this.props.name}</p>
            </div>
        </div>
        );
    }
}

class Pass extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
        <div className="control-group">
            <label className="control-label" htmlFor="password"></label>
            <div className="controls">
                <input type="password" id="password" name="password" placeholder="" className="input-xlarge" />
                <p className="help-block">{this.props.name}</p>
            </div>
        </div>
        );
    }
}

class PassConfirm extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
        <div className="control-group">
            <label className="control-label"  htmlFor="password_confirm"></label>
            <div className="controls">
                <input type="password" id="password_confirm" name="password_confirm" placeholder="" className="input-xlarge" />
                <p className="help-block">{this.props.name}</p>
            </div>
        </div>
        );
    }
}

class SuccessButton extends React.Component {
    render() {
        return (
        <div className="control-group">
            <div className="controls">
                <button className="btn btn-success">Register</button>
            </div>
        </div>
        );
    }
}

ReactDOM.render(<FormComponent name="Please, enter your super full name!)"/>, document.getElementById('registration'));