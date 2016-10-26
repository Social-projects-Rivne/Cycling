import React from 'react';
import BaseNotification from './base_notification.jsx';

class SuccessNotification extends BaseNotification{
    constructor(props){
    super(props);
    this.background = "#5cb85c";
    this.text = props.text || 'Success!';
  };
};

export default SuccessNotification;