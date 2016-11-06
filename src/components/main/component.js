import React, { Component, PropTypes } from 'react';
import Progress from 'react-progress-2';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import * as ProfileActions from '../../actions/profile';
import * as PolicyActions from '../../actions/policy';

import FooterComponent from '../base/footer/component';
import HeaderLogedComponent from '../base/headerLoged/component';
import { urls } from '../../routes';


class MainComponent extends Component {

  componentDidMount() {
    if (!this.props.user.keybase_username && !this.props.policy.data) {
      const accountId = window.localStorage.getItem('accountId');
      if (accountId) {
        Progress.show();
        setTimeout(() => {
          this.props.fetchProfile(accountId, () => Progress.hide());
          if (window.localStorage.keystore) {
            this.props.getWallet();
          }
        }, 1500);
      } else {
        this.props.relogin();
        browserHistory.push(urls.login.path);
      }
    } else if (window.localStorage.keystore) {
      this.props.getWallet();
    }
  }

  render() {
    const { user, policy, wallet, location } = this.props;
    const renderInitialPage = () => (
      <div className="panel-initial">
        <span className="logo">Dynamis</span>
      </div>
    );
    return (
      <div className="wrapper">
        {user.keybase_username && policy.data && wallet?
          <div>
            <HeaderLogedComponent
              isNavigation
            />
            <div className="main">
              <div className="shell">
                {this.props.children}
              </div>
            </div>
            <FooterComponent />
          </div> : <div>{renderInitialPage()}</div>
        }
        <div className="page-main">
          <Progress.Component />
        </div>
      </div>
    );
  }
}

MainComponent.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  policy: PropTypes.object.isRequired,
  wallet: PropTypes.object,
  fetchProfile: PropTypes.func.isRequired,
  getWallet: PropTypes.func.isRequired,
  relogin: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(ProfileActions, PolicyActions), dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.profile.user,
    policy: state.policy.policy,
    wallet: state.policy.wallet
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
