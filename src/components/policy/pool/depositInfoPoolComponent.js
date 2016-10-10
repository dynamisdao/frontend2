import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as PolicyActions from '../../../actions/policy';
import { urls } from '../../../routes';


class DepositInfoPoolComponent extends Component {

  componentWillmount() {
    this.props.getDepositInfo(this.props.policy.id);
  }
  render() {
    const { depositInfo } = this.props;
    return (
      <div className="panel panel-options">
      {depositInfo.status ?
        <div>
          <div className="panel-body">
            <ul className="list-options">
              <li>
                <a href="">
                  <i className="ico-verify" />
                  Verify My Policy
                </a>
              </li>
              <li>
                <a href="">
                  <i className="ico-history" />
                  Payment &amp; Claim History
                </a>
              </li>
              <li>
                <a href="">
                  <i className="ico-claim" />
                  Open A Claim
                </a>
              </li>
              <li>
                <a href="">
                  <i className="ico-close-policy" />
                  Close Policy
                </a>
              </li>
            </ul>
          </div>
          <footer className="panel-foot">
            <a href="" className="btn btn-large">More Policy Details</a>
          </footer>
        </div> : null
      }
      </div>
    );
  }
}

DepositInfoPoolComponent.propTypes = {
  policy: PropTypes.object.isRequired,
  getDepositInfo: PropTypes.object.isRequired,
  depositInfo: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    policy: state.policy.policy,
    depositInfo: state.policy.depositInfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PolicyActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositInfoPoolComponent);
