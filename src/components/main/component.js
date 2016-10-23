import React, { Component, PropTypes } from 'react';

import FooterComponent from '../base/footer/component';
import HeaderLogedComponent from '../base/headerLoged/component';

const pathsWithNavigationMenu = ['/policy'];

class MainComponent extends Component {
  render() {
    const { location } = this.props;
    return (
      <div className="wrapper">
        <HeaderLogedComponent
          isNavigation={pathsWithNavigationMenu.indexOf(location.pathname) !== -1}
        />
        <div className="main">
          <div className="shell">
            {this.props.children}
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

MainComponent.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired
};

export default MainComponent;
