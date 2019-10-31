import React, { Component } from 'react';
import { Col, Row, ButtonToolbar, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faRedo } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import Board from '../../components/Board/Board';

import './Puzzles.css';
import api from '../../api';

class Puzzles extends Component {
    constructor(props) {
        super(props);
        this.shuffledPuzzles = [];
        this.inc = 0;
        this.state = {
            orientation: '',
            fen: '8/8/8/8/8/8/8/8 w - - 0 1',
            solve: [],
            isSolved: -1,
            allowMoves: true,
            displayHint: false,
            isLoading: false
        }
    }

    getPuzzlesByType = async (event, puzzlesType) => {
        event.preventDefault();
        this.inc = 0;
        this.setState({ isLoading: true });
        await api.getPuzzlesByType(puzzlesType).then(puzzles => {
            if(puzzles.data.data.length !== 0) {
                this.shuffledPuzzles = this.shuffleArray(puzzles.data.data);
                if(this.shuffledPuzzles[0].start.indexOf('w') === -1) {
                    this.setState({
                        orientation: 'black',
                        fen: this.shuffledPuzzles[0].start,
                        solve: this.shuffledPuzzles[0].solve,
                        isSolved: -1,
                        allowMoves: true,
                        displayHint: false,
                        isLoading: false
                    })                
                } else {
                    this.setState({
                        orientation: 'white',
                        fen: this.shuffledPuzzles[0].start,
                        solve: this.shuffledPuzzles[0].solve,
                        isSolved: -1,
                        allowMoves: true,
                        displayHint: false,
                        isLoading: false
                    })
                }                
            }
        })
    }

