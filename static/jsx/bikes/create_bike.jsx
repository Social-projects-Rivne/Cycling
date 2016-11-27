import React              from 'react';

let emptyImg = () => ({pk: null, url: '', bike_id: null, toDelete: null});

const initialState = () => ({
    bike_id: null,
    nameValue: '',
    descriptionValue: '',
    imagesList: [emptyImg()]
});

let stateToEdit = (bike_and_images) => {
    if (!bike_and_images){
        return null;
    };
    let bike = bike_and_images.slice(0, 1)[0];
    let images = [];
    if (bike_and_images.length > 1){
        images = bike_and_images.slice(1,);
    };
    return {
        bike_id: bike.pk,
        nameValue: bike.fields.name,
        descriptionValue: bike.fields.description,
        imagesList: images.map((i) => ({pk: i.pk, url: i.fields.url, bike_id: i.fields.bike, toDelete: null}))
    };
};

class BikeForm extends React.Component{
  constructor(props){
    super(props);
    console.log(props.bikeData);
    this.state = props.bikeData || initialState();
    this.urlToSend = props.urlToSend || '/api/bike/create';
    this.formTitle = props.formTitle || 'New Bicycle';
    this.submit = this.submit.bind(this);

    this.nameChange = this.nameChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.urlChange = this.urlChange.bind(this);
    this.deleteImg = this.deleteImg.bind(this);
    this.addImg = this.addImg.bind(this);
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
        url: this.urlToSend,
        data: JSON.stringify(
            {pk: this.state.bike_id,
                name: this.state.nameValue,
                description: this.state.descriptionValue,
                imagesList: this.state.imagesList,
                token: localStorage['token']}
              ),
        dataType: "json",
        success: function (data) {
                    let message = "The bicycle " + data[0].fields.name + " is saved";
                    // console.log(message);
                    this.props.history.push('/user/' + localStorage['id']);
                    this.setState(initialState());
                    this.props.successNotification.showMe(message);
                  }.bind(this)
                }
    ).fail(function(data) {
        // console.log(data);
        let message = "Sorry. Something is wrong: " + data.responseText;
        this.props.failNotification.showMe(message);
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
      let urls = this.state.imagesList;
      urls[index].url = e.target.value;
      this.setState({imagesList:urls});
  };

  deleteImg(e, index){
      let urls = this.state.imagesList;
      urls[index].toDelete = true;
      this.setState({imagesList:urls});
  };

  addImg(e){
      let urls = this.state.imagesList;
      urls.push(emptyImg());
      this.setState({imagesList:urls});
  };

  render(){
    return (
                <div>
                    <h4>{this.formTitle}</h4>
                    <form>
                        <div className = "form-group">
                            <input type = "text" className = "form-control" placeholder = "Name"
                                value={this.state.nameValue}
                                onChange={this.nameChange}
                                style={this.getStyle(this.state.nameError)}
                            />
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" rows="3" id="description" placeholder="Description"
                                value={this.state.descriptionValue}
                                onChange={this.descriptionChange}>
                            </textarea>
                        </div>

                        <div className = "form-group">
                            {this.state.imagesList.map(
                                (image, index)=>(image.toDelete? null :
                                    <div className="form-inline" key={index}>
                                        <input type = "text" className = "form-control" placeholder = "Image URL"
                                            value={image.url}
                                            onChange={e => {this.urlChange(e, index);}}
                                        />
                                        <div className="btn-group">
                                            <span className="btn btn-default material-icons plus" type="button"
                                                onClick={this.addImg}
                                            >add</span>
                                            <span className="btn btn-default material-icons minus" type="button"
                                                onClick={e => {this.deleteImg(e, index);}}
                                            >-</span>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        <button type="button" className="btn btn-default" onClick={this.submit}>Submit</button>
                    </form>
                </div>
    )
  };
};


export default class CreateBike extends React.Component{
    render(){
        return <BikeForm 
                    successNotification={this.props.children.father.refs.successNotification}
                    failNotification={this.props.children.father.refs.failNotification}
                    history={this.props.history}
                />
    };
};

export class EditBike extends React.Component{
     constructor(props){
        super(props);
        this.state = {
            bike_id: props.params['bike_id']
        };
     };

     componentDidMount() {
        // Fetch data from the django api.
        //  $.get("/api/bike/"+this.props.params['bike_id']+"/",
        $.get(`/api/bike/${this.props.params['bike_id']}/`,   
            function (response) {
                this.setState ({
                        api_output: response
                    });
            }.bind(this)
        ).fail(function(response) {
            console.log(response);
            if(response.status === '404' || response.status === 404){
                console.log('pushing to 404');
                this.props.history.push('/404');
                return;
            };
            this.props.history.push('/user/' + localStorage['id']);
            let message = "Sorry. Something is wrong: " + response.statusText;
            this.props.children.father.refs.failNotification.showMe(message);
        }.bind(this)
        )

    };

     render(){
         if (!this.state.api_output)
            return null;

        return <BikeForm 
                    bikeData={stateToEdit(this.state.api_output)}
                    urlToSend = '/api/bike/edit'
                    formTitle = 'Editing the Bicycle'
                    successNotification={this.props.children.father.refs.successNotification}
                    failNotification={this.props.children.father.refs.failNotification}
                    history={this.props.history}
                />
    };
};