import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Chess from 'react-chess';
import * as Game from 'chess.js';

import './Board.css';

const game = new Game(); // chess engine

class Board extends Component {
    constructor(props) {
        super(props);
        game.reset(); // return to default
        if(this.props.fen) {
            game.load(this.props.fen); 
        }
        this.move = new Audio(); // move sound
        this.move.src = 'http://play.chessbase.com/Common/Media/Sounds/Board/move1.mp3';
        this.capture = new Audio(); // capture sound
        this.capture.src = 'http://play.chessbase.com/Common/Media/Sounds/Board/capture1.mp3';
        this.orientation = this.props.orientation; // white/black
        this.solve = []; // puzzle solve
        this.from = ''; // from square
        this.to = ''; // to square
        this.files = [];
        this.ranks = [];
        this.state = {
            pieces: this.getNewPosition(game.fen()),
            allowMoves: this.props.allowMoves,
            promotionClass: 'not-promoted'
        }
        this.handleMovePiece = this.handleMovePiece.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.orientation !== undefined) {
            this.orientation = nextProps.orientation;
            this.files = [];
            this.ranks = [];
            this.drawLabels();
        }
        if(nextProps.solve !== undefined) {
            this.solve = nextProps.solve;
        }
        if(nextProps.fen !== undefined) {
            game.load(nextProps.fen);
            this.setState({
                pieces: this.getNewPosition(game.fen()),
                allowMoves: nextProps.allowMoves,
                promotionClass: 'not-promoted'
            });
            if(nextProps.move === 'capture')
                this.capture.play();
            else if(nextProps.move === 'move')
                this.move.play();
        }
    }

    componentWillMount() {
        this.drawLabels();
    }

    getNewPosition(fen) { // parse FEN of current position to 'react-chess' lineup notation
        fen = fen
            .slice(0, fen.indexOf(' '))
            .split('/');
        let newPosition = [];
        if(this.orientation !== 'black') { // black
            for(let i = 0; i < 8; i++) {
                let k = 0;
                for(let j = 0; j < fen[i].length; j++) {
                    if(parseInt(fen[i][j])) {
                        k += parseInt(fen[i][j]) - 1;
                    } else {
                        newPosition.push(fen[i][j] + String.fromCharCode(64, 97 + j + k) + (8 - i).toString());
                    }
                }
            }
        } else { // white
            for(let i = 0; i < 8; i++) {
                let k = 0;
                for(let j = 0; j < fen[i].length; j++) {
                    if(parseInt(fen[i][j])) {
                        k += parseInt(fen[i][j]) - 1;
                    } else {
                        newPosition.push(fen[i][j] + String.fromCharCode(64, 104 - j - k) + (i + 1).toString());
                    }
                }
            }
        }
        return newPosition;
    }

    handleMovePiece(piece, fromSquare, toSquare) {
        let move, fromSquareReverse, toSquareReverse;
        if(this.orientation !== 'black') { // make a move by the chess.js engine
            move = game.move({
                from: fromSquare,
                to: toSquare,
                promotion: 'q'
            });
        } else { // make a chess.js move with reverse (black) orientation
            fromSquareReverse = String.fromCharCode(201 - fromSquare.charCodeAt(0), 105 - fromSquare.charCodeAt(1));
            toSquareReverse = String.fromCharCode(201 - toSquare.charCodeAt(0), 105 - toSquare.charCodeAt(1));
            move = game.move({
                from: fromSquareReverse,
                to: toSquareReverse,
                promotion: 'q'
            });
        }

        if(move === null) { // illegal move
            const currPos = this.state.pieces;
            this.setState({pieces: []});
            this.setState({pieces: currPos}); // return position before move
        } else { // legal move
            if(game.history()[game.history().length - 1].indexOf('=Q') !== -1) { // if last move was promotion
                if(this.orientation !== 'black') { // black
                    this.from = fromSquare;
                    this.to = toSquare;
                    this.setState({ // show promotion window
                        allowMoves: false,
                        promotionClass: 'promoted'
                    })
                } else { // white
                    this.from = fromSquareReverse;
                    this.to = toSquareReverse;
                    this.setState({ // show promotion window
                        allowMoves: false,
                        promotionClass: 'promoted'
                    })
                }
            } else { // if last move wasn't promotion (default move)
                this.setState({
                    pieces: this.getNewPosition(game.fen())
                })
                this.playSound();
                this.checkSolve(); // if puzzle mode
            }
        }
    }

    promoteTo(event, piece) { // promote to chosen piece
        event.preventDefault();
        game.undo();
        game.move({
            from: this.from,
            to: this.to,
            promotion: piece
        });
        this.setState({
            pieces: this.getNewPosition(game.fen()),
            allowMoves: true,
            promotionClass: 'not-promoted'
        })
        this.playSound();
        this.checkSolve(); // if puzzle mode
    }

    checkSolve() {
        if(this.solve.length !== 0) {
            const history = game.history();
            if(history.length !== this.solve.length) {
                if(history[history.length - 1] === this.solve[history.length - 1]) {
                    setTimeout(() => {
                        game.move(this.solve[history.length]);
                        this.setState({
                            pieces: this.getNewPosition(game.fen())
                        })
                        this.playSound();
                    }, 600);
                } else {
                    this.setState({
                        allowMoves: false
                    })
                    this.props.isSolved(0, game.fen());
                }                
            } else {
                if(history[history.length - 1] === this.solve[history.length - 1]) {
                    this.setState({
                        allowMoves: false
                    })
                    this.props.isSolved(1, game.fen());
                } else {
                    this.setState({
                        allowMoves: false
                    })
                    this.props.isSolved(0, game.fen());
                }
            }
        }
    }

    drawLabels() { // draw board markup
        if(this.orientation !== 'black') {
            for(let i = 1; i < 9; i++) { // white:  files: a-h; ranks: 8-1 (top down)
                this.files.push(<div className='file'>{String.fromCharCode(96 + i)}</div>)
                this.ranks.push(<div className='rank'>{9 - i}</div>)
            }
        } else { // black:  files: h-a; ranks: 1-8 (top down)
            for(let i = 1; i < 9; i++) {
                this.files.push(<div className='file'>{String.fromCharCode(105 - i)}</div>)
                this.ranks.push(<div className='rank'>{i}</div>)
            }
        }
    }

    playSound() {
        if(game.history().length > 0) {
            if(game.history()[game.history().length - 1].indexOf('x') !== -1) { // 'x' in move notation is capture
                this.capture.play();
            } else {
                this.move.play();
            }            
        }
    }

    render () {
        return (
            <>
            <Row className='board'>
                <Col xs={1} className='pr-0'>
                    {this.ranks}
                </Col>                
                <Col xs={11} className='pl-0'>
                    { /* Promotion window */ }
                    <div className={this.state.promotionClass}>
                        <img onClick={(event) => this.promoteTo(event, 'q')} src={require('../../img/white-queen.png')} width='60px' height='auto' alt='Queen' />
                        <img onClick={(event) => this.promoteTo(event, 'r')} src={require('../../img/white-rock.png')} width='60px' height='auto' alt='Rock' />
                        <img onClick={(event) => this.promoteTo(event, 'n')} src={require('../../img/white-knight.png')} width='60px' height='auto' alt='Knight' />
                        <img onClick={(event) => this.promoteTo(event, 'b')} src={require('../../img/white-bishop.png')} width='60px' height='auto' alt='Bishop' />
                    </div>
                    <Chess pieces={this.state.pieces} allowMoves={this.state.allowMoves} onMovePiece={this.handleMovePiece} drawLabels={false} />
                </Col>
            </Row>
            <Row>
                <Col xs={1} className='pr-0'>

                </Col>  
                <Col xs={11} className='pr-3 pl-0'>
                    {this.files}
                </Col>
            </Row>
            </>
        );
    }
}

export default Board;
