import React              from 'react';
import {Validator} from '../validator.jsx';


const initialState = () => ({
    nameValue: '',
    descriptionValue: '',
    urlsValueList: ['','','','']
});

export default class CreateBike extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState();
    this.validator = new Validator();
    this.submit = this.submit.bind(this);

    this.nameChange = this.nameChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.urlChange = this.urlChange.bind(this);
  };


  componentWillUnmount() {
    if (this.serverRequest)
      this.serverRequest.abort();
  };

  getStyle(err, styleObj={}) {
    if (err) {
      styleObj.color = '#E04B39';
      styleObj.borderColor = '#E04B39';
    };
    return styleObj;
  };

  submit(e){
      e.preventDefault();
    if (this.state.nameValue === ""){
      this.setState({nameError: true})
      return
    };
    this.serverRequest = $.post(
      {
        url: '/api/bike/create',
        data: JSON.stringify(
             {name: this.state.nameValue,
              description: this.state.descriptionValue,
              urls: this.state.urlsValueList,
              token: localStorage['token']}
              ),
        dataType: "json",
        success: function (data) {
                    let message = "The bicycle " + data[0].fields.name + " is successfully created";
                    // console.log(message);
                    this.props.history.push('/user/' + localStorage['id']);
                    this.setState(initialState());
                    this.props.children.father.refs.successNotification.showMe(message);
                  }.bind(this)
                }
    ).fail(function(data) {
        // console.log(data);
        let message = "Sorry. Something is wrong: " + data.responseText;
        this.props.children.father.refs.failNotification.showMe(message);
      }.bind(this)
    );

  };

  nameChange(e){
    this.setState({nameValue: e.target.value,
      nameError: false});
  };

  descriptionChange(e){
    this.setState({descriptionValue:e.target.value});
  };

  urlChange(e, index){
      let urls = this.state.urlsValueList;
      urls[index] = e.target.value;
      this.setState({urlsValueList:urls});
  };

  render(){
    return (
                <div>
                    <h4>New Bicycle</h4>
                    <form>
                        <div className = "form-group">
                            <input type = "text" className = "form-control" placeholder = "Name"
                                value={this.state.nameValue}
                                onChange={this.nameChange}
                                style={this.getStyle(this.state.nameError)}
                            />
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" rows="2" id="description" placeholder="Description"
                                value={this.state.descriptionValue}
                                onChange={this.descriptionChange}>
                            </textarea>
                        </div>

                        <div className = "form-group">
                            {this.state.urlsValueList.map(
                                (value, index)=>(
                                    <input type = "text" className = "form-control" placeholder = "Image URL"
                                        value={value}
                                        key={index}
                                        onChange={e => {this.urlChange(e, index);}}
                                    />
                                )
                            )}
                        </div>

                        <button type="button" className="btn btn-default" onClick={this.submit}>Submit</button>
                    </form>
                </div>
    )
  };
};