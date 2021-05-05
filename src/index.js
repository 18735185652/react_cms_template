/* eslint-disable react/jsx-no-undef */
import React from 'react';
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { main as mainConfig } from './router';
import './utils/i18n';

const Auth = 'user';

function renderRoutes(routes) {
  return routes.map(({
    path, exact, component: RouteComponent, routes: childrenRoutes = [], redirect, auth,
  }) => (
    <Route
      key={path}
      path={path}
      exact={exact}
      render={
          (routeProps) => {
            console.log('auth.indexOf(Auth) === -1', auth.indexOf(Auth) === -1);
            if (auth.indexOf(Auth) === -1) return <Redirect to="/page403" />;
            if (redirect) return <Redirect to={redirect} />;
            console.log('RouteComponent', RouteComponent);
            return (
              RouteComponent && (
              <RouteComponent {...routeProps}>
                <Switch>
                  {renderRoutes(childrenRoutes)}
                </Switch>
              </RouteComponent>
              )
            );
          }
      }
    />
  ));
}

function App() {
  return (
    <Router>
      <div>
        {renderRoutes(mainConfig)}
      </div>
    </Router>
  );
}

ReactDom.render(<App />, document.getElementById('root'));
