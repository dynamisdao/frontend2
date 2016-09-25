import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as HistoryActions from '../../../actions/history';

import { urls } from '../../../routes';
import { getSignApplication } from '../../../utils';

class SignFormComponent extends Component {
  constructor(props){
    super(props);
    this.handleEditPositions = this.handleEditPositions.bind(this);
  }

  handleEditPositions(event) {
    event.preventDefault();
    browserHistory.push(urls.main.historyForm1.path);
  }

  componentWillMount() {
    if (this.props.positionList.length === 0) {
      browserHistory.push(urls.main.historyForm1.path);
    }
  }
  render() {
    const getFeatureField = (title, value) => (
      <li className="feature">
        <h6>{title}</h6>
        <p>{value}</p>
      </li>
    );
    const { positionList, user } = this.props;
    return (
      <section className="section section-form section-form-quaternary section-finalize">
        <h5 className="section-title">Create a Policy</h5>
        <div className="section-inner">
          <div className="section-body">
            <div className="section-content">
              <div className="package">
                <header className="package-head">
                  <h2>Your Coverage</h2>
                  <h5>Based on your perameters and level of peer-to-peer verification</h5>
                </header>
                <div className="package-content">
                  <div className="package-body">
                    <ul className="features">
                      {getFeatureField('Your Premium', '$6/month')}
                      {getFeatureField('Your Coverage', '$1100/month')}
                      {getFeatureField('Duration', '4 month max.')}
                      {getFeatureField('Deposit', '$100')}
                    </ul>
                  </div>
                  <footer className="package-foot">
                    <div className="form form-signature">
                      <form action="?" method="post">
                        <div className="form-head">
                          <h5>Sign Application</h5>
                        </div>
                        <div className="form-content">
                          <div className="form-body">
                            <div className="form-row">
                              <label htmlFor="field-singature" className="form-label hidden">Your Keybase Signature</label>
                              <div className="form-controls">
                                <textarea
                                  defaultValue={getSignApplication(positionList, user)}
                                  type="text" rows="10" className="field"
                                  name="field-singature" id="field-singature"
                                  placeholder="Your Keybase Signature"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="form-hint">
                      To complete your application, you must sign all your information here with keybase:
                      <a href="https://keybase.io/sign" target="_blank" className="link"> https://keybase.io/sign.</a>
                      This will verify that all your information is accurate and we didn't change it.
                    </div>
                  </footer>
                  <footer className="package-foot">
                    <div className="form form-signature">
                      <form action="?" method="post">
                        <div className="form-head">
                          <h5>Accept Policy</h5>
                        </div>
                        <div className="form-content">
                          <div className="form-body">
                            <div className="form-row">
                              <label htmlFor="field-singature" className="form-label hidden">Your Keybase Signature</label>
                              <div className="form-controls">
                                <textarea type="text" rows="10" className="field" name="field-singature" id="field-singature" placeholder="Your Keybase Signature" />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                      </form>
                    </div>
                    <div className="form-hint">
                      <div className="form-actions">
                        <button type="submit" className="btn btn-blue btn-big btn-big-secondary">Submit For Review</button>
                      </div>
                      <br />
                      <a href="" onClick={this.handleEditPositions} className="link">No, I need to edit my perameters</a>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

SignFormComponent.propTypes = {
  positionList: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(SignFormComponent);
