import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as PolicyActions from '../../../../actions/policy';
import CustomSpiner from '../../../base/spiner/component';

class ReviewTaskInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultValue: 'yes',
      reasonValue: '',
      isValid: true
    };
    this.handleResultValue = this.handleResultValue.bind(this);
    this.handleReasonValue = this.handleReasonValue.bind(this);
    this.handleSignValue = this.handleSignValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleResultValue(value) {
    return () => {
      this.setState({ resultValue: value });
    };
  }

  handleReasonValue(event) {
    this.setState({ reasonValue: event.target.value });
  }

  handleSignValue(event) {
    this.setState({ signValue: event.target.value, isValid: true });
  }

  handleSubmit(event) {
    if (!this.state.signValue) {
      this.setState({ isValid: false });
    } else {
      event.preventDefault();
      this.props.signReviesTask(this.props.reviewTask.id, { signed_message: this.state.signValue });
    }
  }

  render() {
    const getRadioFireld = (label, value, state, handler, defaultChecked) => (
      <li>
        <div className="radio">
          <input
            type="radio"
            name={state}
            id={label}
            onClick={handler}
            defaultChecked={defaultChecked}
          />
          <label className="form-label" htmlFor={label}>{label}</label>
        </div>
      </li>
    );
    const { reviewTask, isFetched } = this.props;
    const { resultValue, reasonValue, isValid } = this.state;
    return (
      <div className="panel">
        <div className="panel-head">
          <div className="panel-head-radio">
            {getRadioFireld('Verify', 'yes', 'radio', this.handleResultValue('yes'), true)}
          </div>
          <div className="panel-head-radio">
            {getRadioFireld('Falsify', 'no', 'radio', this.handleResultValue('no'))}
          </div>
          <div className="panel-head-radio">
            {getRadioFireld('Can\'t tell', 'null', 'radio', this.handleResultValue('null'))}
          </div>
          <h2 className="panel-title">Verification Task</h2>
        </div>
        {reviewTask.data ?
          <div className="panel-body panel-verefication">
            <div className="form">
              <div className="form-head">
                <h5>Here is copy on how to verify this person's employment history records.</h5>
              </div>
              <div className="form-controls">
                <span>{reviewTask.data.notes}</span>
              </div>
              <div className="form-controls">
                <textarea
                  type="text" rows="5" className="field"
                  placeholder="Reason"
                  onChange={this.handleReasonValue}
                />
              </div>
              <div className="form-controls">
                <h5>Please sign this:</h5>
              </div>
              <div className="form-controls">
                <textarea
                  type="text" rows="5" className="field"
                  value={
                    JSON.stringify({
                      task_hash: 'things',
                      result: resultValue,
                      reason: reasonValue
                    })
                  }
                />
              </div>
              <div className="form-controls">
                <textarea
                  type="text" rows="5" className="field"
                  placeholder="Signature"
                  onChange={this.handleSignValue}
                />
                {!isValid ? <p className="error">'Required'</p> : null}
              </div>
              <div className="form-action text-center">
                <button
                  className="btn btn-center"
                  onClick={this.handleSubmit}
                  disabled={isFetched}
                >
                  {isFetched ? <i className="fa fa-spin fa-spinner" /> : <i className="fa fa-pencil" />}
                  <span>&nbsp;Submit</span>
                </button>
              </div>
            </div>
          </div> : <CustomSpiner />
        }
      </div>
    );
  }
}

ReviewTaskInfoComponent.propTypes = {
  reviewTask: PropTypes.object.isRequired,
  signReviesTask: PropTypes.func.isRequired,
  isFetched: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isFetched: state.policy.isFetched
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PolicyActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewTaskInfoComponent);
