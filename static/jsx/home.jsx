import React from 'react';
import MapComponent from './map/map_component.jsx';
import NewPointerModal from './modals/new_pointer.jsx';
import NewPlaceModal from './modals/new_place.jsx';
import NewParkingModal from './modals/new_parking.jsx';
import FailNotification from './notifications/fail.jsx';
import SuccessNotification from './notifications/success.jsx';

class Home extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
    this.showNewPointerModal = this.showNewPointerModal.bind(this);
  };

  showNewPointerModal(data){
    this.refs.newPointerModal.showMe(data);
  };

  render(){
    return (
      <div>
        <SuccessNotification ref="successNotification" father={this} />
        <FailNotification ref="failNotification" father={this} />
        <NewPlaceModal ref="newPlaceModal" father={this}/>
        <NewParkingModal ref="newParkingModal" father={this}/>
        <NewPointerModal ref="newPointerModal" father={this}/>
        <MapComponent ref="map" father={this} newPointer={this.showNewPointerModal} map_settings = {this.props.map_settings}/>
      </div>
    )
  }
};

export default Home;
