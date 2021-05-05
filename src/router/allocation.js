import React from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';

const SubRoutes = (route) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={(props) => {
      if (route && route.redirect) {
        return <Redirect to={route.redirect} />;
      }
      return <route.component {...props} routes={route.routes} />;
    }}
  />
);

export const RenderRoutes = ({ routes }) => (
  <Switch>
    {(routes.map((route) => <SubRoutes key={route.path} {...route} />))}
  </Switch>
);