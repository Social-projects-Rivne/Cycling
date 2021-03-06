import React from 'react';
const {PropTypes} = React;

class BaseNotification extends React.Component{
    constructor(props){
    super(props);
    this.state = {
        isNotification: false,
    };
    this.showMe = this.showMe.bind(this);
    this.closeMe = this.closeMe.bind(this);
  };

  closeMe() {
    this.setState({ isNotification: false })
  }

  showMe(text){
      console.log(text); 
      this.text = text;
      this.setState({ isNotification: true });
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
      background: this.background || "#fde073",
      textAlign: "center",
      lineHeight: "4.0",
      overflow: "hidden",
      height: "51px"
    };

    let closeButtonStyle = {
      lineHeight: "2.5",
      marginRight: "20px"
    };

    return (
        <div id="notification" style={notificationStyle}>
            
             { this.text || "Here should be a notifying text."}

            <button type="button" className="close" 
                onClick={this.closeMe} aria-label="Close"
                style={closeButtonStyle}>
                <span aria-hidden="true">&times;</span>
            </button>

        </div>
    )
  };

};

export default BaseNotification;
