import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/trybetunes-project">
            <Login />
          </Route>
          <Route path="/trybetunes-project/search">
            <Search />
          </Route>
          <Route path="/trybetunes-project/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route path="/trybetunes-project/favorites">
            <Favorites />
          </Route>
          <Route exact path="/trybetunes-project/profile">
            <Profile />
          </Route>
          <Route
            path="/trybetunes-project/profile/edit"
            render={ (props) => <ProfileEdit { ...props } /> }
          />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
