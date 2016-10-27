import React, { Component, PropTypes } from 'react';

import PolicyDetailsComponent from './details/component';
import PolicyInfoComponent from './info/component';
import PolicyPoolComponent from './pool/component';

class PolicyComponent extends Component {

  render() {
    return (
      <section className="section section-policy">
        <h1 className="title title-primary">My Policy</h1>
        <section className="section section-policy">
          <div className="cols">
            <div className="col col-3of5">
              <PolicyInfoComponent />
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

export default PolicyComponent;
