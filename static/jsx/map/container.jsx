import React from 'react';
import MapComponent from './map_component.jsx';
import NewPointerModal from '../modals/new_pointer.jsx';
import BaseModal from '../modals/base_modal.jsx';

class MapContainer extends React.Component{
  constructor(props){
    super(props);
  };

  render(){
    return (
      <div>
        <BaseModal ref="baseModal">
          <div></div> 
        </BaseModal>
        <NewPointerModal ref="modal" father={this}/>
        <MapComponent father={this}/>
      </div>
    )
  }
};

export default MapContainer;
