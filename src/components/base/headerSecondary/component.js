import React, { Component, PropTypes } from 'react';

class HeaderSecondaryComponent extends Component {

  render() {
    return (
      <header className="header header-secondary">
        <a href="/index.html" className="logo">Dynamis</a>
        <a href="/login.html" className="btn btn-blue">Login</a>
      </header>
    );
  }
}

export default HeaderSecondaryComponent;
