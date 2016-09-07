import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { urls } from '../../../routes';

class HeaderLogedComponent extends Component {

  render() {
    return (
      <header className="header header-secondary header-loged">
        <a href="" className="logo">Dynamis</a>
        <nav className="nav nav-user">
          <ul>
            <li>
              <a href="" className="dropdown-trigger">
                <img src="css/images/avatar.png" alt="Deon Elliott" width="39" height="39" />

                Your logged in as

                <strong><i className="material-icons">arrow_drop_down</i> Deon Elliott</strong>
              </a>

              <div className="dropdown">
                <ul>
                  <li>
                    <a href="">Link One</a>
                  </li>
                  <li>
                    <a href="">Link Two</a>
                  </li>
                  <li>
                    <a href="">Link Three</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default HeaderLogedComponent;
