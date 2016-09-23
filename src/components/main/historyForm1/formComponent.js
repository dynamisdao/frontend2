import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';

import PositionPanelComponent from './positionPanel';
import CalendarPanelComponent from './calendarPanel';

import { urls } from '../../../routes';
import { getMonthsQuantity } from '../../../utils';

export const fields = [
  'companyName', 'jobTitile',
  'city', 'state', 'from', 'to',
  'confirmerName', 'confirmerEmail'];

const dataList = [
  '01.2013', '02.2013', '03.2013', '04.2013', '05.2013', '06.2013', '07.2013', '08.2013',
  '09.2013', '10.2013', '11.2013', '12.2013',
  '01.2014', '02.2014', '03.2014', '04.2014', '05.2014', '06.2014', '07.2014', '08.2014',
  '09.2014', '10.2014', '11.2014', '12.2014',
  '01.2015', '02.2015', '03.2015', '04.2015', '05.2015', '06.2015', '07.2015', '08.2015',
  '09.2015', '10.2015', '11.2015', '12.2015',
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
      toValue: 'to',
      fromIsValid: true,
      toIsValid: true,
      dataIsValid: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
    if ((this.state.toValue !== 'to' || this.state.fromValue !== 'from') && this.state.dataIsValid) {
      const position = values;
      position.id = this.props.positionList.length + 1;
      position.to = this.state.toValue;
      position.from = this.state.fromValue;
      position.isCurrentWork = this.state.isCurrentWork;
      this.props.addPosition(position);
      this.props.initialize();
      this.setState({
        fromValue: 'from',
        toValue: 'to',
        isCurrentWork: false
      });
    } else if (this.state.dataIsValid) {
      this.setState({
        fromIsValid: false,
        toIsValid: false
      });
    }
  }

  handleEdit(position) {
    return (event) => {
      event.preventDefault();
      this.props.initialize(position);
      this.setState({
        toValue: position.to,
        fromValue: position.from,
        isCurrentWork: position.isCurrentWork,
        fromIsValid: true,
        toIsValid: true,
        dataIsValid: true
      });
      this.props.deletePosition(position.id);
    };
  }

  handleDelete(position) {
    return (event) => {
      event.preventDefault();
      this.props.deletePosition(position.id);
    };
  }

  handleToSelectField(event) {
    const value = event.target.value;
    if (value === 'to') {
      this.setState({ toIsValid: false });
    } else {
      this.setState({ toIsValid: true });
    }
    if (this.state.fromValue !== 'from') {
      if (value.split('.')[1] < this.state.fromValue.split('.')[1] ||
        (value.split('.')[1] === this.state.fromValue.split('.')[1] &&
          value.split('.')[0] < this.state.fromValue.split('.')[0])) {
        this.setState({ dataIsValid: false });
      } else {
        this.setState({ dataIsValid: true });
      }
    }
    this.setState({ toValue: value });
  }

  handleFromSelectField(event) {
    const value = event.target.value;
    if (value === 'from') {
      this.setState({ fromIsValid: false });
    } else {
      this.setState({ fromIsValid: true });
    }
    if (this.state.toValue !== 'to') {
      if (value.split('.')[1] > this.state.toValue.split('.')[1] ||
        (value.split('.')[1] === this.state.toValue.split('.')[1] &&
          value.split('.')[0] > this.state.toValue.split('.')[0])) {
        this.setState({ dataIsValid: false });
      } else {
        this.setState({ dataIsValid: true });
      }
    }
    this.setState({ fromValue: value });
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
    const { isCurrentWork, toIsValid, fromIsValid, dataIsValid } = this.state;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-head">
          <h2>Employment History</h2>
          <h5>enter your last 4 years of employment</h5>
          <div className="form-head-inner">
            {positionList.map(position =>
              <PositionPanelComponent
                key={position.id} position={position}
                edit={this.handleEdit(position)}
                delete={this.handleDelete(position)}
                monthsQuantity={getMonthsQuantity([position]).quantity}
              />
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
                        <option value="from">From</option>
                        {dataList.map(date =>
                          <option key={date} value={date}>{date}</option>
                        )}
                      </select>
                      {!fromIsValid ? <span className="error">Required</span> : null}
                      {!dataIsValid ? <span className="error">From should be later To</span> : null}
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
                          <option value="to">To</option>
                          {dataList.map(date =>
                            <option key={date} value={date}>{date}</option>
                          )}
                        </select>
                        {!toIsValid ? <span className="error">Required</span> : null}
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
                    <label className="form-label" htmlFor="field-currently-work-here">
                      I currently work here
                    </label>
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
                <a href="" className="link">e.g. pay stub, acceptance letter, 401k</a>
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
  deletePosition: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'synchronousValidation',
  validate
})(HistoryForm);

