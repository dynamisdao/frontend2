import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { urls } from '../../../routes';

import InitInfoComponent from './initInfoComponent';
import DepositInfoComponent from './depositInfoComponent';
import WalletInfoComponent from './walletInfoComponent';

class PolicyInfoComponent extends Component {

  render() {
    const renderPool = () => {
      switch (this.props.poolState) {
        case ('init'):
          return <InitInfoComponent />;
        case ('depositInfo'):
          return <DepositInfoComponent />;
        case ('wallet'):
          return <WalletInfoComponent />;
        default:
          return <InitInfoComponent />;
      }
    };

    return (
      <div>
        {renderPool()}
      </div>
    );
  }
}

PolicyInfoComponent.propTypes = {
  poolState: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    poolState: state.policy.poolState
  };
}

export default connect(mapStateToProps)(PolicyInfoComponent);
