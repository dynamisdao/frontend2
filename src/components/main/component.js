import React, { Component, PropTypes } from 'react';
import Progress from 'react-progress-2';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import * as ProfileActions from '../../actions/profile';
import FooterComponent from '../base/footer/component';
import HeaderLogedComponent from '../base/headerLoged/component';
import { urls } from '../../routes';

const pathsWithNavigationMenu = ['/policy'];

class MainComponent extends Component {

  componentDidMount() {
    if (!this.props.user.keybase_username && !this.props.policy.data) {
      const accountId = window.localStorage.getItem('accountId');
      if (accountId) {
        Progress.show();
        this.props.fetchProfile(accountId, () => Progress.hide());
      } else {
        this.props.relogin();
        browserHistory.push(urls.login.path);
      }
    }
  }

  render() {
    const { user, policy } = this.props;
    const renderInitialPage = () => (
      <div className="panel-initial">
        <span className="logo">Dynamis</span>
      </div>
    );
    const { location } = this.props;
    return (
      <div className="wrapper">
        {user.keybase_username && policy.data ?
          <div>
            <HeaderLogedComponent
              isNavigation={pathsWithNavigationMenu.indexOf(location.pathname) !== -1}
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
  fetchProfile: PropTypes.func.isRequired,
  relogin: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProfileActions, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.profile.user,
    policy: state.policy.policy
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
