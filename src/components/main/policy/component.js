import React, { Component, PropTypes } from 'react';

import PolicyDetailsComponent from './details/component';
import PolicyPoolComponent from './pool/component';

class PolicyComponent extends Component {

  render() {
    return (
      <section className="section section-policy">
        <h1 className="title title-primary"></h1>
        <section className="section section-policy">
          <div className="cols">
            <div className="col col-3of5">
              {this.props.children}
            </div>
            <div className="col col-2of5">
              <div className="panel panel-details">
                <PolicyDetailsComponent />
              </div>
              <PolicyPoolComponent />
            </div>
          </div>
        </section>
      </section>
    );
  }
}

PolicyComponent.propTypes = {
  children: PropTypes.element.isRequired
};

export default PolicyComponent;
