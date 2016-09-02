import React, { Component, PropTypes } from 'react';

import HeaderSecondaryComponent from '../headerSecondary/component';

class IndexComponent extends Component {

  render() {
    return (
      <div>
        <HeaderSecondaryComponent />
        <div className="intro">
          <div className="shell">
            <div className="intro-inner">
              <div className="intro-content">
                <p>
                  <strong>Dynamis</strong>
                    is a peer to peer income coverage app which offers a better way
                    to manage the costs and risks associated with severance benefits.
                  <a href="" className="link">…learn more</a>
                </p>
              </div>
              <div className="intro-actions">
                <a href="" className="btn btn-white">Create a Policy</a>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IndexComponent;
