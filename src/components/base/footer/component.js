import React, { Component, PropTypes } from 'react';

class FooterComponent extends Component {

  render() {
    return (
      <footer className="footer">
        <div className="shell">
          <a href="" className="logo-footer">Dynamis</a>

          <nav className="nav nav-footer">
            <ul>
              <li>
                <a href="">About Dynamis</a>
              </li>
              <li>
                <a href="">Privacy Policy</a>
              </li>
              <li>
                <a href="">FAQs</a>
              </li>
            </ul>

            <ul>
              <li>
                <a href="">My Policy</a>
              </li>
              <li>
                <a href="">Open A Claim</a>
              </li>
              <li>
                <a href="">Make a Payment</a>
              </li>
            </ul>

            <ul>
              <li>
                <a href="">Assessor Dashboard</a>
              </li>
              <li>
                <a href="">Verify My Policy</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="copyright">
          <div className="shell">
            <p>&copy; 2016, <a href="https://github.com/dynamisdao">Dynamis</a></p>
          </div>
        </div>
      </footer>
    );
  }
}

export default FooterComponent;
