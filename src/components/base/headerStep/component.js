import React from 'react';

const HeaderStepsComponent = (props) => {
  const renderStep = (step, label) => (
    <li className={step < props.currenStep ? 'prev' : step === props.currenStep ? 'active' : null}>
      <span>
        <i className="ico-check" />
      </span>
      <a href="">{label}</a>
    </li>
  );
  return (
    <header className="section-head">
      <ul className="list-links">
        {renderStep(1, 'Online I.D')}
        {renderStep(2, 'Account Creation')}
        {renderStep(3, 'Employment Verification')}
        {renderStep(4, 'Coverage Selection')}
        {renderStep(5, 'Self Essessment')}
      </ul>
    </header>
  );
};

export default HeaderStepsComponent;
