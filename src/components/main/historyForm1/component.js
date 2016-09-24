import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as HistoryActions from '../../../actions/history';
import HistoryForm from './formComponent';
{/*import UnsavedModal from '../../base/unsavedModal/component'; */}
import HeaderStep from '../../base/headerStep/component';

class HistoryForm1Component extends Component {
  render() {
    return (
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
              {/* <UnsavedModal route={this.props.route} />  */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HistoryForm1Component.propTypes = {
  addPosition: PropTypes.func.isRequired,
  positionList: PropTypes.array.isRequired,
  deletePosition: PropTypes.func.isRequired,
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
