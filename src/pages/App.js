import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from './Home';
import Create from '../components/Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import About from './About';
import Movies from './Movies';
import Rating from './Rating';
import MovDetails from './MovDetails';

const App = () => (
  <Router>
    <div className="App">
      <div className="page-container">
        <div className="content-wrapper">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/rating">
              <Rating />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="/movs/:id">
              <MovDetails />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;
