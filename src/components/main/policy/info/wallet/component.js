import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as PolicyActions from '../../../../../actions/policy';
import NewWalletInfoComponent from './newWallet/component';
import ExistWalletInfoComponent from './existWallet/component';

class WalletInfoComponent extends Component {
  render() {
    return (
      <div className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Wallet</h2>
        </div>
        {window.localStorage.keystore || this.props.newGenerateWallet ?
          <ExistWalletInfoComponent
              generateNewWallet={this.props.generateNewWallet}
              wallet={this.props.wallet}
          /> :
          <NewWalletInfoComponent generateNewWallet={this.props.generateNewWallet} />
        }
      </div>
    );
  }
}

WalletInfoComponent.propTypes = {
  user: PropTypes.object.isRequired,
  wallet: PropTypes.object,
  generateNewWallet: PropTypes.func.isRequired,
  newGenerateWallet: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.profile.user,
    newGenerateWallet: state.policy.newGenerateWallet,
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
)(WalletInfoComponent);
