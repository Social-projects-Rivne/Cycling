import React from 'react';
import BaseModal from './base_modal.jsx';

class NewPlaceModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        id: 'NewPlaceModal',
        title: 'New Place on the Map',
        label: 'NewPlaceModalLabel',
        showOk: true,
        okText: 'Create',
    };
    this.showMe = this.showMe.bind(this);
    this.closeMe = this.closeMe.bind(this);
  };

  closeMe() {
    this.setState({ isOpen: false })
  }

  showMe(latlng={}){
      console.log(latlng);
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
                    onClose={this.closeMe}
                    onOk={this.closeMe}>                      
                    <div className="btn-group-vertical btn-block">
                        <button type="button" className="btn btn-default" onClick={this.closeMe}>Place</button>
                        <button type="button" className="btn btn-default">Parking</button>
                        <button type="button" className="btn btn-default">A Bicycle Got Stolen</button>
                      </div>
                </BaseModal>
    )
  }
};

export default NewPlaceModal;
