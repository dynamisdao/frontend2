import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as HistoryActions from '../../../actions/history';
import HistoryForm from './formComponent';
import HeaderStep from '../../base/headerStep/component';

class HistoryForm1Component extends Component {
  componentWillMount() {
    if (JSON.parse(window.localStorage.getItem('positionList'))) {
      this.props.initialPosition();
    }
  }
  render() {
    return (
      <section className="section section-form">
        <h5 className="section-title">Create a Policy</h5>
        <div className="section-inner">
          <HeaderStep currenStep={3} />
          <div className="section-body">
            <div className="section-group-tertiary">
              <div className="form form-history">
                <HistoryForm
                  addPosition={this.props.addPosition}
                  deletePosition={this.props.deletePosition}
                  positionList={this.props.positionList}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

HistoryForm1Component.propTypes = {
  addPosition: PropTypes.func.isRequired,
  positionList: PropTypes.array.isRequired,
  deletePosition: PropTypes.func.isRequired,
  initialPosition: PropTypes.func.isRequired,
  route: PropTypes.object
};

function mapStateToProps(state) {
  return {
    positionList: state.history.positionList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HistoryActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(HistoryForm1Component);
