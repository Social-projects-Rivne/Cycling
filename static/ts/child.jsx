import React from 'react';


class Child extends React.Component{
  render(){
    return (
      <div>
        and this is the <b>{this.props.name}</b>.
      </div>
    )
  }
}

export {Child as default};