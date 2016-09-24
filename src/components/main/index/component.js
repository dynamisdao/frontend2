import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import StepsAsideComponent from '../../base/fiveStepsAside/component';
import HeaderStep from '../../base/headerStep/component';

import { urls } from '../../../routes';

class MainIndexComponent extends Component {

  render() {
    const handleNextButton = () => {
      browserHistory.push(urls.main.historyForm1.path);
    };

    return (
      <div className="section-inner">
        <HeaderStep currenStep={2} />
        <div className="section-body">
          <div className="section-group section-group-secondary">
            <div className="user">
              <header className="user-head">
                <h2>
                  <i className="ico-check-secondary" />

                  Online Identity
                </h2>

                <a href="" className="link">change keybase user</a>
              </header>

              <div className="user-body">
                <a href="">
                  <span>
                    <i className="material-icons">person</i>
                  </span>
                  <small>Ratcatcow</small>
                </a>
              </div>
            </div>

            <div className="section-content">
              <div className="account">
                <header className="account-head">
                  <h2>
                    <i className="ico-check-secondary" />

                    Account
                  </h2>
                  <a href="" className="link">edit</a>
                </header>
                
                <div className="account-body">
                  <table className="table-account">
                    <tbody>
                    <tr>
                      <td>Username:</td>

                      <td>
                        <span>ratcatcow@gmail.com</span>
                      </td>
                    </tr>
                    
                    <tr>
                      <td>Password:</td>

                      <td>
                        <span>•••••••••••••</span>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div className="form-actions">
                  <button
                    type="submit" className="btn btn-blue btn-big"
                    onClick={handleNextButton}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
            <StepsAsideComponent
              body={
                <p>
                  <span>Hey, BTW, If you close your browser during this process</span> and
                  come back to it later. We’ll remember right where you left off.
                </p>}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainIndexComponent;
