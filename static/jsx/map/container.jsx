import React from 'react';
import MapComponent from './map_component.jsx';

class MyModal extends React.Component{
  render(){
    return (
              <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                          </button>
                          <h4 className="modal-title" id="myModalLabel">Modal title</h4>
                      </div>
                    <div className="modal-body">
                        ...
                    </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                </div>
               </div>
    )
  }
}

class MapContainer extends React.Component{
  render(){
    return (
      <div>
        <MyModal />
        <MapComponent />
      </div>
    )
  }
};

export default MapContainer;
