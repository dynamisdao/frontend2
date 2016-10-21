import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { urls } from '../../../../routes';
import NewWalletInfoComponent from './newWallet/component';
import ExistWalletInfoComponent from './existWallet/component';

class WalletInfoComponent extends Component {
  render() {
    return (
      <div className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Wallet</h2>
        </div>
        <ExistWalletInfoComponent />
      </div>
    );
  }
}

WalletInfoComponent.propTypes = {
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.profile.user
  };
}

export default connect(mapStateToProps)(WalletInfoComponent);
