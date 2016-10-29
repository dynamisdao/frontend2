import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as PolicyActions from '../../../../../actions/policy';

import PasswordModalComponent from '../../../../base/modals/passwordModal';

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

  handleSubmit(password) {
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
        this.handleCloseModal();
      }
    );
  }

  render() {
    const { smartDeposit } = this.props;
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
                defaultValue={`address: ${smartDeposit.address_to_send}`}
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
          <PasswordModalComponent
            show={showModal}
            handleSubmit={this.handleSubmit}
            handleClose={this.handleCloseModal}
            labelSubmit="Ok"
            title={`You want send ${smartDeposit.cost_in_eth} eth`}
          />
        </div>
      </div>
    );
  }
}

PaySmartDepositComponent.propTypes = {
  smartDeposit: PropTypes.object.isRequired,
  policy: PropTypes.object.isRequired,
  sendSmartDeposit: PropTypes.func.isRequired,
  makeTransaction: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    smartDeposit: state.policy.smartDeposit,
    policy: state.policy.policy
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PolicyActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PaySmartDepositComponent);
