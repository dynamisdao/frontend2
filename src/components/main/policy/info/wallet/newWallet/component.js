import React, { Component, PropTypes } from 'react';

import PasswordModalComponent from '../../../../../base/modals/passwordModal';

class NewWalletInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleWalletFile = this.handleWalletFile.bind(this);
  }

  handleShowModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleWalletFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      this.props.readWallet(event.target.result);
    };
    reader.readAsText(file);
  }

  render() {
    const { generateNewWallet } = this.props;
    const { showModal } = this.state;
    return (
      <div className="panel-body form-wallet">
        <div>
          <button onClick={this.handleShowModal} className="btn btn-half-block">Generate New Wallet</button>
          <label htmlFor="wallet_upload" className="btn btn-half-block right">Upload your wallet</label>
          <input
              id="wallet_upload"
              type="file"
              onChange={this.handleWalletFile}
              className="hidden-file-input btn-block "
          />
        </div>
        <PasswordModalComponent
          show={showModal}
          handleSubmit={generateNewWallet}
          handleClose={this.handleCloseModal}
          labelSubmit="Ok"
        />
      </div>
    );
  }
}

NewWalletInfoComponent.propTypes = {
  generateNewWallet: PropTypes.func.isRequired,
  readWallet: PropTypes.func.isRequired
};

export default NewWalletInfoComponent;

