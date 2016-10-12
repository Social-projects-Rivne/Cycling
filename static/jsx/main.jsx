import React from 'react';
import ReactDOM from 'react-dom';
import { FormComponent } from './registration.jsx';

class APP extends React.Component{
  render(){
    return (
      <div>
        <div> </div>
        <FormComponent name="registration"/>
      </div>
    )
  }
};

ReactDOM.render(<APP/>, document.getElementById('app'));