import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class StatusOnP2PReviewDetailsComponent extends Component {

  render() {
    const { policy } = this.props;
    return (
      <div className="panel-body">
        <div className="table table-policy-details">
          <table>
            <colgroup>
              <col className="col-title" />
              <col className="col-detail" />
            </colgroup>
            <tbody>
              <tr>
                <td>Policy #</td>
                <td>{policy.id}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>Waiting for P2P review</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h5>P2P review may take some time. Please be patient. Other Dynamis users will
          now verify your employment history and identity
        </h5>
      </div>
    );
  }
}

StatusOnP2PReviewDetailsComponent.propTypes = {
  policy: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    policy: state.policy.policy
  };
}

export default connect(mapStateToProps)(StatusOnP2PReviewDetailsComponent);
