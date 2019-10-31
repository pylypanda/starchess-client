import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import api from '../../api';

class Engines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            engines: [],
            isLoading: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getEngines();
    }

    getEngines = async () => {
        this.setState({ isLoading: true });
        await api.getEngines().then(engines => {
            this.setState({
                engines: engines.data.data,
                isLoading: false
            })
        })
    }

    render() {
        return(
            <>
            <Jumbotron style={{backgroundColor: 'rgba(80, 80, 80, 0.8)'}}>
                <h1 className='pb-3'>Chess Engines</h1>
                <p>&emsp;&emsp;Chess engine is a computer program that analyzes chess or chess variant positions, and generates a move or list of moves that it regards as strongest. A chess engine is usually a back end with a command-line interface with no graphics or windowing. Engines are usually used with a front end, a windowed graphical user interface such as Chessbase or WinBoard that the user can interact with via a keyboard, mouse or touchscreen. This allows the user to play against multiple engines without learning a new user interface for each, and allows different engines to play against each other. Over the last years, there are chess engines available for mobile phones and tablets, which makes their usage easier.</p>
                <h2 className='text-center py-3'>Top-10 Chess Engines</h2>
                {this.state.isLoading ? <div className='loader centered-hor'></div> : null}
                {this.state.engines.map((engine) => {
                    return(
                        <div className='pt-3'>
                            <h4 style={{color: 'rgb(255, 182, 98)'}}>{engine.rank}. {engine.name}</h4>
                            <h6>Rating: <i>{engine.rating}</i></h6>
                            <p>{engine.description}</p>
                            <p>Link: <a href={engine.link} target='_blank'><b>{engine.name}</b></a></p>
                        </div>
                    )
                })}
            </Jumbotron>
            </>
        );
    }
}
export default Engines;
