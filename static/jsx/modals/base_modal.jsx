import React from 'react';
const {PropTypes} = React;

class BaseModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.show = this.show.bind(this);
  };

  show(){
    let modal_id = '#' + this.props.id;
    $(modal_id).modal();
  };

  render(){
      const okButton = this.props.showOk
            ? (
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
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
              <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby={this.props.label} aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
               </div>
    )
  }
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
  style: PropTypes.object,
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
