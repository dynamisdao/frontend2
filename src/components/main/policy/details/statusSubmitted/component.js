import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as PolicyActions from '../../../../../actions/policy';
import CustomSpiner from '../../../../base/spiner/component';

const DEPOSIT_STATE = [
  { label: 'Waiting for smart deposit', key: 'INITIAL', state: 0 },
  { label: 'Smart deposit is not received yet', key: 'POLICY_STATUS_SUBMITTED', state: 1 }
];

class StatusSubmittedDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.handlePayDeposit = this.handlePayDeposit.bind(this);
  }

  componentWillMount() {
    this.props.getSmartDeposit(this.props.policy.id);
  }

  handlePayDeposit(event) {
    event.preventDefault();
    this.props.changePoolState('smartDeposit');
  }

  render() {
    const { policy, smartDeposit } = this.props;
    return (
      <div>
      {smartDeposit.status ?
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
          <button
            onClick={this.handlePayDeposit}
            className="btn btn-block"
            disabled={smartDeposit.status === 1}
          >
            {smartDeposit.status === 0 ?
              <i className="material-icons">credit_card</i> :
              <i className="fa fa-spin fa-spinner" />
            }
            &nbsp;Pay Smart Deposit
          </button>
        </div> : <CustomSpiner />
      }
      </div>
    );
  }
}

StatusSubmittedDetailsComponent.propTypes = {
  policy: PropTypes.object.isRequired,
  smartDeposit: PropTypes.object.isRequired,
  getSmartDeposit: PropTypes.func.isRequired,
  changePoolState: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    policy: state.policy.policy,
    smartDeposit: state.policy.smartDeposit
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PolicyActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusSubmittedDetailsComponent);
