import React, { Component, PropTypes } from 'react';

import PasswordModalComponent from '../../../../base/modals/passwordModal';

class NewWalletInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleShowModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { generateNewWallet } = this.props;
    const { showModal } = this.state;
    return (
      <div className="panel-body form-wallet">
        <div>
          <button onClick={this.handleShowModal} className="btn btn-half-block">Generate New Wallet</button>
          <button className="btn btn-half-block">Upload Wallet</button>
        </div>
        <PasswordModalComponent
          show={showModal}
          handleSubmit={generateNewWallet}
          handleClose={this.handleCloseModal}
          labelSubmit="Generate New Wallet"
        />
      </div>
    );
  }
}

NewWalletInfoComponent.propTypes = {
  generateNewWallet: PropTypes.func.isRequired
};

export default NewWalletInfoComponent;

