import React, { PropTypes } from 'react';

import { calculationDate } from '../../../utils';

const CalendarPanelComponent = (props) => {
  const workPeriods = props.positionList.map(p =>
    ({ fromValue: calculationDate(p.from),
      toValue: calculationDate(p.to, p.isCurrent)
  }));

  const monthsList = [];
  for (let year = 2013; year <= 2016; year++) {
    for (let month = 1; month <= 12; month++) {
      let isSelect = false;
      for (const p of workPeriods) {
        if (p.fromValue.year <= year && year <= p.toValue.year && p.fromValue.month <= month && month <= p.toValue.month) {
          isSelect = true;
        }
      }
      monthsList.push({ year, month, isSelect });
    }
  }
  return (
    <ol className="months">
      <h5>Employment by Months</h5>
      <li className="month">
        <span>2016</span>
        <ul className="list-months">
        {monthsList.filter(m => m.year === 2016).map((month, key) =>
          <li key={key} className={month.isSelect ? 'blue' : null}>
            <a href="" />
          </li>
        )}
        </ul>
      </li>
      <li className="month">
        <span>2015</span>
        <ul className="list-months">
        {monthsList.filter(m => m.year === 2015).map((month, key) =>
          <li key={key} className={month.isSelect ? 'blue' : null}>
            <a href="" />
          </li>
        )}
        </ul>
      </li>
      <li className="month">
        <span>2014</span>
        <ul className="list-months">
        {monthsList.filter(m => m.year === 2014).map((month, key) =>
          <li key={key} className={month.isSelect ? 'blue' : null}>
            <a href="" />
          </li>
        )}
        </ul>
      </li>
      <li className="month">
        <span>2013</span>
        <ul className="list-months">
        {monthsList.filter(m => m.year === 2013).map((month, key) =>
          <li key={key} className={month.isSelect ? 'blue' : null}>
            <a href="" />
          </li>
        )}
        </ul>
      </li>
    </ol>
  );
};

CalendarPanelComponent.propTypes = {
  positionList: PropTypes.array.isRequired
};

export default CalendarPanelComponent;
