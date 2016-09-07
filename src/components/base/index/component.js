import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { urls } from '../../../routes';

class IndexComponent extends Component {

  render() {
    return (
      <div>
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
                <Link to={urls.identity.path} className="btn btn-white">Create a Policy</Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IndexComponent;
