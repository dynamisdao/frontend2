import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { urls } from '../../../../routes';

import InitInfoComponent from './initInfoComponent';
import DepositInfoComponent from './depositInfoComponent';
import WalletInfoComponent from './wallet/component';
import ReviewTaskInfoComponent from './reviewTask/component';

class PolicyInfoComponent extends Component {

  render() {
    const renderPool = () => {
      switch (this.props.poolState.state) {
        case ('init'):
          return <InitInfoComponent />;
        case ('depositInfo'):
          return <DepositInfoComponent />;
        case ('wallet'):
          return <WalletInfoComponent />;
        case ('reviewTask'):
          return <ReviewTaskInfoComponent reviewTask={this.props.poolState.reviewTask} />;
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
  poolState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    poolState: state.policy.poolState
  };
}

export default connect(mapStateToProps)(PolicyInfoComponent);
