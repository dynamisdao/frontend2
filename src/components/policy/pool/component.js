import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { urls } from '../../../routes';

import PoolInitComponent from './initPoolComponent';
import DepositInfoPoolComponent from './depositInfoPoolComponent';

class PolicyPoolComponent extends Component {

  render() {
    const renderPool = () => {
      switch (this.props.poolState) {
        case ('init'):
          return <PoolInitComponent />;
        case ('depositInfo'):
          return <DepositInfoPoolComponent />;
        default:
          return <PoolInitComponent />;
      }
    };

    return (
      <div>
        {renderPool()}
      </div>
    );
  }
}

PolicyPoolComponent.propTypes = {
  poolState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    poolState: state.policy.poolState
  };
}

export default connect(mapStateToProps)(PolicyPoolComponent);
