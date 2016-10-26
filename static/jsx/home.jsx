import React from 'react';
import MapComponent from './map/map_component.jsx';
import NewPointerModal from './modals/new_pointer.jsx';
import NewPlaceModal from './modals/new_place.jsx';
import FailNotification from './notifications/fail.jsx';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.showNewPointerModal = this.showNewPointerModal.bind(this);
  };

  showNewPointerModal(data){
    this.refs.newPointerModal.showMe(data);
  };

  render(){
    return (
      <div>
        <NewPlaceModal ref="newPlaceModal" father={this}/>
        <NewPointerModal ref="newPointerModal" father={this}/>
        <MapComponent father={this} newPointer={this.showNewPointerModal}/>
      </div>
    )
  }
};

export default Home;
