import React from 'react';
const {PropTypes} = React;

class BaseNotification extends React.Component{
    constructor(props){
    super(props);
    this.state = {
        isNotification: false,
        text: 'Somebody forgot to pass text in here'
    };
    this.showMe = this.showMe.bind(this);
    this.closeMe = this.closeMe.bind(this);
  };

  closeMe() {
    this.setState({ isNotification: false })
  }

  showMe(text){
      this.setState({ isNotification: true, text: text });
      setTimeout(this.closeMe, 5000);
  };

  render(){
      if (!this.state.isNotification)
        return null
    
    let notificationStyle = {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      zIndex: '9999',
      background: (this.background)? this.background : "#fde073",
      textAlign: "center",
      lineHeight: "4.0",
      overflow: "hidden"
    };

    let closeButtonStyle = {
      lineHeight: "2.0",
    };

    return (
        <div id="notification" style={notificationStyle}>
            
             {(this.state.text)? this.state.text : "Success!"}

            <button type="button" className="close" 
                onClick={this.onClose} aria-label="Close"
                style={closeButtonStyle}>
                <span aria-hidden="true">&times;</span>
            </button>

        </div>
    )
  };

};

export default BaseNotification;
