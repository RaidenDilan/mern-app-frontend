import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner/LoadingSpinner';

const Users = React.lazy(() => import('./user/pages/Users'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace/NewPlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces/UserPlaces'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace/UpdatePlace'));
const Auth = React.lazy(() => import('./user/pages/Auth/Auth'));

const App = () => {
  const { token, login, logout, userId } = useAuth(false);

  let routes;

  if (token) routes = (
    <Switch>
      <Route
        path='/'
        exact>
        <Users />
      </Route>
      <Route
        path='/:userId/places'
        exact>
        <UserPlaces />
      </Route>
      <Route
        path='/places/new'
        exact>
        <NewPlace />
      </Route>
      <Route
        path='/places/:placeId'
        exact>
        <UpdatePlace />
      </Route>
      <Redirect to='/' />
    </Switch>
  );
  else routes = (
    <Switch>
      <Route
        path='/'
        exact>
        <Users />
      </Route>
      <Route
        path='/:userId/places'
        exact>
        <UserPlaces />
      </Route>
      <Route
        path='/auth'
        exact>
        <Auth />
      </Route>
      <Redirect to='/auth' />
    </Switch>
  );

  return (
    <AuthContext.Provider
      value={ {
        isLoggedIn: !!token, // The !! (double bang) logical operators return a value’s truthy value.
        token: token,
        userId: userId,
        login: login,
        logout: logout
      } }>
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className='center'>
                <LoadingSpinner />
              </div> }>
            { routes }
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
