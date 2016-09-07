import React, { Component, PropTypes } from 'react';


class MainIndexComponent extends Component {

  render() {
    return (
      <div className="main">
        <div className="shell">
          <section className="section section-form">
            <h5 className="section-title">Create a Policy</h5>

            <div className="section-inner">
              <header className="section-head">
                <ul className="list-links">
                  <li className="prev">
                    <span>
                      <i className="ico-check" />
                    </span>

                    <a href="">Online I.D</a>
                  </li>
                  
                  <li className="active">
                    <span>
                      <i className="ico-check" />
                    </span>

                    <a href="">Account Creation</a>
                  </li>
                  
                  <li>
                    <span>
                      <i className="ico-check" />
                    </span>

                    <a href="">Employment Verification</a>
                  </li>
                  
                  <li>
                    <span>
                      <i className="ico-check" />
                    </span>

                    <a href="">Coverage Selection</a>
                  </li>

                  <li>
                    <span>
                      <i className="ico-check" />
                    </span>

                    <a href="">Self Essessment</a>
                  </li>
                </ul>
              </header>
              
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
                        </table>
                      </div>
                    </div>
                  </div>
                  
                  <aside className="section-aside">
                    <p>
                      <span>Hey, BTW, If you close your browser during this process</span> and come back to it later. We’ll remember right where you left off.
                    </p>

                    <img
                      src="src/assets/css/images/temp/logo-image.png"
                      alt="" className="logo-image" width="51" height="54"
                    />
                  </aside>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default MainIndexComponent;
