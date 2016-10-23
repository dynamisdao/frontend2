import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ProfileActions from '../../../actions/profile';
import { urls } from '../../../routes';

const accountId = window.localStorage.getItem('accountId');

class IndexComponent extends Component {

  componentWillMount() {
    if (accountId) {
      this.props.fetchProfile(accountId);
    }
  }
  render() {
    const handleLink = (event) => {
      event.preventDefault();
      if (window.localStorage.getItem('username')) {
        browserHistory.push(urls.accountCreation.path);
      } else {
        browserHistory.push(urls.identity.path);
      }
    };

    return (
      <div className="intro">
        <div className="shell">
          <div className="intro-inner">
            <div className="intro-content">
              <p>
                <strong>Dynamis</strong> is
                  a peer to peer income coverage app which offers a better way
                  to manage the costs and risks associated with severance benefits.
                <a href="" className="link">…learn more</a>
              </p>
            </div>
            <div className="intro-actions">
              <a href="" onClick={handleLink} className="btn btn-white">Create a Policy</a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

IndexComponent.propTypes = {
  fetchProfile: PropTypes.func.isRequired
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProfileActions, dispatch);
}
export default connect(undefined, mapDispatchToProps)(IndexComponent);
