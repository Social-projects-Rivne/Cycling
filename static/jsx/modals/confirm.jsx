import React from 'react';
import BaseModal from './base_modal.jsx';

class ConfirmModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        isOpen: false,
        id: 'newConfirmModal',
        titleText: props.titleText || 'Confirm',
        question: props.question || 'Proceed?',
        okText: props.okText || 'Yes',
        labelText: 'newConfirmModalLabel',
    };
    this.showMe = this.showMe.bind(this);
    this.closeMe = this.closeMe.bind(this);
  };

  closeMe() {
    this.setState({ isOpen: false });
  }

  showMe(){
      // console.log(latlng);
      this.setState({ isOpen: true });
  };

  render(){
    return (
                <BaseModal 
                    isOpen={this.state.isOpen} 
                    id={this.state.id}
                    title={this.state.titleText}
                    label={this.state.labelText}
                    okText={this.state.okText}
                    showOk={true}
                    onClose={this.closeMe}
                    onOk={this.props.onOk}>
                    {this.state.question}
                </BaseModal>
    )
  }
};

export default ConfirmModal;