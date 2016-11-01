import React from 'react';
import BaseModal from './base_modal.jsx';
import {Validator} from '../validator.jsx';

class NewParkingModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        id: 'NewParkingModal',
        title: 'New Parking on the Map',
        label: 'NewParkingModalLabel',
        showOk: true,
        okText: 'Create',
        amountValue:'3',
        securityValue:'0',
        isFreeValue: '1'
    };
    this.validator = new Validator();
    this.showMe = this.showMe.bind(this);
    this.closeMe = this.closeMe.bind(this);
    this.submit = this.submit.bind(this);

    this.nameChange = this.nameChange.bind(this);
    this.latChange = this.latChange.bind(this);
    this.lngChange = this.lngChange.bind(this);

    this.amountChange = this.amountChange.bind(this);
    this.isFreeChange = this.isFreeChange.bind(this);
    this.securityChange = this.securityChange.bind(this);
  };

  closeMe() {
    this.setState({ isOpen: false,
      nameValue:"",
      latValue: '',
      lngValue: '',
      amountValue: 3,
      securityValue: '0',
      isFreeValue: 1 });
      this.props.father.refs.map.setState({silverMarkerLatLng: null});
  };

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
    };
    return styleObj;
  };

  submit(e){
    if (this.state.nameValue === "" || !this.state.nameValue){
      this.setState({nameError: true})
      return
    };
    if (!this.validator.integer(this.state.amountValue)){
      this.setState({amountError: true})
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
        url: '/api/parkings/create',
        data: JSON.stringify(
             {name: this.state.nameValue,
              lat: this.state.latValue,
              lng: this.state.lngValue,
              amount: this.state.amountValue,
              is_free: this.state.isFreeValue,
              security: this.state.securityValue,
              token: localStorage['token']}
              ),
        dataType: "json",
        success: function (data) {
                    let message = "The parking " + data[0].fields.name + " is successfully created";
                    // console.log(message);
                    this.props.father.refs.successNotification.showMe(message);
                    // console.log(this.state.parkings.length);
                    this.props.father.refs.map.convertSilverMarkerToParking();
                    this.closeMe();
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

  amountChange(e){
    this.setState({amountValue:e.target.value,
      amountError: false});
  };

  isFreeChange(e){
    this.setState({isFreeValue:e.target.value});
  };

  securityChange(e){
    this.setState({securityValue:e.target.value});
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

                    <div className="form-group" >
                        <div className="form-inline">
                            <label htmlFor="amount" className="control-label" 
                              style={{marginRight: "5px"}}
                              >places:</label>
                                <input type="text" className="form-control " id="amount" 
                                  value={this.state.amountValue} 
                                  onChange={this.amountChange}
                                  style={this.getStyle(this.state.amountError, {width: "45px", marginRight: "10px"})}
                                />
                                  
                              <select className="form-control" id="sel1" 
                                value={this.state.isFreeValue} 
                                onChange={this.isFreeChange}
                                style={{marginRight: "10px"}}>
                              <option value="0">not free</option>
                              <option value="1">free</option>
                            </select>

                             <label htmlFor="sel2" className="control-label" 
                                    style={{marginRight: "5px"}}
                                    >security:</label>
                            <select className="form-control" id="sel2" 
                                value={this.state.securityValue} 
                                onChange={this.securityChange}
                                style={{float: "right"}}>
                              <option value="0">no</option>
                              <option value="1">good</option>
                              <option value="2">high</option>
                            </select>
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

export default NewParkingModal;
