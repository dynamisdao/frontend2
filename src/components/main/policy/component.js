import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as HistoryActions from '../../../actions/history';

import { urls } from '../../../routes';
import { getSignApplication } from '../../../utils';

class PolicyComponent extends Component {

  render() {
    return (
      <section className="section section-policy">
        <h1 className="title title-primary">My Policy</h1>
        <section className="section section-policy">
          <div className="cols">
            <div className="col col-3of5">
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
                        Payment &amp; Claim History
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
                  <a href="" className="btn btn-large">More Policy Details</a>
                </footer>
              </div>
            </div>
            <div className="col col-2of5">
              <div className="panel panel-details">
                <header className="panel-head">
                  <div className="panel-head-aside">
                    <p>$2/Mo.</p>
                  </div>
                  <h2 className="panel-title">Policy Details</h2>
                </header>
                <div className="panel-body">
                  <div className="table table-policy-details">
                    <table>
                      <colgroup>
                        <col className="col-title" />
                        <col className="col-detail" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <td>Policy #</td>
                          <td>A28461677</td>
                        </tr>
                        <tr>
                          <td>Coverage</td>
                          <td>50% of monthly salary</td>
                        </tr>
                        <tr>
                          <td>Effective Date</td>
                          <td>1/21/2016</td>
                        </tr>
                        <tr>
                          <td>Eligibility</td>
                          <td>12 days to elegibility</td>
                        </tr>
                        <tr>
                          <td>Payment Plan</td>
                          <td>Monthly – Manual Pay</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <a href="" className="btn btn-block">
                    <i className="material-icons">credit_card</i>

                    Make Your September 31st Payment Now
                  </a>
                </div>

                <footer className="panel-foot">
                  <a href="" className="link-edit">Edit Policy</a>

                  <a href="" className="link-more material-icons">more_vert</a>
                </footer>
              </div>

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
  positionList: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  createPolicy: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    positionList: state.history.positionList,
    user: state.profile.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HistoryActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PolicyComponent);
