import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';

import { urls } from '../../../../routes';
import * as PolicyActions from '../../../../actions/policy';
import CustomSpiner from '../../../base/spiner/component';

class PolicyPoolComponent extends Component {

  componentWillMount() {
    this.props.getReviewTasks();
  }

  render() {
    const { reviewTasks } = this.props;
    return (
      <div className="panel panel-pool">
        <header className="panel-head">
          <i className="ico-umbrellas" />
          <h2 className="panel-title">Verification Tasks</h2>
        </header>
        <div className="panel-body">
          {!reviewTasks ?
            <CustomSpiner /> :
            <div className="panel-peers">
              {reviewTasks.map(task =>
                <Link to={`${urls.main.policy.reviewTask.path}${task.id}`} key={task.id}>
                  <div className="panel-task">
                    <i className="material-icons">&#xE7FD;</i>
                    <span>{task.id}</span>
                    <span>{task.type}</span>
                    <span className="link-add material-icons">&#xE145;</span>
                  </div>
                </Link>
              )}
               {/*
                <table>
                  <tbody>
                     <tr>
                    <td>
                      <i className="material-icons">&#xE7FD;</i>
                    </td>
                    <td>
                      Lyne Knight
                    </td>
                    <td>
                      Insr. Score <span className="score">133</span>
                    </td>
                    <td>
                      <a href="" className="link-add material-icons">&#xE145;</a>
                    </td>
                  </tr>
              </tbody>
            </table>*/}
            </div>
          }
        </div>
        <footer className="panel-foot">
        </footer>
      </div>
    );
  }
}

PolicyPoolComponent.propTypes = {
  reviewTasks: PropTypes.array,
  getReviewTasks: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    reviewTasks: state.policy.reviewTasks
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PolicyActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(PolicyPoolComponent);
