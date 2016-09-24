import React, { PropTypes } from 'react';

import { getMonthtStringByNumber } from '../../../utils';

const PositionPanelComponent = (props) => {
  return (
    <div className="position position-secondary">
      <div className="position-head">
        <h4>{props.position.jobTitile}</h4>
        <p>
          <span>{props.position.companyName}</span> <span>{props.position.city}, {props.position.state}</span>
        </p>
        <span>
          {getMonthtStringByNumber(props.position.from.split('.')[0])}, {props.position.from.split('.')[1]} -
          {props.position.isCurrentWork ? ' Present' :
          ` ${getMonthtStringByNumber(props.position.to.split('.')[0])},
          ${props.position.to.split('.')[1]}`}
        </span>
        <strong>
          {props.monthsQuantity > 11 ? `${(props.monthsQuantity -
            (props.monthsQuantity % 12)) / 12} years` : null} {props.monthsQuantity % 12 ?
            `${props.monthsQuantity % 12} months` : null}
        </strong>
        <div className="link">
          <a href="" onClick={props.edit}>edit</a> /
          <a href="" onClick={props.delete}> delete</a>
        </div>
      </div>
      <div className="position-body">
        <p>Reference</p>
        <p>
          <span>{props.position.confirmerName}</span> <span>{props.position.confirmerEmail}</span>
        </p>
        <a href="" className="link">
          <i className="material-icons">attach_file</i>
          paystub7-24-16.pdf
        </a>
      </div>
    </div>
  );
};

PositionPanelComponent.propTypes = {
  position: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  monthsQuantity: PropTypes.number.isRequired
};

export default PositionPanelComponent;
