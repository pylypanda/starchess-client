import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece, faChessBoard, faChessKing, faBook, faRobot, faHistory } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper, faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';
import ScrollButton from '../../ScrollButton/ScrollButton';

import './Sections.css';

class Sections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            displayScrollButton: false
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (event) => {
        if(window.pageYOffset > 600) {
            if(!this.state.displayScrollButton) {
                this.setState({
                    displayScrollButton: true
                });                
            }
        } else {
            if(this.state.displayScrollButton) {
                this.setState({
                    displayScrollButton: false
                });                
            }
        }
    }

    render () {
        return (
            <>
            <Navbar className='flex-column align-items-start d-none d-md-flex site-sections'>
                <NavLink to='/learn' activeClassName='is-active'>
                    <FontAwesomeIcon icon={faChessBoard} />
                    <span>How to play</span>
                </NavLink>
                <NavLink to='/openings' activeClassName='is-active'>
                    <FontAwesomeIcon icon={faChessKing} />
                    <span>Openings</span>
                </NavLink>
                <NavLink to='/puzzles' activeClassName='is-active'>
                    <FontAwesomeIcon icon={faPuzzlePiece} />
                    <span>Puzzles</span>
                </NavLink>
                <NavLink to='/news' activeClassName='is-active'>
                    <FontAwesomeIcon icon={faNewspaper} />
                    <span>News</span>
                </NavLink>
                <NavLink to='/top' activeClassName='is-active'>
                    <FontAwesomeIcon icon={faArrowAltCircleUp} />
                    <span>Top-100</span>
                </NavLink>  
                <NavLink to='/books' activeClassName='is-active'>
                    <FontAwesomeIcon icon={faBook} />
                    <span>Chess books</span>
                </NavLink>
                <NavLink to='/engines' activeClassName='is-active'>
                    <FontAwesomeIcon icon={faRobot} />
                    <span>Engines</span>
                </NavLink>
                <NavLink to='/history' activeClassName='is-active'>
                    <FontAwesomeIcon icon={faHistory} />
                    <span>Chess History</span>
                </NavLink>
            </Navbar>
            {this.state.displayScrollButton ?
                <ScrollButton scrollStep="100" delay="1" /> : null}
            </>
        );
    }
}
export default Sections;
