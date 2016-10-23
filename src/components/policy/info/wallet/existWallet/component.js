import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

export const fields = ['toAddress', 'amount', 'password'];

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Must be 6 characters or more';
  }
  if (!values.toAddress) {
    errors.toAddress = 'Required';
  }
  if (!values.amount) {
    errors.amount = 'Required';
  }
  return errors;
};

class ExistWalletInfoComponent extends Component {
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
            <Field name="toAddress" type="text" component={this.renderField} label="To Address" />
            <Field name="amount" type="text" component={this.renderField} label="Amount" />
            <Field name="password" type="password" component={this.renderField} label="Please enter your Password" />
          </div>
          <div className="btn-third-block">
            <button type="submit" className="btn btn-third">Send Transaction</button>
            <button className="btn btn-third">Download Your Wallet</button>
            <button className="btn btn-third">Generate New Wallet</button>
          </div>
        </div>
      </form>
    );
  }
}

ExistWalletInfoComponent.contextTypes = {
  router: PropTypes.object.isRequired
};

ExistWalletInfoComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  array: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'existWalletForm',
  validate
})(ExistWalletInfoComponent);
