import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import * as ProfileActions from '../../actions/profile';
import { urls } from '../../routes';
import FooterComponent from '../base/footer/component';
import HeaderLogedComponent from '../base/headerLoged/component';

class DetailsComponent extends Component {

  componentWillMount() {
    if (window.localStorage.accountId) {
      this.props.fetchProfile(window.localStorage.accountId);
    } else {
      this.props.relogin();
      browserHistory.push(urls.login.path);
    }
  }

  render() {
    return (
      <div className="wrapper">
        <HeaderLogedComponent />
        <div className="main">
          <div className="shell">
            {this.props.children}
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

DetailsComponent.propTypes = {
  children: PropTypes.element.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  relogin: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProfileActions, dispatch);
}

export default connect(undefined, mapDispatchToProps)(DetailsComponent);
