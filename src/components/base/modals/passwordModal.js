import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

class PasswordModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isValid: true };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputField = this.handleInputField.bind(this);
  }

  handleSubmit() {
    if (!this.state.password) {
      this.setState({ isValid: false });
    } else {
      this.props.handleSubmit(this.state.password);
    }
  }

  handleInputField(event) {
    this.setState({ password: event.target.value, isValid: true });
  }

  render() {
    const { show, handleClose, labelSubmit } = this.props;
    const { isValid } = this.state;
    return (
      <Modal
        show={show}
        onHide={handleClose}
        container={this}
      >
        <div className="panel-modal">
          <div className="panel-body form text-center">
            <input
              autoFocus
              className="field"
              placeholder="Please enter your Password"
              type="password"
              onChange={this.handleInputField}
            />
            {!isValid ? <p className="error">Required</p> : null}
          </div>
          <div className="panel-control text-center">
            <button onClick={this.handleSubmit} className="btn btn-center">{labelSubmit}</button>
          </div>
        </div>
      </Modal>
    );
  }
}

PasswordModalComponent.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  labelSubmit: PropTypes.string.isRequired
};

export default PasswordModalComponent;
