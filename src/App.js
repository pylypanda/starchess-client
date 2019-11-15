import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import NavBar from './components/Navigation/NavBar/NavBar';
import Sections from './components/Navigation/Sections/Sections';
import Footer from './components/Navigation/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import Learn from './pages/Learn/Learn';
import Openings from './pages/Openings/Openings';
import Puzzles from './pages/Puzzles/Puzzles';
import News from './pages/News/News';
import OneFullNews from './pages/OneFullNews/OneFullNews';
import TopPlayers from './pages/TopPlayers/TopPlayers';
import Contacts from './pages/Contacts/Contacts';
import Books from './pages/Books/Books';
import Engines from './pages/Engines/Engines';
import ChessHistory from './pages/ChessHistory/ChessHistory';
import NoMatch from './pages/NoMatch/NotFound';

class App extends Component {
  render(){
    return (
      <Router>
        <NavBar />
          <Row className='pt-2 mb-3 layout'>
            <Col className='d-none d-md-block' md={3} xl={2}>
              <Sections />
            </Col>
            <Col className='pl-4 pl-md-0' xs={12} md={9} xl={10}>
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/learn' component={Learn} />
                <Route exact path='/openings' component={Openings} />
                <Route exact path='/puzzles' component={Puzzles} />
                <Route exact path='/news' component={News} />
                <Route exact path='/news/:id' component={OneFullNews} />
                <Route exact path='/top' component={TopPlayers} />
                <Route exact path='/books' component={Books} />
                <Route exact path='/engines' component={Engines} />
                <Route exact path='/history' component={ChessHistory} />
                <Route exact path='/contacts' component={Contacts} />
                <Route exact component={NoMatch} />
              </Switch>
            </Col>
          </Row>
        <Footer />
      </Router>
    );
  }
}

export default App;
