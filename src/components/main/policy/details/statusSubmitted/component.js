import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as PolicyActions from '../../../../../actions/policy';
import CustomSpiner from '../../../../base/spiner/component';
import PasswordModalComponent from '../../../../base/modals/passwordModal';
import { urls } from '../../../../../routes';

const DEPOSIT_STATE = [
  { label: 'Waiting for smart deposit', key: 'INITIAL', state: 0 },
  { label: 'Smart deposit is not received yet', key: 'POLICY_STATUS_SUBMITTED', state: 1 }
];

class StatusSubmittedDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handlePayDeposit = this.handlePayDeposit.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.generateNewWallet = this.generateNewWallet.bind(this);
  }

  componentWillMount() {
    this.props.getSmartDeposit(this.props.policy.id);
  }

  handlePayDeposit(event) {
    event.preventDefault();
    browserHistory.push(urls.main.policy.smartDeposit.path);
  }

  handleShowModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  generateNewWallet(password) {
    this.props.generateNewWallet(password, this.handleCloseModal);
  }

  render() {
    const { policy, smartDeposit, wallet } = this.props;
    const { showModal } = this.state;
    return (
      <div>
      {smartDeposit.address_to_send ?
        <div className="panel-body">
          <div className="table table-policy-details">
            <table>
              <colgroup>
                <col className="col-title" />
                <col className="col-detail" />
              </colgroup>
              <tbody>
                <tr>
                  <td>Policy #</td>
                  <td>{policy.id}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{DEPOSIT_STATE.find(d => d.state === smartDeposit.status).label}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {wallet.address ?
              <button
                  onClick={this.handlePayDeposit}
                  className="btn btn-block"
                  disabled={smartDeposit.status === 1}
              >
                {smartDeposit.status === 0 ?
                    <i className="material-icons">credit_card</i> :
                    <i className="fa fa-spin fa-spinner"/>
                }
                &nbsp;Pay Smart Deposit
              </button> :
              <button
                  onClick={this.handleShowModal}
                  className="btn btn-block"
              >
                Generate New Wallet
              </button>
          }
          <h5>Smart Deposit will be returned when the policy is closed</h5>
        </div> : <CustomSpiner />
      }
        <PasswordModalComponent
            show={showModal}
            handleSubmit={this.generateNewWallet}
            handleClose={this.handleCloseModal}
            labelSubmit="Ok"
        />
      </div>
    );
  }
}

StatusSubmittedDetailsComponent.propTypes = {
  policy: PropTypes.object.isRequired,
  wallet: PropTypes.object,
  smartDeposit: PropTypes.object.isRequired,
  getSmartDeposit: PropTypes.func.isRequired,
  generateNewWallet: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    policy: state.policy.policy,
    smartDeposit: state.policy.smartDeposit,
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
)(StatusSubmittedDetailsComponent);
