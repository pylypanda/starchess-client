import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, NavItem } from 'react-bootstrap';

import './NavBar.css';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      visibility: false
    }
  }
  render(){
    return (
        <Navbar bg="dark" variant="dark" fixed="top" expand="md" expanded={this.state.visibility}>
          <Container>
            <NavLink to="/" onClick={() => this.setState({visibility: false})}>
              <img src={require('../../../img/Logo.png')} height="40px" alt="Logo" />
            </NavLink>
            <span className='d-none d-lg-inline ml-5 pl-5' style={{fontSize: '18px'}}>
              <q style={{fontSize: '25px'}}><i>Chess is the gymnasium of the mind.</i></q> — Blaise Pascal
            </span>
            <Navbar.Toggle aria-controls="resp" onClick={() => this.setState({visibility: !this.state.visibility})} />
            <Navbar.Collapse id="resp" className="justify-content-end" onClick={() => this.setState({visibility: false})}>
              <Nav.Link href='#' className='d-none d-md-block'>
                <NavLink to='/'>
                  Home
                </NavLink>
              </Nav.Link>
              <Nav.Link href='#' className='d-md-none'>
                <NavLink to='/learn'>
                  How to play
                </NavLink>
              </Nav.Link>
              <Nav.Link href='#' className='d-md-none'>
                <NavLink to='/openings'>
                  Openings
                </NavLink>
              </Nav.Link>
              <Nav.Link href='#' className='d-md-none'>
                <NavLink to='/puzzles'>
                  Puzzles
                </NavLink>
              </Nav.Link>
              <Nav.Link href='#' className='d-md-none'>
                <NavLink to='/news'>
                  News
                </NavLink>
              </Nav.Link>
              <Nav.Link href='#' className='d-md-none'>
                <NavLink to='/top'>
                  Top-100
                </NavLink>
              </Nav.Link>
              <Nav.Link href='#' className='d-md-none'>
                <NavLink to='/books'>
                  Chess Books
                </NavLink>
              </Nav.Link>
              <Nav.Link href='#' className='d-md-none'>
                <NavLink to='/engines'>
                  Engines
                </NavLink>
              </Nav.Link>
              <Nav.Link href='#' className='d-md-none'>
                <NavLink to='/history'>
                  Chess History
                </NavLink>
              </Nav.Link>
              <Nav.Link href='#'>
                <NavLink to='/contacts'>
                  Contacts
                </NavLink>
              </Nav.Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );    
  }
}

export default NavBar;
