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
    this.state = { showPasswordField: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShowPasswordField = this.handleShowPasswordField.bind(this);
    this.renderField = this.renderField.bind(this);
  }

  handleSubmit(values) {
    this.props.generateNewWallet(values.password);
  }

  handleShowPasswordField(event) {
    event.preventDefault();
    this.setState({ showPasswordField: true });
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
    const { showPasswordField } = this.state;
    return (
      <form onSubmit={showPasswordField ? handleSubmit(this.handleSubmit) : this.handleShowPasswordField}>
        <div className="panel-body form-wallet">
          {showPasswordField ?
            <div className="form form-body">
              <Field name="password" type="password" component={this.renderField} label="Please enter your Password" />
            </div> : null
          }
          <div>
            <button type="submit" className="btn btn-half-block">Generate New Wallet</button>
            <button className="btn btn-half-block">Upload Wallet</button>
          </div>
        </div>
      </form>
    );
  }
}

NewWalletInfoComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  generateNewWallet: PropTypes.func.isRequired,
  array: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'newWalletForm',
  validate
})(NewWalletInfoComponent);

