import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';

import { urls } from '../../../routes';

export const fields = ['eth', 'username'];

const validate = values => {
  const errors = {};
  if (!values.eth) {
    errors.eth = 'Required';
  }
  if (!values.username) {
    errors.username = 'Required';
  }
  return errors;
};

class IdentityForm extends Component {
  constructor(props) {
    super(props);
    this.state = { isNext: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChangeUserName = this.handleOnChangeUserName.bind(this);
    this.renderField = this.renderField.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.identityUser !== nextProps.identityUser && nextProps.identityUser.username) {
      this.setState({ isNext: true });
    }
  }

  handleSubmit(values) {
    if (this.state.isNext) {
      browserHistory.push(urls.accountCreation.path);
      window.localStorage.setItem('eth', values.eth);
      window.localStorage.setItem('username', this.props.identityUser.username);
      window.localStorage.setItem('avatarPath', this.props.identityUser.avatarPath);
    } else {
      this.props.identity(values.username);
    }
  }

  handleOnChangeUserName() {
    if (this.state.isNext) {
      this.setState({ isNext: false });
    }
  }

  renderField({ input, label, type, meta: { touched, error } }) {
    return (
      <div className="form-row">
        <label htmlFor="field-email" className="form-label hidden">{label}</label>
        <div>
          <input
            {...input}
            className="field" placeholder={label} type={type}
            onBlur={e => input.onBlur(this.handleOnChangeUserName(e))}
          />
          {touched && error && <span className="error">{error}</span>}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, identityUser } = this.props;
    const { isNext } = this.state;
    return (
      <div>
        {isNext ?
          <div className="user">
            <header className="user-head">
              <h2>
                <i className="ico-check-secondary" />
                Online Identity
              </h2>
            </header>
            <div className="user-body">
              <a href="">
                <span>
                  <img src={identityUser.avatarPath} alt="avatar" width="39" height="39" />
                </span>
                <small>{identityUser.username}</small>
              </a>
            </div>
          </div> : null
        }
        <div className="section-content">
          <div className="form form-identity">
            <form onSubmit={handleSubmit(this.handleSubmit)}>
            {!isNext ?
              <div className="form-head">
                <h2>Online Identity</h2>
              </div> : null
            }
              <div className="form-body">
                <Field name="eth" type="text" component={this.renderField} label="Your ETH Address" />
                <Field
                  name="username" type="text"
                  component={this.renderField}
                  label="Your Keybase Username"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-blue btn-big">
                  {identityUser.username ? 'Next' : 'Get Data'}
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

IdentityForm.propTypes = {
  identity: PropTypes.func.isRequired,
  identityUser: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  array: PropTypes.object.isRequired,
  untouch: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'IdentityForm',
  validate
})(IdentityForm);

