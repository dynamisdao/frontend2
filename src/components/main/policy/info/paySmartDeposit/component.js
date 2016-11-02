import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as PolicyActions from '../../../../../actions/policy';

import PaySmartDepositModalComponent from './paySmartModal';

class PaySmartDepositComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleShowModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleSubmit(password, successCallback) {
    const data = {
      amount_in_wei: this.props.smartDeposit.cost_in_wei,
      from_address: this.props.smartDeposit.address_to_send
    };
    this.props.makeTransaction(
      data,
      password,
      this.props.policy.id,
      () => {
        this.props.sendSmartDeposit(this.props.policy.id, data);
        successCallback();
      }
    );
  }

  render() {
    const { smartDeposit, wallet } = this.props;
    const { showModal } = this.state;
    return (
      <div className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Pay Smart Deposit</h2>
        </div>
        <div className="panel-body form form-smart-deposit">
          <div className="form-body">
            <div className="form-row">
              <input
                className="field"
                defaultValue={`amount: ${smartDeposit.cost_in_eth}`}
                type="text"
                readOnly
              />
            </div>
            <div className="form-row">
              <input
                className="field"
                defaultValue={`address: ${wallet.address}`}
                type="text"
                readOnly
              />
            </div>
            <div className="form-row">
              <input
                  className="field"
                  defaultValue={`your balance: ${wallet.balance}wei`}
                  type="text"
                  readOnly
              />
            </div>
          </div>
          <div className="form-btn">
            <button onClick={this.handleShowModal} className="btn btn-block">
              Send Transactions
            </button>
          </div>
          <PaySmartDepositModalComponent
            show={showModal}
            handleSubmit={this.handleSubmit}
            sendSmartDeposit={this.props.sendSmartDeposit}
            handleClose={this.handleCloseModal}
            title={`You want send ${smartDeposit.cost_in_eth} eth`}
            hash={smartDeposit.hash}
            changePoolState={this.props.changePoolState}
          />
        </div>
      </div>
    );
  }
}

PaySmartDepositComponent.propTypes = {
  smartDeposit: PropTypes.object.isRequired,
  policy: PropTypes.object.isRequired,
  wallet: PropTypes.object.isRequired,
  sendSmartDeposit: PropTypes.func.isRequired,
  makeTransaction: PropTypes.func.isRequired,
    changePoolState: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    smartDeposit: state.policy.smartDeposit,
    policy: state.policy.policy,
    wallet: state.policy.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PolicyActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { pure: false }
)(PaySmartDepositComponent);
