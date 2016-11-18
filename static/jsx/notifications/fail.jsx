import React from 'react';
import BaseNotification from './base_notification.jsx';

class FailNotification extends BaseNotification{
    constructor(props){
    super(props);
    this.background = "#d9534f";
    this.text = props.text || 'Failed';
  };
};

export default FailNotification;