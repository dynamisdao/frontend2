import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as ProfileActions from '../../../actions/profile';
import * as PolicyActions from '../../../actions/policy';
import { urls } from '../../../routes';

class HeaderLogedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {isWalletOpen: false}
    this.handleLogout = this.handleLogout.bind(this);
    this.handleOpenWallet = this.handleOpenWallet.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
    browserHistory.push(urls.index.path);
  }

  handleOpenWallet(event) {
    event.preventDefault();
    if (this.state.isWalletOpen) {
       browserHistory.goBack();
    } else {
      browserHistory.push(urls.main.policy.wallet.path);
    }
    this.setState({isWalletOpen: !this.state.isWalletOpen});
  }

  render() {
    const { user, isNavigation, walletIsOpen } = this.props;
    return (
      <div className={!isNavigation ? 'header header-secondary header-loged' : 'header'}>
        <span className="logo">Dynamis</span>
        {isNavigation ?
          <div>
            <nav className="nav nav-primary">
              <ul>
                <li className="current">
                  <a href="">
                    My<br />
                    Policy
                  </a>
                </li>
                <li>
                  <a href="">
                    Make a<br />
                    Payment
                  </a>
                </li>
                <li>
                  <a href="">
                    Open a<br />
                    Claim
                  </a>
                </li>
                <li>
                  <a href="">
                    Assessor<br />
                    Dashboard
                  </a>
                </li>
              </ul>
            </nav>
            <nav className="nav nav-secondary">
              <ul>
                <li className={walletIsOpen ? 'current' : null}>
                  <a href="" onClick={this.handleOpenWallet}>
                    <i className="ico-wallet" />
                    Wallet
                  </a>
                </li>
              </ul>
            </nav>
          </div> : null
        }
        <div className="nav nav-user">
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
        </div>
      </div>
    );
  }
}

HeaderLogedComponent.propTypes = {
  user: PropTypes.object.isRequired,
  isNavigation: PropTypes.bool,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.profile.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(PolicyActions, ProfileActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogedComponent);
