import React, { Component, PropTypes } from 'react';
import Progress from 'react-progress-2';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import * as ProfileActions from '../../actions/profile';
import FooterComponent from './footer/component';
import HeaderSecondaryComponent from './headerSecondary/component';


class BaseComponent extends Component {

  render() {
    return (
      <div className="wrapper">
        <HeaderSecondaryComponent />
          {this.props.children}
        <FooterComponent />
      </div>
    );
  }
}

BaseComponent.propTypes = {
  children: PropTypes.element.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.profile.user,
    policy: state.policy.policy
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProfileActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseComponent);
