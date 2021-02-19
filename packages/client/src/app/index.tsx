/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';
import 'antd/dist/antd.css';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import LoginPage from './pages/LoginPage';
import { ProvideAuth } from '../utils/hooks/useAuth';
import { PrivateRoute } from './components/Auth/PrivateRoute';
import SessionPage from './pages/SessionPage';

export function App() {
  const { i18n } = useTranslation();
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - React Boilerplate"
          defaultTitle="React Boilerplate"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="A React Boilerplate application" />
        </Helmet>

        <Switch>
          <PrivateRoute path="/" exact>
            <HomePage />
          </PrivateRoute>
          <Route path="/login" component={LoginPage} />
          <Route path="/session" component={SessionPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </BrowserRouter>
    </ProvideAuth>
  );
}
