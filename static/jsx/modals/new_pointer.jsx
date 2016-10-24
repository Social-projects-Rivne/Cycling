import React from 'react';
import BaseModal from './base_modal.jsx';

class NewPointerModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        id: 'newPointerModal',
        title: 'New Pointer on the Map',
        label: 'newPointerModalLabel',
        showOk: false
    };
    this.show = this.show.bind(this);
    this.onPlace = this.onPlace.bind(this);
  };

  onPlace(){
      let modal_id = '#' + this.state.id;
      $(modal_id).modal('hide');
      this.props.father.refs.baseModal.show();
  };

  show(){
    let modal_id = '#' + this.state.id;
    console.log(modal_id);
    $(modal_id).modal();
  };

  render(){
    return (
                <BaseModal id={this.state.id} title={this.state.title} label={this.state.label} showOk={this.state.showOk}>                      
                    <div className="btn-group-vertical btn-block">
                        <button type="button" className="btn btn-default" onClick={this.onPlace}>Place</button>
                        <button type="button" className="btn btn-default">Parking</button>
                        <button type="button" className="btn btn-default">A Bicycle Got Stolen</button>
                      </div>
                </BaseModal>
    )
  }
};

export default NewPointerModal;