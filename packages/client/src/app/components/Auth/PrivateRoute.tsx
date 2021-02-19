import { useAuth } from '../../../utils/hooks/useAuth';
import { Route, Redirect } from 'react-router-dom';
import * as React from 'react';
import { Alert, Spin } from 'antd';
import styled from 'styled-components';
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const StyledLoading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
`;

export const PrivateRoute = ({ children, ...rest }) => {
  let auth = useAuth();

  if (auth.loading) {
    return (
      <StyledLoading>
        <Spin tip={'Authenticating...'} />
      </StyledLoading>
    );
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
