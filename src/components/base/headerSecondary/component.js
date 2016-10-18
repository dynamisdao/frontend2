import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { urls } from '../../../routes';

class HeaderSecondaryComponent extends Component {

  render() {
    return (
      <header className="header header-secondary">
        <p className="logo">Dynamis</p>
        <Link to={urls.login.path} className="btn btn-blue">Login</Link>
      </header>
    );
  }
}

export default HeaderSecondaryComponent;
