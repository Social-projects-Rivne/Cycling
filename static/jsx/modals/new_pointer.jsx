import React from 'react';
import BaseModal from './base_modal.jsx';

class NewPointerModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        isOpen: false,
        id: 'newPointerModal',
        title: 'New Pointer on the Map',
        label: 'newPointerModalLabel',
        showOk: false
    };
    this.showMe = this.showMe.bind(this);
    this.closeMe = this.closeMe.bind(this);
    this.onPlace = this.onPlace.bind(this);
    this.onParking = this.onParking.bind(this);
  };

  onPlace(){
      // console.log('Place clicked!');
      this.setState({ isOpen: false });
      this.props.father.refs.newPlaceModal.showMe(this.state.latlng);
  };

  onParking(){
      this.setState({ isOpen: false });
      this.props.father.refs.newParkingModal.showMe(this.state.latlng);
  };

  closeMe() {
    this.setState({ isOpen: false });
    this.props.father.refs.map.setState({redMarkerLatLng: null});
  }

  showMe(latlng={}){
      // console.log(latlng);
      this.setState({ isOpen: true, latlng: latlng });
  };

  render(){
    return (
                <BaseModal 
                    isOpen={this.state.isOpen} 
                    id={this.state.id} 
                    title={this.state.title} 
                    label={this.state.label} 
                    showOk={this.state.showOk}
                    onClose={this.closeMe}>                      
                    <div className="btn-group-vertical btn-block">
                        <button type="button" className="btn btn-default" onClick={this.onPlace}>Place</button>
                        <button type="button" className="btn btn-default" onClick={this.onParking}>Parking</button>
                        <button type="button" className="btn btn-default">A Bicycle Got Stolen</button>
                      </div>
                </BaseModal>
    )
  }
};

export default NewPointerModal;