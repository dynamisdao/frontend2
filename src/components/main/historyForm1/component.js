import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as HistoryActions from '../../../actions/history';
import HistoryForm from './formComponent';

class HistoryForm1Component extends Component {
  render() {
    return (
      <div className="section-group-tertiary">
        <div className="form form-history">
          <HistoryForm
            addPosition={this.props.addPosition}
            editPosition={this.props.editPosition}
            positionList={this.props.positionList}
          />
        </div>
      </div>
    );
  }
}

HistoryForm1Component.propTypes = {
  addPosition: PropTypes.func.isRequired,
  positionList: PropTypes.array.isRequired,
  editPosition: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    positionList: state.history.positionList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HistoryActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryForm1Component);
