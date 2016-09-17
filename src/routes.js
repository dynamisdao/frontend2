import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BaseComponent from './components/base/component';
import IndexComponent from './components/base/index/component';
import AboutComponent from './components/base/about/component';
import LoginComponent from './components/base/login/component';
import IdentityComponent from './components/base/identity/component';
import AccountCreationComponent from './components/base/accountCreation/component';

import MainComponent from './components/main/component';
import MainIndexComponent from './components/main/index/component';
import HistoryForm1Component from './components/main/historyForm1/component';

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
  main: {
    path: '/main',
    historyForm1: {
      path: '/history-form-1'
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
    </Route>
    <Route path={urls.main.path} component={MainComponent}>
      <IndexRoute component={MainIndexComponent} />
      <Route path={urls.main.historyForm1.path} component={HistoryForm1Component} />
    </Route>
  </Route>
);
