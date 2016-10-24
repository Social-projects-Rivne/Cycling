import React        from 'react';
import L            from 'leaflet';
import {Popup}      from 'react-leaflet';

function createPointerPopup() {
        return (
            `<div>
                <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
                Launch demo modal
                </button>

            </div>`
        );
    };

class MyPointer extends React.Component {
  constructor() {
    super();
    
  };
  render(){
    return (
        <Popup>
            <span>React-leaflet. <br/>
                  popup.</span>
        </Popup>
    )
  };
};

let MyPopup = L.popup({closeButton:false})
    .setContent('<p>Hello world!<br />This is a nice popup.</p>');

export {MyPopup, MyPointer};
export default createPointerPopup;