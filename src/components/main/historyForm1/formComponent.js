import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';

import PositionPanelComponent from './positionPanel';

import { urls } from '../../../routes';

export const fields = [
  'companyName', 'jobTitile',
  'city', 'state', 'from', 'to',
  'confirmerName', 'confirmerEmail'];

const validate = values => {
  const errors = {};
  if (!values.confirmerEmail) {
    errors.confirmerEmail = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.confirmerEmail)) {
    errors.confirmerEmail = 'Invalid email address';
  }
  if (!values.companyName) {
    errors.companyName = 'Required';
  }
  if (!values.jobTitile) {
    errors.jobTitile = 'Required';
  }
  if (!values.city) {
    errors.city = 'Required';
  }
  if (!values.state) {
    errors.state = 'Required';
  }
  if (!values.confirmerName) {
    errors.confirmerName = 'Required';
  }
  return errors;
};

class HistoryForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderInputField = this.renderInputField.bind(this);
  }

  handleSubmit(values) {
    this.props.addPosition(values);
    this.props.reset();
  }

  renderInputField({ input, label, type, className, meta: { touched, error } }) {
    return (
      <div className={className}>
        <label htmlFor="field-compant-name" className="form-label hidden">{label}</label>
        <div className="form-controls">
          <input {...input} className="field" placeholder={label} type={type} />
          {touched && error && <span className="error">{error}</span>}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, positionList } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-head">
          <h2>Employment History</h2>
          <h5>enter your last 4 years of employment</h5>
          <div className="form-head-inner">
            {positionList.map(position =>
              <PositionPanelComponent key={position.jobTitile} position={position} />
            )}
          </div>
        </div>
        <div className="form-content">
          <div className="form-body">
            <div className="form-section">
              <h5>Add Position</h5>
              <div className="form-row">
                <Field
                  name="companyName" type="text"
                  component={this.renderInputField} label="Company name"
                  className="form-col form-col-1of3"
                />
                <Field
                  name="jobTitile" type="text"
                  component={this.renderInputField} label="Job Title"
                  className="form-col form-col-1of3"
                />
                <div className="form-col form-col-1of3">
                  <Field
                    name="city" type="text"
                    component={this.renderInputField} label="City"
                    className="form-col form-col-1of2"
                  />
                  <Field
                    name="state" type="text"
                    component={this.renderInputField} label="State"
                    className="form-col form-col-1of2"
                  />
                </div>
              </div>
          
              <div className="form-row">
                <div className="form-col form-col-1of3">
                  <div className="form-col form-col-1of2">
                    <label htmlFor="field-from" className="form-label hidden">From</label>
                    
                    <div className="form-controls">
                      <select name="field-from" id="field-from" className="select">
                        <option value="">From</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-col form-col-1of2">
                    <label htmlFor="field-to" className="form-label hidden">To</label>
                    
                    <div className="form-controls">
                      <select name="field-to" id="field-to" className="select">
                        <option value="">To</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="form-col form-col-1of3">
                  <div className="checkbox">
                    <input type="checkbox" name="field-currently-work-here" id="field-currently-work-here" />
                    
                    <label className="form-label" htmlFor="field-currently-work-here">I currently work here</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-section">
              <h5>Who can confirm this?</h5>
              <div className="form-row">
                <Field
                  name="confirmerName" type="text"
                  component={this.renderInputField} label="Reference Name"
                  className="form-col form-col-1of3"
                />
                <Field
                  name="confirmerEmail" type="text"
                  component={this.renderInputField} label="Their Email"
                  className="form-col form-col-1of3"
                />
              </div>
            </div>
          
            <div className="form-section">
              <h5>Upload Supporting Documents</h5>
          
              <div className="form-row">
                <label htmlFor="field-upload" className="form-label-upload">
                  <input type="file" className="field-upload" name="field-upload" id="field-upload" value="" placeholder="upload" />
          
                  <i className="material-icons">attach_file</i>
                </label>
          
                <a href="#" className="link">e.g. pay stub, acceptance letter, 401k</a>
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn btn-blue btn-big btn-big-secondary">Add Position</button>
          
            <button type="submit" className="btn btn-silver btn-big btn-big-secondary">Complete Section</button>
          </div>
        </div>
      </form>
    );
  }
}

HistoryForm.propTypes = {
  addPosition: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  untouch: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  positionList: PropTypes.array.isRequired
};

export default reduxForm({
  form: 'synchronousValidation',
  validate
})(HistoryForm);

