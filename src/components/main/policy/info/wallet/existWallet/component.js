import React, { Component, PropTypes } from 'react';

import PasswordModalComponent from '../../../../../base/modals/passwordModal';

class ExistWalletInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showGenerateWalletModal: false };
    this.handleShowGenerateWalletModal = this.handleShowGenerateWalletModal.bind(this);
    this.handleGenerateWallet = this.handleGenerateWallet.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
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

  render() {
    const { handleSubmit, generateNewWallet, wallet } = this.props;
    const { showGenerateWalletModal } = this.state;
    return (
      <div>
        <div className="panel-body form form-wallet">
          <div className="form-body">
            <div className="form-row">
              <input
                  className="field"
                  defaultValue={`Your current address: ${wallet.address}`}
                  type="text"
                  readOnly
              />
            </div>
            <div className="form-row">
              <input
                  className="field"
                  defaultValue={`You balance: ${wallet.balance}`}
                  type="text"
                  readOnly
              />
            </div>
          </div>
          <div className="form-btn">
            <button className="btn btn-block">Download Your Wallet</button>
            <button className="btn btn-block">Upload Your Wallet</button>
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
  generateNewWallet: PropTypes.func.isRequired
};

export default ExistWalletInfoComponent;
