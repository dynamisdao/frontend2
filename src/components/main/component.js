import React, { Component, PropTypes } from 'react';

import FooterComponent from '../base/footer/component';
import HeaderLogedComponent from '../base/headerLoged/component';

class MainComponent extends Component {

  render() {
    return (
      <div className="wrapper">
        <HeaderLogedComponent />
        <div className="main">
          <div className="shell">
            <section className="section section-form">
              <h5 className="section-title">Create a Policy</h5>
              {this.props.children}
            </section>
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

MainComponent.propTypes = {
  children: PropTypes.element.isRequired
};

export default MainComponent;
