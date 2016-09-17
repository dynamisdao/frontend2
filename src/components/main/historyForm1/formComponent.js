import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';

import PositionPanelComponent from './positionPanel';
import CalendarPanelComponent from './calendarPanel';

import { urls } from '../../../routes';

export const fields = [
  'companyName', 'jobTitile',
  'city', 'state', 'from', 'to',
  'confirmerName', 'confirmerEmail'];

const dataList = [
  '01.2016', '02.2016', '03.2016', '04.2016', '05.2016', '06.2016', '07.2016', '08.2016',
  '09.2016', '10.2016', '11.2016', '12.2016'
];

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
    this.state = {
      isCurrentWork: false,
      fromValue: 'from',
      toValue: 'to'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.renderInputField = this.renderInputField.bind(this);
    this.handleToSelectField = this.handleToSelectField.bind(this);
    this.handleFromSelectField = this.handleFromSelectField.bind(this);
    this.handleCheckBoxField = this.handleCheckBoxField.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete(event) {
    event.preventDefault();
    browserHistory.push(urls.main.coverageForm.path);
  }

  handleSubmit(values) {
    const position = values;
    position.id = this.props.positionList.length + 1;
    position.to = this.state.toValue;
    position.from = this.state.fromValue;
    position.isCurrentWork = this.state.isCurrentWork;
    this.props.addPosition(position);
    this.props.initialize();
    this.setState({
      fromValue: 'from',
      toValue: 'to'
    });
  }

  handleEdit(position) {
    return (event) => {
      event.preventDefault();
      this.props.initialize(position);
      this.setState({
        toValue: position.to,
        fromValue: position.from,
        isCurrentWork: position.isCurrentWork
      });
      this.props.editPosition(position.id);
    };
  }

  handleToSelectField(event) {
    this.setState({ toValue: event.target.value });
  }

  handleFromSelectField(event) {
    this.setState({ fromValue: event.target.value });
  }

  handleCheckBoxField() {
    this.setState({ isCurrentWork: !this.state.isCurrentWork });
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
    const { isCurrentWork } = this.state;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-head">
          <h2>Employment History</h2>
          <h5>enter your last 4 years of employment</h5>
          <div className="form-head-inner">
            {positionList.map(position =>
              <PositionPanelComponent key={position.id} position={position} edit={this.handleEdit(position)} />
            )}
            {positionList.length > 0 ?
              <CalendarPanelComponent positionList={positionList} /> : null
            }
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
                      <select
                        onChange={this.handleFromSelectField}
                        value={this.state.fromValue}
                        name="field-to" id="field-to"
                        className="select"
                      >
                        <option value="">From</option>
                        {dataList.map(date =>
                          <option key={date} value={date}>{date}</option>
                        )}
                      </select>
                    </div>
                  </div>
                  {!isCurrentWork ?
                    <div className="form-col form-col-1of2">
                      <label htmlFor="field-to" className="form-label hidden">To</label>
                      <div className="form-controls">
                        <select
                          onChange={this.handleToSelectField}
                          value={this.state.toValue}
                          name="field-to" id="field-to"
                          className="select"
                        >
                          <option value="">To</option>
                          {dataList.map(date =>
                            <option key={date} value={date}>{date}</option>
                          )}
                        </select>
                      </div>
                    </div> : null
                  }
                </div>
                <div className="form-col form-col-1of3">
                  <div className="checkbox">
                    <input
                      checked={this.state.isCurrentWork}
                      onChange={this.handleCheckBoxField}
                      value={this.state.isCurrentWork}
                      type="checkbox" name="field-currently-work-here"
                      id="field-currently-work-here"
                    />
                    <label className="form-label checked" htmlFor="field-currently-work-here">I currently work here</label>
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
          
            <button
              className={positionList.length === 0 ?
                'btn btn-silver btn-big btn-big-secondary' :
                'btn btn-blue btn-big btn-big-secondary'
              }
              disabled={positionList.length === 0}
              onClick={this.handleComplete}
            >
              Complete Section
            </button>
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
  positionList: PropTypes.array.isRequired,
  initialize: PropTypes.func.isRequired,
  editPosition: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'synchronousValidation',
  validate
})(HistoryForm);

