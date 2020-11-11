import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Navigation from './components/common/Navigation';
import Waiters from './components/waiters/Waiters';
import Orders from './components/orders/Orders';
import Home from './components/home/Home';
import Dishes from './components/dishes/Dishes';
import MenuSection from './components/menuSection/MenuSection';
import Statistic from './components/common/Statistic';

function App() {

  return (
    <Router>
      <Container maxWidth="lg">
        <Navigation />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Switch>
              <Route path='/' exact>
                <Home />
              </Route>
              <Route path='/waiters'>
                <Waiters />
              </Route>
              <Route path='/orders'>
                <Orders />
              </Route>
              <Route path='/dishes'>
                <Dishes />
              </Route>
              <Route path='/menu'>
                <MenuSection />
              </Route>
              <Route path='/statistic'>
                <Statistic />
              </Route>
              <Route path='*'>
                <Redirect to='/' />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </Router>
  );
}

export default App;
