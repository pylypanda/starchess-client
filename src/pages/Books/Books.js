import React, { Component } from 'react';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import api from '../../api';

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            isLoading: false
        }
        this.temp = '../../img/books/fischer-teaches.jpg'
    }

    componentDidMount() {
        this.getBooks();
    }

    getBooks = async () => {
        this.setState({ isLoading: true });
        await api.getBooks().then(books => {
            this.setState({
                books: books.data.data,
                isLoading: false
            })
        })
    }

    render() {
        return(
            <Jumbotron style={{backgroundColor: 'rgba(80, 80, 80, 0.8)'}}>
                <p>The number of books written about chess is tremendous. While that can be great for the chess world, it poses practical issues for many fans. Most chess players have their own favorites, but how do you know which books are perfect for you?</p>
                <p className='mb-5'>Here are classic chess books that every fan should know.</p>
                {this.state.isLoading ? <div className='loader centered-hor'></div> : null}
                {this.state.books.map((book, index) => {
                    return(
                        <div className='my-3'>
                            <h3 className='mb-3' style={{color: 'rgb(255, 182, 98)'}}>{index + 1}. <i>{book.name}</i></h3>
                            <Row>
                                <Col xs={12} className='d-md-none' style={{textAlign: 'center'}}>
                                    <img src={book.img} height='300px' />
                                </Col>                                
                                <Col xs={12} md={8} xl={7}>
                                    <p className='mt-2'>Author: <strong>{book.author}</strong></p>
                                    <p>{book.overview}</p>
                                </Col>
                                <Col xs={12} md={4} xl={5} className='d-none d-md-block'>
                                    <img src={book.img} height='350px' />
                                </Col>
                            </Row>
                        </div>
                    )
                })}
            </Jumbotron>
        );
    }
}
export default Books;
