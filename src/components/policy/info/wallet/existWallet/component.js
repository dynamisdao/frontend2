import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import PasswordModalComponent from '../../../../base/modals/passwordModal';

export const fields = ['toAddress', 'amount'];

const validate = values => {
  const errors = {};
  if (!values.amount) {
    errors.amount = 'Required';
  }
  if (!values.toAddress) {
    errors.toAddress = 'Required';
  }
  return errors;
};

class ExistWalletInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showGenerateWalletModal: false, showSendTranactionModal: false, values: { } };
    this.renderField = this.renderField.bind(this);
    this.handleShowGenerateWalletModal = this.handleShowGenerateWalletModal.bind(this);
    this.handleGenerateWallet = this.handleGenerateWallet.bind(this);
    this.handleShowSendTranactionModal = this.handleShowSendTranactionModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleShowGenerateWalletModal() {
    this.setState({ showGenerateWalletModal: true });
  }

  handleGenerateWallet(password) {
    this.props.generateNewWallet(password, this.handleCloseModal);
  }

  handleShowSendTranactionModal() {
    this.setState({ showSendTranactionModal: true });
  }

  handleCloseModal(values) {
    this.setState({
      showGenerateWalletModal: false,
      showSendTranactionModal: false,
      values
    });
  }

  renderField({ input, label, type, autoFocus, meta: { touched, error } }) {
    return (
      <div className="form-row">
        <label htmlFor="field-email" className="form-label hidden">{label}</label>
        <div>
          <input {...input} autoFocus={autoFocus} className="field" placeholder={label} type={type} />
        </div>
        <div>
          {touched && error && <span className="error">{error}</span>}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, generateNewWallet } = this.props;
    const { showGenerateWalletModal, showSendTranactionModal } = this.state;
    return (
      <form onSubmit={handleSubmit(this.handleShowSendTranactionModal)}>
        <div className="panel-body form form-wallet">
          <div className="form-body">
            <Field name="toAddress" type="text" component={this.renderField} label="To Address" />
            <Field name="amount" type="text" component={this.renderField} label="Amount (Wei)" />
          </div>
          <div className="form-btn">
            <button type="submit" className="btn btn-block">Send Transaction</button>
            <br>
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
        <PasswordModalComponent
          show={showSendTranactionModal}
          handleSubmit={generateNewWallet}
          handleClose={this.handleCloseModal}
          labelSubmit="Ok"
          title="You want to make a transaction"
        />
      </form>
    );
  }
}

ExistWalletInfoComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  array: PropTypes.object.isRequired,
  generateNewWallet: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'existWalletForm',
  validate
})(ExistWalletInfoComponent);
