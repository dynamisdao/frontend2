import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BaseComponent from './components/base/component';
import IndexComponent from './components/base/index/component';

export const urls = {
  index: {
    path: '/'
  }
};


export default (
  <Route path={urls.index.path} component={BaseComponent}>
    <IndexRoute component={IndexComponent} />
  </Route>
);
