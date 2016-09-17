import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, browserHistory } from 'react-router';
import * as types from '../../../constants/profile';

import { urls } from '../../../routes';

export const fields = ['eth', 'username'];

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
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword !== values.password) {
    errors.password = 'Paswords must match';
  }
  return errors;
};

class AccountCreationForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderField = this.renderField.bind(this);
    this.handleLink = this.handleLink.bind(this);
  }

  handleSubmit(values) {
    this.props.accountCreate(values);
  }

  handleLink(event) {
    event.preventDefault();
    this.props.clearIdentity();
    browserHistory.push(urls.identity.path);
    ['eth', 'username', 'avatarPath'].map(f => window.localStorage.removeItem(f));
  }

  renderField({ input, label, type, meta: { touched, error } }) {
    return (
      <div className="form-row">
        <label htmlFor="field-email" className="form-label hidden">{label}</label>
        <div>
          <input
            {...input}
            className="field" placeholder={label} type={type}
          />
          {touched && error && <span className="error">{error}</span>}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, identityUser } = this.props;
    return (
      <div>
        <div className="user">
          <header className="user-head">
            <h2>
              <i className="ico-check-secondary" />
              Online Identity
            </h2>
            <a href="" onClick={this.handleLink} to={urls.identity.path} className="link">change keybase user</a>
          </header>
          <div className="user-body">
            <a href="">
              <span>
                <img
                  src={identityUser.avatarPath ? identityUser.avatarPath : window.localStorage.getItem('avatarPath')}
                  alt="avatar" width="39" height="39"
                />
              </span>
              <small>
                {identityUser.username ? identityUser.username : window.localStorage.getItem('username')}
              </small>
            </a>
          </div>
        </div>
        <div className="section-content">
          <div className="form form-identity">
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <div className="form-body">
                <Field name="email" type="text" component={this.renderField} label="Your Email" />
                <Field name="password" type="password" component={this.renderField} label="Create a Password" />
                <Field name="confirmPassword" type="password" component={this.renderField} label="Retype Password" />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-blue btn-big btn-big-secondary">
                  Create Login
                </button>
                <a href="" className="link">What’s keybase?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AccountCreationForm.propTypes = {
  accountCreate: PropTypes.func.isRequired,
  clearIdentity: PropTypes.func.isRequired,
  identityUser: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'AccountCreationForm',
  validate
})(AccountCreationForm);

