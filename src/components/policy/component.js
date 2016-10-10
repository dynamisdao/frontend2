import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as HistoryActions from '../../actions/history';
import { urls } from '../../routes';

import CustomSpiner from '../base/spiner/component';
import PolicyDetailsComponent from './details/component';
import PolicyInfoComponent from './info/component';
import PolicyPoolComponent from './pool/component';

class PolicyComponent extends Component {

  render() {
    const { user } = this.props;
    return (
      <section className="section section-policy">
        <h1 className="title title-primary">My Policy</h1>
        <section className="section section-policy">
          <div className="cols">
            <div className="col col-3of5">
              <PolicyInfoComponent />
            </div>
            <div className="col col-2of5">
              <div className="panel panel-details">
                {!user.id ?
                  <CustomSpiner /> :
                  <PolicyDetailsComponent />
                }
              </div>
              <PolicyPoolComponent />
            </div>
          </div>
        </section>
      </section>
    );
  }
}

PolicyComponent.propTypes = {
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.profile.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HistoryActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PolicyComponent);
