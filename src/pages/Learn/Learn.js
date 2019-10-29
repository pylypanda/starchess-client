import React, { Component } from 'react';
import { Col, Row, Image, Accordion, Button, Jumbotron } from 'react-bootstrap';
import Board from '../../components/Board/Board';

import './Learn.css';

class Learn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fen: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    loadPosition(event, pos) {
        event.preventDefault();
        if(pos === 'start')
            this.setState({fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'})
                else if(pos === 'castling')
                    this.setState({fen: 'r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1'})
                        else if(pos === 'promotion')
                            this.setState({fen: '8/PPPPPPPP/8/8/8/k7/8/K7 w - - 0 1'})
                                else if(pos === 'passant')
                                    this.setState({fen: '7k/8/8/8/1p1p1p1p/8/P1P1P1P1/7K w - - 0 1'})
    }
    
    render() {
        return(
            <Jumbotron style={{backgroundColor: 'rgba(80, 80, 80, 0.8)'}}>
                <h3>Contents</h3>
                <ul>
                    <li><a href='#setup'>Setup</a></li>
                    <li><a href='#movement'>Movement</a></li>
                    <li><a href='#castling'>Castling</a></li>
                    <li><a href='#en-passant'>En passant</a></li>
                    <li><a href='#promotion'>Promotion</a></li>
                    <li><a href='#check'>Check</a></li>
                    <li><a href='#end'>End of the game</a></li>
                    <li><a href='#practice'>Practice</a></li>
                </ul>
                <Row id='setup'>                   
                    <Col xs={12} md={6} lg={8}>                         
                        <h3>Setup</h3>
                        <p>By convention, chess game pieces are divided into white and black sets. Each set consists of 16 pieces: one king, one queen, two rooks, two bishops, two knights, and eight pawns. The pieces are set out as shown in the photo.</p>
                        <div style={{textAlign: 'center'}}>
                            <Image src={require('../../img/rules/start-pos.jpg')} className='d-md-none my-1' width='70%' alt='Board' title='Start position' fluid />
                        </div>
                        <p>The game is played on a square board of eight rows (called ranks, denoted <b>1</b> to <b>8</b> from bottom to top according to White's perspective) and eight columns (called files, denoted <b>a</b> to <b>h</b> from left to right according to White's perspective). The 64 squares alternate in color and are referred to as light and dark squares. Each queen starts on a square of its own color.</p>
                    </Col>
                    <Col className='d-none d-md-block pt-5 pt-xl-0' md={6} lg={4}>
                        <Image src={require('../../img/rules/start-pos.jpg')} alt='Board' title='Start position' fluid />
                    </Col>
                </Row>
                <Row id='movement' className='pt-3'>
                    <Col xs={12} xl={5}>
                        <h3>Movement</h3>
                        <p>White moves first, after which players alternate turns, moving one piece per turn (except for castling, when two pieces are moved). A piece is moved to either an unoccupied square or one occupied by an opponent's piece, which is captured and removed from play. With the sole exception of en passant, all pieces capture by moving to the square that the opponent's piece occupies.</p>
                        <p>Moving is compulsory; it is illegal to skip a turn, even when having to move is detrimental. A player may not make any move that would put or leave the player's own king in check. If the player to move has no legal move, the game is over; the result is either checkmate (a loss for the player with no legal move) if the king is in check, or stalemate (a draw) if the king is not.</p>
                        <p>Each piece has its own way of moving:</p>
                    </Col>
                    <Col className='pt-xl-5' xl={7}>
                        <Accordion>
                            <Accordion.Toggle as={Button} className='accordion-btn' variant='dark' eventKey='0'>
                                <h5>King</h5>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey='0'>
                                <Row>
                                    <Col sm={7}>
                                        <p>The king moves one square in any direction. The king also has a special move called castling that involves also moving a rook.</p>
                                    </Col>
                                    <Col sm={5}>
                                        <Image src={require('../../img/rules/king-moves.jpg')} alt='King' title='Moves of the King' fluid />
                                    </Col>                                    
                                </Row>
                            </Accordion.Collapse>
                        </Accordion>
                        <Accordion>
                            <Accordion.Toggle as={Button} className='accordion-btn' variant='dark' eventKey='0'>
                                <h5>Queen</h5>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey='0'>
                                <Row>
                                    <Col sm={7}>
                                        <p>The queen combines the power of a rook and bishop and can move any number of squares along a rank, file, or diagonal, but cannot leap over other pieces.</p>                                    
                                    </Col>
                                    <Col sm={5}>
                                        <Image src={require('../../img/rules/queen-moves.jpg')} alt='Queen' title='Moves of the Queen' fluid />
                                    </Col>
                                </Row>
                            </Accordion.Collapse>
                        </Accordion>
                        <Accordion>
                            <Accordion.Toggle as={Button} className='accordion-btn' variant='dark' eventKey='0'>
                                <h5>Rook</h5>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey='0'>
                                <Row>
                                    <Col sm={7}>
                                        <p>A rook can move any number of squares along a rank or file, but cannot leap over other pieces. Along with the king, a rook is involved during the king's castling move.</p>                                    
                                    </Col>
                                    <Col sm={5}>
                                        <Image src={require('../../img/rules/rook-moves.jpg')} alt='Rook' title='Moves of the Rook' fluid />
                                    </Col>
                                </Row>
                            </Accordion.Collapse>
                        </Accordion>
                        <Accordion>
                            <Accordion.Toggle as={Button} className='accordion-btn' variant='dark' eventKey='0'>
                                <h5>Bishop</h5>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey='0'>
                                <Row>
                                    <Col sm={7}>
                                        <p>A bishop can move any number of squares diagonally, but cannot leap over other pieces.</p>
                                    </Col>
                                    <Col sm={5}>
                                        <Image src={require('../../img/rules/bishop-moves.jpg')} alt='Bishop' title='Moves of the Bishop' fluid />
                                    </Col>
                                </Row>
                            </Accordion.Collapse>
                        </Accordion>
                        <Accordion>
                            <Accordion.Toggle as={Button} className='accordion-btn' variant='dark' eventKey='0'>
                                <h5>Knight</h5>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey='0'>
                                <Row>
                                    <Col sm={7}>
                                        <p>A knight moves to any of the closest squares that are not on the same rank, file, or diagonal. (Thus the move forms an "L"-shape: two squares vertically and one square horizontally, or two squares horizontally and one square vertically.) The knight is the only piece that can leap over other pieces.</p>                                    
                                    </Col>
                                    <Col sm={5}>
                                        <Image src={require('../../img/rules/knight-moves.jpg')} alt='Knight' title='Moves of the Knight' fluid />
                                    </Col>
                                </Row>
                            </Accordion.Collapse>
                        </Accordion>
                        <Accordion>
                            <Accordion.Toggle as={Button} className='accordion-btn' variant='dark' eventKey='0'>
                                <h5>Pawn</h5>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey='0'>
                                <Row>
                                    <Col sm={7}>
                                        <p>A pawn can move forward to the unoccupied square immediately in front of it on the same file, or on its first move it can advance two squares along the same file, provided both squares are unoccupied; or the pawn can capture an opponent's piece on a square diagonally in front of it on an adjacent file, by moving to that square. A pawn has two special moves: the en passant capture and promotion.</p>                                    
                                    </Col>
                                    <Col sm={5}>
                                        <Image src={require('../../img/rules/pawn-moves.jpg')} alt='Pawn' title='Moves of the Pawn' fluid />
                                    </Col>
                                </Row>
                            </Accordion.Collapse>
                        </Accordion>
                    </Col>
                </Row>
                <Row id='castling' className='pt-3'>
                    <Col xs={12} sm={7} lg={8}>
                        <h3>Castling</h3>
                        <p>Once in every game, each king can make a special move, known as castling. Castling consists of moving the king two squares along the first rank toward a rook and then placing the rook on the last square that the king just crossed. Castling is permissible if the following conditions are met:</p>
                        <ul>
                            <li>Neither the king nor the rook has previously moved during the game.</li>
                            <li>There are no pieces between the king and the rook.</li>
                            <li>The king cannot be in check, nor can the king pass through any square that is under attack by an enemy piece, or move to a square that would result in check. (Note that castling is permitted if the rook is under attack, or if the rook crosses an attacked square.)</li>
                        </ul>
                    </Col>
                    <Col className='d-sm-none' xs={2}></Col>
                    <Col className='pt-sm-5 pt-xl-0' xs={8} sm={5} lg={4}>
                        <Image src={require('../../img/rules/castling.jpg')} alt='Castling' title='Castling' fluid />
                    </Col>
                </Row>
                <Row id='en-passant' className='pt-3'>
                    <Col xs={12} sm={7} lg={8}>
                        <h3>En passant</h3>
                        <p>When a pawn makes a two-step advance from its starting position and there is an opponent's pawn on a square next to the destination square on an adjacent file, then the opponent's pawn can capture it en passant ("in passing"), moving to the square the pawn passed over. This can be done only on the very next turn; otherwise the right to do so is forfeited.</p>
                    </Col>
                    <Col className='d-sm-none' xs={2}></Col>
                    <Col className='pt-sm-5 pt-xl-0' xs={8} sm={5} lg={4}>
                        <Image src={require('../../img/rules/en-passant.jpg')} alt='En passant' title='En passant' fluid />
                    </Col>
                </Row>
                <Row id='promotion' className='pt-3'>
                    <Col xs={12} sm={7} lg={8}>
                        <h3>Promotion</h3>
                        <p>When a pawn advances to the eighth rank, as a part of the move it is promoted and must be exchanged for the player's choice of queen, rook, bishop, or knight of the same color. Usually, the pawn is chosen to be promoted to a queen, but in some cases another piece is chosen. There is no restriction on the piece promoted to, so it is possible to have more pieces of the same type than at the start of the game.</p>
                    </Col>
                    <Col className='d-sm-none' xs={2}></Col>
                    <Col className='pt-sm-5 pt-xl-0' xs={8} sm={5} lg={4}>
                        <Image src={require('../../img/rules/promotion.jpg')} alt='Promotion' title='Promotion' fluid />
                    </Col>
                </Row>
                <Row id='check' className='pt-3'>
                    <Col xs={12} sm={7} lg={8}>
                        <h3>Check</h3>
                        <p>When a king is under immediate attack by one or two of the opponent's pieces, it is said to be in check. A move in response to a check is legal only if it results in a position where the king is no longer in check. This can involve capturing the checking piece; interposing a piece between the checking piece and the king; or moving the king to a square where it is not under attack. Castling is not a permissible response to a check.</p>
                        <p>The object of the game is to checkmate the opponent; this occurs when the opponent's king is in check, and there is no legal way to remove it from attack. It is never legal for a player to make a move that puts or leaves the player's own king in check.</p>
                    </Col>
                    <Col className='d-sm-none' xs={2}></Col>
                    <Col className='pt-sm-5 pt-xl-0' xs={8} sm={5} lg={4}>
                        <Image src={require('../../img/rules/check.jpg')} alt='Check' title='Check' fluid />
                    </Col>
                </Row>
                <Row id='end' className='pt-3'>
                    <Col xs={12} sm={7} lg={8}>
                        <h3>End of the game</h3>
                        <h5>Win</h5>
                        <p>Games can be won in the following ways:</p>
                        <ul>
                            <li>Checkmate: The player whose turn it is to move is in check and has no legal move to escape check.</li>
                            <li>Resignation: Either player may resign, conceding the game to the opponent.</li>
                            <li>Win on time: In games with a time control, a player wins if the opponent runs out of time, even if the opponent has a superior position, as long as the player has a theoretical possibility to checkmate the opponent.</li>
                        </ul>
                        <h5>Draw</h5>
                        <p>There are several ways games can end in a draw:</p>
                        <ul>
                            <li>Draw by agreement: Draws are most commonly reached by mutual agreement between the players.</li>
                            <li>Stalemate: The player whose turn it is to move has no legal move and is not in check.</li>
                            <li>Threefold repetition of position: This most commonly occurs when neither side is able to avoid repeating moves without incurring a disadvantage. In this situation, either player can claim a draw. The three occurrences of the position need not occur on consecutive moves for a claim to be valid.</li>
                            <li>Fifty-move rule: If during the previous 50 moves no pawn has been moved and no capture has been made, either player can claim a draw.</li>
                            <li>Insufficient material: If neither player has a theoretical possibility to checkmate the opponent.</li>
                            <li>Draw on time: In games with a time control, the game is drawn if a player is out of time and the opponent has no theoretical possibility to checkmate the player.</li>
                        </ul>
                    </Col>
                    <Col className='d-sm-none' xs={2}></Col>
                    <Col className='pt-sm-5 pt-xl-0' xs={8} sm={5} lg={4}>
                        <Image src={require('../../img/rules/checkmate.jpg')} alt='Checkmate' title='Checkmate' fluid />
                        <p className='pb-sm-5' style={{textAlign: 'center'}}>Checkmate</p>
                        <Image src={require('../../img/rules/stalemate.jpg')} alt='Stalemate' title='Stalemate' fluid />
                        <p style={{textAlign: 'center'}}>Stalemate</p>
                    </Col>
                </Row>
                <Row id='practice'>
                    <Col className='d-md-none' xs={12}>
                        <h3>Practice</h3>
                        <Button onClick={(event) => this.loadPosition(event, 'start')} className='light-gray-btn' size='md' block>Start position</Button>
                        <Button onClick={(event) => this.loadPosition(event, 'castling')} className='light-gray-btn' size='md' block>Castling</Button>
                        <Button onClick={(event) => this.loadPosition(event, 'promotion')} className='light-gray-btn' size='md' block>Promotion</Button>
                        <Button onClick={(event) => this.loadPosition(event, 'passant')} className='light-gray-btn' size='md' block>En passant</Button>
                    </Col>
                    <Col className='d-none d-sm-block d-md-none' sm={1}></Col>
                    <Col className='pt-3 pt-md-0' xs={12} sm={10} md={8} lg={7} xl={6}>
                        <h3 className='d-none d-md-block'>Practice</h3>
                        <Board fen={this.state.fen} />
                    </Col>
                    <Col className='d-none d-md-block pt-md-5' md={4} lg={5} xl={6}>
                        <Button onClick={(event) => this.loadPosition(event, 'start')} className='light-gray-btn' size='md' block>Start position</Button>
                        <Button onClick={(event) => this.loadPosition(event, 'castling')} className='light-gray-btn' size='md' block>Castling</Button>
                        <Button onClick={(event) => this.loadPosition(event, 'promotion')} className='light-gray-btn' size='md' block>Promotion</Button>
                        <Button onClick={(event) => this.loadPosition(event, 'passant')} className='light-gray-btn' size='md' block>En passant</Button>
                    </Col>
                </Row>
            </Jumbotron>
        );
    }
}
export default Learn;