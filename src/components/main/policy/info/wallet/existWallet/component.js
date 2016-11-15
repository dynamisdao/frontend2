import React, { Component, PropTypes } from 'react';
import download from 'downloadjs';

import { converterBalance } from '../../../../../../utils';

import PasswordModalComponent from '../../../../../base/modals/passwordModal';

class ExistWalletInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showGenerateWalletModal: false };
    this.handleShowGenerateWalletModal = this.handleShowGenerateWalletModal.bind(this);
    this.handleGenerateWallet = this.handleGenerateWallet.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleWalletFile = this.handleWalletFile.bind(this);
    this.handleDownloadWallet = this.handleDownloadWallet.bind(this);
  }

  handleShowGenerateWalletModal() {
    this.setState({ showGenerateWalletModal: true });
  }

  handleGenerateWallet(password) {
    this.props.generateNewWallet(password, this.handleCloseModal);
  }

  handleCloseModal() {
    this.setState({ showGenerateWalletModal: false });
  }

  handleWalletFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      this.props.readWallet(event.target.result);
    };
    reader.readAsText(file);
  }

  handleDownloadWallet() {
    download(window.localStorage.keystore, 'wallet.json', 'application/json');
  }

  render() {
    const { handleSubmit, generateNewWallet, wallet, downloadWallet } = this.props;
    const { showGenerateWalletModal } = this.state;
    return (
      <div>
        <div className="panel-body form form-wallet">
          <div className="form-body">
            <div className="form-row">
              <input
                  className="field"
                  value={`Your address: ${wallet.address ? wallet.address : null}`}
                  type="text"
                  readOnly
              />
            </div>
            <div className="form-row">
              <input
                  className="field"
                  value={`Your balance: ${converterBalance(wallet.balance)}`}
                  type="text"
                  readOnly
              />
            </div>
          </div>
          <div className="form-btn">
            <button onClick={this.handleDownloadWallet} className="btn btn-block">Download Your Wallet</button>
            <label htmlFor="wallet_upload" className="btn btn-block">Upload your wallet</label>
            <input
                id="wallet_upload"
                type="file"
                onChange={this.handleWalletFile}
                className="hidden-file-input btn-block "
            />
            <button onClick={this.handleShowGenerateWalletModal} className="btn btn-block">Generate New Wallet</button>
          </div>
        </div>
        <PasswordModalComponent
          show={showGenerateWalletModal}
          handleSubmit={this.handleGenerateWallet}
          handleClose={this.handleCloseModal}
          labelSubmit="Ok"
          title="Are you sure, that you want to generate a new wallet?"
        />
      </div>
    );
  }
}

ExistWalletInfoComponent.propTypes = {
    wallet: PropTypes.object.isRequired,
    generateNewWallet: PropTypes.func.isRequired,
    readWallet: PropTypes.func.isRequired
};

export default ExistWalletInfoComponent;
