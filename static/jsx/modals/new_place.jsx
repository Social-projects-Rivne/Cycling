import React from 'react';
import BaseModal from './base_modal.jsx';
import {Validator} from '../validator.jsx';

class NewPlaceModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        hoursList: [...Array(24).keys()],
        id: 'NewPlaceModal',
        title: 'New Place on the Map',
        label: 'NewPlaceModalLabel',
        showOk: true,
        okText: 'Create',
        categoryValue:'2'
    };
    this.validator = new Validator();
    this.showMe = this.showMe.bind(this);
    this.closeMe = this.closeMe.bind(this);
    this.latChange = this.latChange.bind(this);
    this.lngChange = this.lngChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.fromHourChange = this.fromHourChange.bind(this);
    this.toHourChange = this.toHourChange.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
    this.submit = this.submit.bind(this);
    this.nameChange = this.nameChange.bind(this);
  };

  closeMe() {
    this.setState({ isOpen: false,
      nameValue:"",
      latValue: '',
      lngValue: '',
      descriptionValue: '',
      fromHourValue: '',
      toHourValue: '',
      categoryValue: 2 })
  }

  showMe(latlng={}){
      console.log(latlng);
      this.setState({ 
        isOpen: true,
        latValue: latlng.lat.toPrecision(9),
        lngValue: latlng.lng.toPrecision(9) 
      });
  };

  componentWillUnmount() {
    this.serverRequest.abort();
  };

  getStyle(err, styleObj={}) {
    if (err) {
      styleObj.color = '#E04B39';
      styleObj.borderColor = '#E04B39';
    }
    return styleObj;
  };

  submit(e){
    if (this.state.nameValue === "" || !this.state.nameValue){
      this.setState({nameError: true})
      return
    };
    if (!this.validator.decimal(this.state.latValue)){
      this.setState({latError: true})
      return
    };
    if (!this.validator.decimal(this.state.lngValue)){
      this.setState({lngError: true})
      return
    };
    this.serverRequest = $.post(
      {
        url: '/places/create',
        data: {name: this.state.nameValue,
              lat: this.state.latValue,
              lng: this.state.lngValue,
              description: this.state.descriptionValue,
              from_hour: this.state.fromHourValue,
              to_hour: this.state.toHourValue,
              category_id: this.state.categoryValue,
              token: localStorage['token']},
              success: function (data) {
                          let message = "The place " + data[0].fields.name + " is successfully created";
                          // console.log(message);
                          this.props.father.refs.successNotification.showMe(message);
                          this.closeMe();
                          // console.log(this.state.parkings.length);
                        }.bind(this)
                      }
    ).fail(function(data) {
        // console.log(data);
        let message = "Sorry. Something is wrong: " + data.responseText;
        this.props.father.refs.failNotification.showMe(message);
      }.bind(this)
    );
    
  };

  nameChange(e){
    this.setState({nameValue: e.target.value,
      nameError: false});
  };

  latChange(e){
    this.setState({latValue:e.target.value,
      latError: false});
  };

  lngChange(e){
    this.setState({lngValue:e.target.value,
      lngError: false});
  };

  descriptionChange(e){
    this.setState({descriptionValue:e.target.value});
  };

  fromHourChange(e){
    this.setState({fromHourValue:e.target.value});
  };

  toHourChange(e){
    this.setState({toHourValue:e.target.value});
  };

  categoryChange(e){
    this.setState({categoryValue:e.target.value});
  };

  render(){
    return (
                <BaseModal 
                    isOpen={this.state.isOpen} 
                    id={this.state.id} 
                    title={this.state.title} 
                    label={this.state.label} 
                    showOk={this.state.showOk}
                    okText={this.state.okText}
                    onClose={this.closeMe}
                    onOk={this.submit}>

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

                        <div className="form-group">
                        <div className="form-inline" >
                          <select className="form-control" id="sel2" 
                              value={this.state.categoryValue} 
                              onChange={this.categoryChange}
                              style={{width: "150px"}}>
                            <option value="0">Store</option>
                            <option value="1">Service</option>
                            <option value="2">Cafe</option>
                          </select>

                              <div style={{float: "right"}}>
                                <label htmlFor="sel11" style={{marginRight: "4px"}}>from:</label>
                                <select className="form-control" id="sel11"
                                    value={this.state.fromHourValue} 
                                    onChange={this.fromHourChange}
                                    style={{marginRight: "10px"}}
                                    >
                                  <option value="">--</option>
                                  {this.state.hoursList.map((hour)=>(
                                    <option key={hour} value={hour}>{hour}</option>
                                  ))}
                                </select>

                                <label htmlFor="sel12" style={{marginRight: "4px"}}>to:</label>
                                <select className="form-control" id="sel12"
                                    value={this.state.toHourValue} 
                                    onChange={this.toHourChange}>
                                  <option value="">--</option>
                                  {this.state.hoursList.map((hour)=>(
                                    <option key={hour} value={hour}>{hour}</option>
                                  ))}
                                </select>
                              </div>
                        </div>
                      </div>

                    <div className="form-group" >
                        <label className="control-label" 
                              >Coordinates</label>
                        <div className="form-inline">
                            <label htmlFor="lat" className="control-label" 
                              style={{width: "30px"}}
                              >lat:</label>
                                <input type="text" className="form-control " id="lat" placeholder = "lattitude"
                                  value={this.state.latValue} 
                                  onChange={this.latChange}
                                  style={this.getStyle(this.state.latError, {width: "145px", marginRight: "17px"})}
                                />
                            <label htmlFor="lng" className="control-label"
                              style={{width: "30px"}}
                              >lng:</label>
                              <input type="text" className="form-control" id="lng" placeholder = "longitude"
                                  value={this.state.lngValue} 
                                  onChange={this.lngChange}
                                  style={this.getStyle(this.state.lngError, {width: "145px"})}
                              />
                        </div>
                    </div>

                </BaseModal>
    )
  }
};

export default NewPlaceModal;
