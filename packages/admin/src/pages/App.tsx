import React from 'react';
import './App.css';
import { ProvideAuth } from "../utils/hooks/useAuth";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { PrivateRoute } from "../components/Auth/PrivateRoute";
import { HomePage } from "./Home/Home";
import { NotFoundPage } from "../components/NotFoundPage";
import LoginPage from "./Login/LoginPage";

function App(): JSX.Element {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/">
            <HomePage />
          </PrivateRoute>
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
