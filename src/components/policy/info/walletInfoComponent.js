import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { urls } from '../../../routes';


class WalletInfoComponent extends Component {
  render() {
    return (
      <div className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Wallet</h2>
        </div>
        <div className="panel-body">
          ororor
          <div>
            <a href="" className="btn btn-half-block">Generate New Wallet</a>
            <a href="" className="btn btn-half-block">Upload Wallet</a>
          </div>
        </div>
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
