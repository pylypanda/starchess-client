import React, { Component } from 'react';
import { Col, Row, Button, Table, DropdownButton, Dropdown, Jumbotron } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import Board from '../../components/Board/Board';

import './Openings.css';
import api from '../../api';

class Openings extends Component {
    constructor(props) {
        super(props);
        this.inc = 0;
        this.move = '';
        this.state = {
            name: '',
            description: 'There are dozens of different openings, and hundreds of variants. These vary widely in character from quiet positional play to wild tactical play. Choose one of them and find the perfect opening for You.',
            moves: [],
            fens: [],
            fen: '',
            openings: [],
            currOpeningsType: 'Openings type',
            isLoading: false
        }
    }

    getOpeningByName = async (event, openingName) => {
        event.preventDefault();
        window.scrollTo(0, 0);
        this.move = '';
        this.setState({ isLoading: true });
        await api.getOpeningByName(openingName).then(opening => {
            this.inc = 0;
            this.setState({
                name: opening.data.data.name,
                moves: opening.data.data.moves,
                fens: opening.data.data.fens,
                fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
                isLoading: false
            });
        });
    }

    getOpeningsByType = async (event, openingsType) => {
        event.preventDefault();
        this.move = '';
        this.setState({ isLoading: true });
        await api.getOpeningsByType(openingsType).then(openings => {
            this.inc = 0;
            this.setState({
                fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
                openings: openings.data.data,
                isLoading: false
            })
        })
    }

    moveForward = (event) => {
        event.preventDefault();
        const fens = this.state.fens;
        if(this.inc < fens.length - 1) {
            if(this.state.moves[this.inc].indexOf('x') !== -1)
                this.move = 'capture';
            else
                this.move = 'move';
            this.inc++;
            this.setState({
                fen: fens[this.inc]
            });
        }
    }

    moveBack = (event) => {
        event.preventDefault();
        const fens = this.state.fens;
        if(this.inc > 0) {
            if(this.state.moves[this.inc])
                if(this.state.moves[this.inc].indexOf('x') !== -1)
                    this.move = 'capture';
                else
                    this.move = 'move';
            this.inc--;
            this.setState({
                fen: fens[this.inc]
            });
        }
    }

    moveToStart = (event) => {
        event.preventDefault();
        const fens = this.state.fens;
        if(fens.length) {
            if(this.inc !== 0)
                this.move = 'move';
            else
                this.move = '';
            this.inc = 0;
            this.setState({
                fen: fens[0]
            })            
        }
    }

    moveToEnd = (event) => {
        event.preventDefault();
        const fens = this.state.fens;
        if(fens.length) {
            if(this.inc !== fens.length - 1)
                this.move = 'move';
            else
                this.move = '';
            this.inc = fens.length - 1;
            this.setState({
                fen: fens[this.inc]
            })            
        }
    }

    moveToPosition = (event, index) => {
        event.preventDefault();
        const fens = this.state.fens;
        if(fens.length) {
            if(this.inc !== index) {
                if(this.state.moves[index - 1].indexOf('x') !== -1)
                    this.move = 'capture';
                else
                    this.move = 'move';                
            } else {
                this.move = '';
            }
            this.inc = index;
            this.setState({
                fen: fens[this.inc]
            })
        }
    }

    render() {
        const { name, moves, fen, openings, isLoading } = this.state;
        let filteredMoves = [];
        let temp = [];
        for(const m in moves) {
            temp.push(moves[m]);
            if(m % 2 !== 0) {
                filteredMoves.push(temp);
                temp = [];
            } else if(m == moves.length - 1) {
                filteredMoves.push(temp);
            }
        }
        return(
            <>
            <Row>
                {isLoading ? <div className='loader centered-hor centered-ver'></div> : null}
                <Col className='ml-3 ml-sm-0 mb-sm-3' xs={11} sm={8} lg={7} xl={5}>
                    {name === '' ? null : <h4>{name}</h4>}
                    <Board fen={fen} move={this.move} allowMoves={false} />
                </Col>
                <Col className='mr-xl-5 pl-sm-0 pl-lg-3' xs={12} sm={4} lg={5} xl={3}>
                    <Button className='move-ctrl' onClick={(event) => this.moveToStart(event)} variant='secondary' title='Start position'>
                        <FontAwesomeIcon icon={faAngleDoubleLeft} />
                    </Button>
                    <Button className='move-ctrl' onClick={(event) => this.moveBack(event)} variant='secondary' title='Move back'>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Button>
                    <Button className='move-ctrl' onClick={(event) => this.moveForward(event)} variant='secondary' title='Move forward'>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Button>
                    <Button className='move-ctrl' onClick={(event) => this.moveToEnd(event)} variant='secondary' title='Final position'>
                        <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </Button>
                    <Table className='move-tbl' striped bordered size='sm' variant='secondary'>
                        <tbody>
                            {filteredMoves.map((m, index) => {
                                if(m.length === 2) {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td onClick={(event) => this.moveToPosition(event, index * 2 + 1)} className='move-td'><b>{m[0]}</b></td>
                                            <td onClick={(event) => this.moveToPosition(event, index * 2 + 2)} className='move-td'><b>{m[1]}</b></td>
                                        </tr>
                                    )                                            
                                } else {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td onClick={(event) => this.moveToPosition(event, index * 2 + 1)} className='move-td'><b>{m[0]}</b></td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </Table>
                    <Jumbotron className='px-2 py-2 opening-description' style={{backgroundColor: 'rgba(80, 80, 80, 0.8)'}}>
                        <p>{this.state.description}</p>
                    </Jumbotron>
                </Col>
                <Col xs={12} xl={3}>
                    <Table striped bordered size='sm' variant='dark'>
                        <thead>
                            <tr style={{fontWeight: 'bold'}}>
                                <td>
                                    <DropdownButton className='opening-select' variant='dark' title={this.state.currOpeningsType}>
                                        <Dropdown.Item onClick={(event) => {this.getOpeningsByType(event, 'open');this.setState({currOpeningsType: 'Open Games'})}}>
                                            Open <small>(1.e4 e5)</small>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={(event) => {this.getOpeningsByType(event, 'semi-open');this.setState({currOpeningsType: 'Semi-Open Games'})}}>
                                            Semi-Open <small>(1.e4 other)</small>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={(event) => {this.getOpeningsByType(event, 'closed');this.setState({currOpeningsType: 'Closed Game'})}}>
                                            Closed <small>(1.d4 d5)</small>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={(event) => {this.getOpeningsByType(event, 'semi-closed');this.setState({currOpeningsType: 'Semi-Closed Games'})}}>
                                            Semi-Closed <small>(1.d4 other)</small>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={(event) => {this.getOpeningsByType(event, 'flank');this.setState({currOpeningsType: 'Flank Openings'})}}>
                                            Flank Openings <small>(1.c4,f4 etc)</small>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={(event) => {this.getOpeningsByType(event, 'gambit');this.setState({currOpeningsType: 'Gambits'})}}>
                                            Gambits
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                openings.map(op => {
                                    return (
                                        <tr>
                                            <td className='opening-name' onClick={(event) => this.getOpeningByName(event, op.name)}>{op.name}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            </>
        );
    }
}
export default Openings;
