import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as ProfileActions from '../../../actions/profile';
import { urls } from '../../../routes';

class HeaderLogedComponent extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    const accountId = window.localStorage.getItem('accountId');
    if (accountId) this.props.fetchProfile(accountId);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
    browserHistory.push(urls.index.path);
  }

  render() {
    const { user, logout } = this.props;
    return (
      <header className="header header-secondary header-loged">
        <a href="" className="logo">Dynamis</a>
        <nav className="nav nav-user">
          <ul>
            <li>
              <a href="" className="dropdown-trigger">
                <img src="src/assets/css/images/avatar.png" alt="Deon Elliott" width="39" height="39" />
                Your logged in as
                <strong><i className="material-icons">arrow_drop_down</i> {user.keybase_username}</strong>
              </a>
              <div className="dropdown">
                <ul>
                  <li>
                    <a href="" onClick={this.handleLogout}>Logout</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

HeaderLogedComponent.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  fetchProfile: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.profile.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProfileActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogedComponent);
