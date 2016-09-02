import React, { Component, PropTypes } from 'react';

import FooterComponent from './footer/component';

class BaseComponent extends Component {

  render() {
    return (
      <div className="wrapper">
        {this.props.children}
        <FooterComponent />
      </div>
    );
  }
}

BaseComponent.propTypes = {
  children: PropTypes.element.isRequired
};

export default BaseComponent;
