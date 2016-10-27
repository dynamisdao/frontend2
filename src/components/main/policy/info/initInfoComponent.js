import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { urls } from '../../../../routes';


class InitInfoComponent extends Component {

  render() {
    return (
      <div className="panel panel-options">
        <div className="panel-body">
          <ul className="list-options">
            <li>
              <a href="">
                <i className="ico-verify" />
                Verify My Policy
              </a>
            </li>
            <li>
              <a href="">
                <i className="ico-history" />
                History
              </a>
            </li>
            <li>
              <a href="">
                <i className="ico-claim" />
                Open A Claim
              </a>
            </li>
            <li>
              <a href="">
                <i className="ico-close-policy" />
                Close Policy
              </a>
            </li>
          </ul>
        </div>
        <footer className="panel-foot">
        </footer>
      </div>
    );
  }
}

InitInfoComponent.propTypes = {
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.profile.user
  };
}

export default connect(mapStateToProps)(InitInfoComponent);
