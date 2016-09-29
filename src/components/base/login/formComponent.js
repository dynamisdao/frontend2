import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';

import { urls } from '../../../routes';

export const fields = ['email', 'password'];

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Must be 6 characters or more';
  }
  return errors;
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderField = this.renderField.bind(this);
  }

  handleSubmit(values) {
    this.props.login(
      values,
      () => (browserHistory.push(urls.main.path)),
      () => (this.props.array.removeAll('password'))
    );
    this.props.untouch('password');
  }

  renderField({ input, label, type, meta: { touched, error } }) {
    return (
      <div className="form-row">
        <label htmlFor="field-email" className="form-label hidden">{label}</label>
        <div>
          <input {...input} className="field" placeholder={label} type={type} />
        </div>
        <div>
          {touched && error && <span className="error">{error}</span>}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, isFetched } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-head">
          <h2>Login</h2>
        </div>
        <div className="form-body">
          <Field name="email" type="text" component={this.renderField} label="Your Email" />
          <Field name="password" type="password" component={this.renderField} label="Password" />
        </div>
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-blue btn-big btn-big-secondary"
            disabled={isFetched}
          >
            Login {isFetched ? <i className="fa fa-spin fa-spinner" /> : null}
          </button>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  isFetched: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  array: PropTypes.object.isRequired,
  untouch: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'synchronousValidation',
  validate
})(LoginForm);