    shuffleArray(arr) {
        let j, temp;
        for(let i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }

    nextPuzzle(event) {
        event.preventDefault();
        if(this.shuffledPuzzles.length !== 0) {
            if(this.inc === this.shuffledPuzzles.length - 1) {
                this.inc = 0;
            } else {
                this.inc++;
            }
            if(this.shuffledPuzzles[this.inc].start.indexOf('w') === -1) {
                this.setState({
                    orientation: 'black',
                    fen: this.shuffledPuzzles[this.inc].start,
                    solve: this.shuffledPuzzles[this.inc].solve,
                    isSolved: -1,
                    allowMoves: true,
                    displayHint: false
                })                
            } else {
                this.setState({
                    orientation: 'white',
                    fen: this.shuffledPuzzles[this.inc].start,
                    solve: this.shuffledPuzzles[this.inc].solve,
                    isSolved: -1,
                    allowMoves: true,
                    displayHint: false
                })
            }            
        }
    }

    tryAgain(event) {
        event.preventDefault();
        if(this.shuffledPuzzles.length !== 0) {
            this.setState({
                fen: this.shuffledPuzzles[this.inc].start,
                isSolved: -1,
                allowMoves: true,
                displayHint: false
            })            
        }
    }

    displayHint(event) {
        event.preventDefault();
        if(this.state.solve.length !== 0) {
            if(this.state.displayHint === false)
                this.setState({displayHint: true})
            else
                this.setState({displayHint: false})
        }
    }

    isSolved = (result, resultFen) => {
        this.setState({
            fen: resultFen,
            isSolved: result,
            allowMoves: false
        })
    }

    render() {
        return(
            <>
            <Row>
                {this.state.isLoading ? <div className='loader centered-hor centered-ver'></div> : null}
                <Col xs={12} sm={8} lg={7} xl={6}>
                    <Board fen={this.state.fen} orientation={this.state.orientation} solve={this.state.solve} allowMoves={this.state.allowMoves} isSolved={this.isSolved} />                    
                </Col>
                <Col sm={4} lg={5} xl={6}>
                    <div className='d-sm-none mt-3 mt-sm-0'>
                        <Button onClick={(event) => this.tryAgain(event)} className='w-25' title='Try again'>
                            <FontAwesomeIcon icon={faRedo} />
                        </Button>
                        <Button onClick={(event) => this.nextPuzzle(event)} className='w-25 mx-1' title='Next'>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </Button>
                        <Button onClick={(event) => this.displayHint(event)} className='w-25' title='View solve'>
                            <FontAwesomeIcon icon={faLightbulb} />
                        </Button>
                        {this.state.displayHint ?
                            <div className='hint mt-2 px-3'>Solve: {this.state.solve.map((solve, index) => {
                                if(index % 2 === 0)
                                    return(
                                        <span>~ {solve} </span>
                                    )
                                })}
                            </div> : null}
                        {this.state.isSolved === 0 ?
                            <div className='puz-res mt-2 py-2'>Wrong move</div> :
                                this.state.isSolved === 1 ?
                                    <div className='puz-res mt-2 py-2'>Puzzle is solved</div> : null}
                        {this.state.orientation === 'white' ?
                            <div className='play-color mt-2'>You play <b>white</b></div> :
                                this.state.orientation === 'black' ?
                                    <div className='play-color mt-2'>You play <b>black</b></div> : null}
                        <Button onClick={(event) => this.getPuzzlesByType(event, 'easy')} className='light-gray-btn mt-2' size='md' block>
                            Easy
                        </Button>
                        <Button onClick={(event) => this.getPuzzlesByType(event, 'medium')} className='light-gray-btn' size='md' block>
                            Medium
                        </Button>
                        <Button onClick={(event) => this.getPuzzlesByType(event, 'hard')} className='light-gray-btn' size='md' block>
                            Hard
                        </Button>
                        <Button onClick={(event) => this.getPuzzlesByType(event, 'compos')} className='light-gray-btn mb-3' size='md' block>
                            Compositions
                        </Button>
                    </div>
                    <div className='d-none d-sm-block'>
                        <ButtonToolbar>
                            <Button onClick={(event) => this.getPuzzlesByType(event, 'easy')} className='light-gray-btn' size='lg' block>
                                Easy
                            </Button>
                            <Button onClick={(event) => this.getPuzzlesByType(event, 'medium')} className='light-gray-btn' size='lg' block>
                                Medium
                            </Button>
                            <Button onClick={(event) => this.getPuzzlesByType(event, 'hard')} className='light-gray-btn' size='lg' block>
                                Hard
                            </Button>
                            <Button onClick={(event) => this.getPuzzlesByType(event, 'compos')} className='light-gray-btn mb-3' size='lg' block>
                                Compositions
                            </Button>
                            <Button onClick={(event) => this.tryAgain(event)} className='w-25' title='Try again'>
                                <FontAwesomeIcon icon={faRedo} />
                            </Button>
                            <Button onClick={(event) => this.nextPuzzle(event)} className='w-25 mx-1' title='Next'>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Button>
                            <Button onClick={(event) => this.displayHint(event)} className='w-25' title='View solve'>
                                <FontAwesomeIcon icon={faLightbulb} />
                            </Button>
                        </ButtonToolbar>
                        {this.state.orientation === 'white' ?
                            <div className='play-color mt-3'>You play <b>white</b></div> :
                                this.state.orientation === 'black' ?
                                    <div className='play-color mt-3'>You play <b>black</b></div> : null}
                        {this.state.displayHint ?
                            <div className='hint mt-3 px-3'>Solve: {this.state.solve.map((solve, index) => {
                                if(index % 2 === 0)
                                    return(
                                        <span>~ {solve} </span>
                                    )
                                })}
                            </div> : null}
                        {this.state.isSolved === 0 ?
                            <div className='puz-res mt-3 py-3'>Wrong move</div> : 
                                this.state.isSolved === 1 ?
                                    <div className='puz-res mt-3 py-3'>Puzzle is solved</div> : null}                        
                    </div>
                </Col>
            </Row>
            </>
        );
    }
}
export default Puzzles;
