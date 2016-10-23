import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as PolicyActions from '../../../../actions/policy';
import CustomSpiner from '../../../base/spiner/component';

class ReviewTaskInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultValue: 'null',
      reasonValue: ''
    };
    this.handleResultValue = this.handleResultValue.bind(this);
    this.handleReasonValue = this.handleReasonValue.bind(this);
  }

  handleResultValue(value) {
    return () => {
      this.setState({ resultValue: value });
    };
  }

  handleReasonValue(event) {
    this.setState({ reasonValue: event.target.value });
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
    const { reviewTask } = this.props;
    return (
      <div className="panel">
        <div className="panel-head">
          <div className="panel-head-radio">
            {getRadioFireld('Verify', 'yes', 'radio', this.handleResultValue('yes'))}
          </div>
          <div className="panel-head-radio">
            {getRadioFireld('Falsify', 'no', 'radio', this.handleResultValue('no'))}
          </div>
          <div className="panel-head-radio">
            {getRadioFireld('Can\'t tell', 'null', 'radio', this.handleResultValue('null'), true)}
          </div>
          <h2 className="panel-title">Varefication Task</h2>
        </div>
        {reviewTask.data ?
          <div className="panel-body panel-verefication">
            <div className="form form-notes">
              <div className="form-head">
                <h5>Here is copy on how to verify this person's employment history records.</h5>
              </div>
              <div className="form-controls">
                <span>{reviewTask.data.notes}</span>
              </div>
            </div>
            <div className="form form-reason">
              <div className="form-controls">
                <textarea
                  type="text" rows="5" className="field"
                  placeholder="Reason"
                  onKeyPress={this.handleReasonValue}
                />
              </div>
              <div className="form-controls">
                <h5>Please sign this:</h5>
                <textarea
                  disabled
                  type="text" rows="5" className="field"
                  value={
                    JSON.stringify({
                      task_hash: 'things',
                      result: this.state.resultValue,
                      reason: this.state.reasonValue
                    })
                  }
                />
              </div>
              <div className="form-controls">
                <textarea
                  type="text" rows="5" className="field"
                  placeholder="Signature"
                />
              </div>
              <div className="form-controls">
                <button className="btn btn-block">Submit</button>
              </div>
            </div>
          </div> : <CustomSpiner />
        }
      </div>
    );
  }
}

ReviewTaskInfoComponent.propTypes = {
  reviewTask: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PolicyActions, dispatch);
}

export default connect(undefined, mapDispatchToProps)(ReviewTaskInfoComponent);
