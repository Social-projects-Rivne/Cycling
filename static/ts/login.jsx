import React from 'react';


export default class LoginComponent extends React.Component{

  render(){
    return (
      <div>
      <form style="margin:auto;" method='POST'>
        <div>
          Email:
          <input className="form-control" type="text" name="email"/>
        </div>
        <div>
          Password:
          <input className="form-control" type="password" name="password"/>
        </div>
        <div style="margin: auto">
          <input className='btn btn-primary' type='submit' value='Save'/>
        </div>
      </form>
      </div>
    )
  }
}
