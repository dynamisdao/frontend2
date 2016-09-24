import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BaseComponent from './components/base/component';
import IndexComponent from './components/base/index/component';
import AboutComponent from './components/base/about/component';
import LoginComponent from './components/base/login/component';
import IdentityComponent from './components/base/identity/component';
import AccountCreationComponent from './components/base/accountCreation/component';
import SendEmailMessageComponent from './components/base/sendEmailMessage/component';

import MainComponent from './components/main/component';
import MainIndexComponent from './components/main/index/component';
import HistoryForm1Component from './components/main/historyForm1/component';
import CoverageFormComponent from './components/main/coverageForm/component';
import AssessmentFormComponent from './components/main/assessmentForm/component';

export const urls = {
  index: {
    path: '/'
  },
  about: {
    path: '/about'
  },
  login: {
    path: '/login'
  },
  identity: {
    path: 'identity'
  },
  accountCreation: {
    path: 'account-creation'
  },
  sendEmail: {
    path: 'send-email'
  },
  main: {
    path: '/main',
    historyForm1: {
      path: '/history-form-1'
    },
    coverageForm: {
      path: '/coverage-form'
    },
    assessmentForm: {
      path: '/assessment-form'
    }
  }
};


export default (
  <Route>
    <Route path={urls.index.path} component={BaseComponent}>
      <IndexRoute component={IndexComponent} />
      <Route path={urls.about.path} component={AboutComponent} />
      <Route path={urls.login.path} component={LoginComponent} />
      <Route path={urls.identity.path} component={IdentityComponent} />
      <Route path={urls.accountCreation.path} component={AccountCreationComponent} />
      <Route path={urls.sendEmail.path} component={SendEmailMessageComponent} />
    </Route>
    <Route path={urls.main.path} component={MainComponent}>
      <IndexRoute component={MainIndexComponent} />
      <Route path={urls.main.historyForm1.path} component={HistoryForm1Component} />
      <Route path={urls.main.coverageForm.path} component={CoverageFormComponent} />
      <Route path={urls.main.assessmentForm.path} component={AssessmentFormComponent} />
    </Route>
  </Route>
);
