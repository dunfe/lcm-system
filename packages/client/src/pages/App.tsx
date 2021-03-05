import React from 'react';
import './App.css';
import { ProvideAuth } from "../utils/hooks/useAuth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../components/Auth/PrivateRoute";
import { HomePage } from "./Home/Home";
import { NotFoundPage } from "../components/NotFoundPage";
import LoginPage from "./Login/LoginPage";
import SessionPage from "./Session/SessionPage";

function App(): JSX.Element {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            <HomePage />
          </PrivateRoute>
          <Route path="/login" component={LoginPage} />
          <Route path="/session" component={SessionPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
