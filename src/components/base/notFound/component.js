import React, { Component, PropTypes } from 'react';

import FooterComponent from '../footer/component';
import HeaderLogedComponent from '../headerLoged/component';

class NotFoundComponent extends Component {
  render() {
    return (
      <div className="wrapper">
        <HeaderLogedComponent />
        <div className="main">
          <div className="shell">
            <section className="section section-form section-form-secondary">
              <div className="section-inner">
                <div className="section-body">
                  <div className="section-group section-group-secondary">
                    Page not found...
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default NotFoundComponent;
