import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as HistoryActions from '../../../actions/history';
import { urls } from '../../../routes';

import PolicyDetailsComponent from './details/component';
import PolicyPoolComponent from './pool/component';

class PolicyComponent extends Component {

  render() {
    return (
      <section className="section section-policy">
        <h1 className="title title-primary">My Policy</h1>
        <section className="section section-policy">
          <div className="cols">
            <div className="col col-3of5">
              <PolicyPoolComponent />
            </div>
            <div className="col col-2of5">
              {this.props.user.id ?
                <PolicyDetailsComponent /> : null
              }
              <div className="panel panel-pool">
                <header className="panel-head">
                  <i className="ico-umbrellas" />
                  <h2 className="panel-title">My P2P Pool</h2>
                </header>
                <div className="panel-body">
                  <div className="table table-peers">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <i className="material-icons">&#xE7FD;</i>
                          </td>
                          <td>
                            Fred Smith
                          </td>
                          <td>
                            Insr. Score <span className="score">128</span>
                          </td>
                          <td>
                            <a href="" className="link-add material-icons">&#xE145;</a>
                          </td>
                        </tr>
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
                        <tr>
                          <td>
                            <i className="material-icons">&#xE7FD;</i>
                          </td>
                          <td>
                            Joe Mann
                          </td>
                          <td>
                            Insr. Score <span className="score">198</span>
                          </td>
                          <td>
                            <a href="" className="link-add material-icons">&#xE145;</a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="material-icons">&#xE7FD;</i>
                          </td>
                          <td>
                            Larry Bird
                          </td>
                          <td>
                            Insr. Score <span className="score">111</span>
                          </td>
                          <td>
                            <a href="" className="link-add material-icons">&#xE145;</a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="material-icons">&#xE7FD;</i>
                          </td>
                          <td>
                            Betty Ford
                          </td>
                          <td>
                            Insr. Score <span className="score">98</span>
                          </td>
                          <td>
                            <a href="" className="link-add material-icons">&#xE145;</a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="material-icons">&#xE7FD;</i>
                          </td>
                          <td>
                            Jem Smith
                          </td>
                          <td>
                            Insr. Score <span className="score">221</span>
                          </td>
                          <td>
                            <a href="" className="link-add material-icons">&#xE145;</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <footer className="panel-foot">
                  <a href="" className="link-invite">Invite Peers</a>
                  <a href="" className="link-more material-icons">more_vert</a>
                </footer>
              </div>
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
