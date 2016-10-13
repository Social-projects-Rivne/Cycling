import React from 'react';
import {Child} from './child.jsx';

class Parent extends React.Component{
  render(){
    return (
      <div>
        <div> This is the parent. </div>
        <Child name="child"/>
      </div>
    )
  }
};

export default Parent;
