import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as HistoryActions from '../../../actions/history';
import PositionPanelComponent from '../historyForm1/positionPanel';
import CalendarPanelComponent from '../historyForm1/calendarPanel';
import HeaderStep from '../../base/headerStep/component';

import { urls } from '../../../routes';

require('rc-slider/assets/index.css');

class AssessmentFormComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditPositions = this.handleEditPositions.bind(this);
    this.handleAdjustCoverage = this.handleAdjustCoverage.bind(this);
    this.handleWorkPeriod = this.handleWorkPeriod.bind(this);
    this.handleCoveragePeriod = this.handleCoveragePeriod.bind(this);
  }

  componentWillMount() {
    if (this.props.positionList.length === 0) {
      browserHistory.push(urls.main.historyForm1.path);
    }
  }

  handleEditPositions(event) {
    event.preventDefault();
    browserHistory.push(urls.main.historyForm1.path);
  }

  handleAdjustCoverage(event) {
    event.preventDefault();
    browserHistory.push(urls.main.coverageForm.path);
  }

  handleSubmit(event) {
    event.preventDefault();
    browserHistory.push(urls.main.signForm.path);
  }

  handleWorkPeriod(value) {
    return () => {
      this.setState({ workPeriod: value });
    };
  }

  handleCoveragePeriod(value) {
    return () => {
      this.setState({ coveragePeriod: value });
    };
  }

  render() {
    const { positionList } = this.props;
    const getRadioFireld = (label, name, handler) => (
      <li>
        <div className="radio">
          <input type="radio" name={name} id={label} onClick={handler} />
          <label className="form-label" htmlFor={label}>{label}</label>
        </div>
      </li>
    );
    return (
      <section className="section section-form">
        <h5 className="section-title">Create a Policy</h5>
        <div className="section-inner">
          <HeaderStep currenStep={5} />
          <div className="section-body">
            <div className="section-group-quaternary">
              <div className="form form-history">
                <div className="form-head">
                  <h2>
                    <i className="ico-check-secondary" />
                    Employment History
                  </h2>
                  <a href="" onClick={this.handleEditPositions} className="link">edit positions</a>
                  <div className="form-head-inner">
                    {positionList.map(position =>
                      <PositionPanelComponent
                        key={position.id}
                        position={position}
                      />
                    )}
                    {positionList.length > 0 ?
                      <CalendarPanelComponent positionList={positionList} /> : null
                    }
                  </div>
                  <h2>Desired Coverage</h2>
                  <p>
                    Below is an estimate of benefits.
                    <br />
                    As your application becomes more complete you can see
                    how this affects your premiums and your coverage:
                  </p>
                </div>
              </div>
              <div className="coverage">
                <div className="coverage-head">
                  <h2>
                    <i className="ico-check-secondary" />
                    Desired Coverage
                  </h2>
                  <a href="" onClick={this.handleAdjustCoverage} className="link">adjust coverage</a>
                </div>
                <div className="coverage-body">
                  <ul className="prices prices-secondary">
                    <li className="price">
                      <h5>Your Estimated Premium:</h5>
                      <p>$8/month</p>
                    </li>
                    <li className="price price-secondary">
                      <h5>While Your Coverage Could Be:</h5>
                      <p>$1100/month</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="form form-assessment">
                <div className="form-head">
                  <h2>Self Assessment</h2>
                  <a href="" className="link">
                    <i className="material-icons">info_outline</i>
                    more info
                  </a>
                </div>
                <div className="form-body">
                  <section className="form-section">
                    <p>
                      In a perfect world how long do you see yourself staying
                      with your present employer? Some things to consider
                      <br />
                      might be going back to school or starting a family.
                    </p>
                    <ul className="list-radios">
                      {getRadioFireld('Less than 1 year', 'workPeriod', this.handleWorkPeriod('less_1_year'))}
                      {getRadioFireld('In about 1 year', 'workPeriod', this.handleWorkPeriod('in_about_1_year'))}
                      {getRadioFireld('Before the end of next year', 'workPeriod', this.handleWorkPeriod('before_end_2_year'))}
                      {getRadioFireld('Maybe before 2 years time', 'workPeriod', this.handleWorkPeriod('before_2_year'))}
                      {getRadioFireld('More than 2 years', 'workPeriod', this.handleWorkPeriod('more_than_2_year'))}
                      {getRadioFireld(
                        'I love my job. I will work for my present employer till the day I die. :)',
                        'workPeriod',
                        this.handleWorkPeriod('all_time')
                      )}
                    </ul>
                  </section>
                  <section className="form-section">
                    <p>
                      If and when you finally do need coverage about how long do you
                      suppose you might need it for?
                      <br />
                      Some things to consider might be the acquiring of a new skill,
                      moving to a new industry, starting a completely new career.
                    </p>
                    <ul className="list-radios">
                      {getRadioFireld('About 1 to 2 weeks', 'coveragePeriod', this.handleCoveragePeriod('about_1_to_2_week'))}
                      {getRadioFireld('Maybe 3 weeks to 1 month', 'coveragePeriod', this.handleCoveragePeriod('about_3_to_1_month'))}
                      {getRadioFireld('Perhaps 1 to 2 months', 'coveragePeriod', this.handleCoveragePeriod('about_1_to_2_month'))}
                      {getRadioFireld('Possibly 2 to 3 months', 'coveragePeriod', this.handleCoveragePeriod('about_2_to_3_month'))}
                      {getRadioFireld('Potentially 3 to 4 months', 'coveragePeriod', this.handleCoveragePeriod('about_4_to_4_month'))}
                      {getRadioFireld(
                        'I will need more than 4 months of coverage.',
                        'coveragePeriod',
                        this.handleCoveragePeriod('more_than_4_month')
                        )}
                    </ul>
                  </section>
                </div>
                <div className="form-actions">
                  <button onClick={this.handleSubmit} className="btn btn-blue btn-big btn-big-secondary" >
                    Submit Estimate
                  </button>
                  <a href="" className="link">Wait, I want to edit my settings</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

AssessmentFormComponent.propTypes = {
  positionList: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    positionList: state.history.positionList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HistoryActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentFormComponent);
