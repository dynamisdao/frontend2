import React, { Component, PropTypes } from 'react';

import FooterComponent from '../base/footer/component';
import HeaderLogedComponent from '../base/headerLoged/component';

class MainComponent extends Component {

  render() {
    return (
      <div className="wrapper">
        <HeaderLogedComponent />
        {this.props.children}
        <FooterComponent />
      </div>
    );
  }
}

MainComponent.propTypes = {
  children: PropTypes.element.isRequired
};

export default MainComponent;
