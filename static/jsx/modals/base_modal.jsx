import React from 'react';
const {PropTypes} = React;

class BaseModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  };

  render(){
      if (!this.props.isOpen)
        return null
    
    let modalStyle = {
      position: 'fixed',
      width: this.props.width,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      borderRadius: '10px',
      background: '#fff',
      outline: 'none'
    }

    let backdropStyle = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(0, 0, 0, 0.35)'
    }

      const okButton = this.props.showOk
            ? (
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" onClick={this.props.onClose}>Close</button>
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={this.props.onOk}
                        disabled={this.props.okDisabled}
                    >
                        {this.props.okText}
                    </button>
                </div>
            ) : null;
    return (
        <div>
            <div style={modalStyle} className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.props.onClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title" id={this.props.label}>{this.props.title}</h4>
                    </div>
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                    {okButton}
                </div>
            </div>
            <div style={backdropStyle} onClick={e => this.close(e)}></div>
        </div>
    )
  };

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  };

};

BaseModal.propTypes = {
  // props
  title: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  showOk: PropTypes.bool,
  okText: PropTypes.string,
  okDisabled: PropTypes.bool,
  width: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
    ]).isRequired,
  // methods
  onOk: PropTypes.func
};

BaseModal.defaultProps = {
  title: '',
  id: 'myModal',
  label:"myModalLabel",
  showOk: true,
  okText: 'OK',
  okDisabled: false,
  width: 400,
  onOk: () => {}
};

export default BaseModal;
