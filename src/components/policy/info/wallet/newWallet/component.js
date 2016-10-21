import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

export const fields = ['password'];

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Must be 6 characters or more';
  }
  return errors;
};

class NewWalletInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderField = this.renderField.bind(this);
  }

  handleSubmit(values) {
    const data = values;
  }

  renderField({ input, label, type, autoFocus, meta: { touched, error } }) {
    return (
      <div className="form-row">
        <label htmlFor="field-email" className="form-label hidden">{label}</label>
        <div>
          <input {...input} autoFocus={autoFocus} className="field" placeholder={label} type={type} />
        </div>
        <div>
          {touched && error && <span className="error">{error}</span>}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="panel-body form-wallet">
          <div className="form form-body">
            <Field name="password" type="password" component={this.renderField} label="Please enter your Password" />
          </div>
          <div>
            <button type="submit" className="btn btn-half-block">Generate New Wallet</button>
            <button className="btn btn-half-block">Upload Wallet</button>
          </div>
        </div>
      </form>
    );
  }
}

NewWalletInfoComponent.contextTypes = {
  router: PropTypes.object.isRequired
};

NewWalletInfoComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  array: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'newWalletForm',
  validate
})(NewWalletInfoComponent);

