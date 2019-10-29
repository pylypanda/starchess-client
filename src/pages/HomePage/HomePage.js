import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Card, Jumbotron } from 'react-bootstrap';
import NewsCard from '../../components/NewsCard/NewsCard';
import api from '../../api';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getSomeNews(5);
  }

  getSomeNews = async (quantity) => {
    await api.getSomeNews(quantity).then(news => {
      this.setState({
        news: news.data.data
      })
      console.log(this.state.news);
    })
  }

  render(){
    return (
      <Row>
        <Col xs={12} md={7} lg={8}>
          <Row>
            {this.state.news.map((news, index) => {
              if(index !== 0)
                return(
                  <Col xs={12} lg={6} className='news-preview pt-3'>
                    <NavLink to={`/news/${news._id}`}>
                        <NewsCard {...news} />
                    </NavLink>
                  </Col>
                )
              else
                return(
                <Col xs={12} className='news-preview'>
                  <NavLink to={`/news/${news._id}`}>
                      <NewsCard {...news} />
                  </NavLink>
                </Col>
              )                
            })            
            }
          </Row>
        </Col>
        <Col className='d-none d-md-block' md={5} lg={4}>
          <Jumbotron className='pt-3' style={{backgroundColor: 'rgba(80, 80, 80, 0.8)'}}>
            <NavLink to='/puzzles'>
              <Card className='mb-3 pb-2' style={{backgroundColor: 'rgba(200, 200, 200, 0.9)'}}>
                <Card.Img src={require('../../img/ChessBoard.png')} fluid />
                <Card.Title style={{color: 'black', textAlign: 'center'}}>Puzzles</Card.Title>
                <Card.Text style={{color: 'black', textAlign: 'center'}}>Tactics training</Card.Text>
              </Card>
            </NavLink>
            <NavLink to='/openings'>
              <Card className='mb-3 pb-2' style={{backgroundColor: 'rgba(200, 200, 200, 0.9)'}}>
                <Card.Img src={require('../../img/openings.jpg')} fluid />
                <Card.Title style={{color: 'black', textAlign: 'center'}}>Openings</Card.Title>
                <Card.Text style={{color: 'black', textAlign: 'center'}}>Find your perfect opening</Card.Text>
              </Card>
            </NavLink>
            <NavLink to='/top'>
              <Card className='mb-3 pb-2' style={{backgroundColor: 'rgba(200, 200, 200, 0.9)'}}>
                <Card.Img src={require('../../img/top.jpg')} fluid />
                <Card.Title style={{color: 'black', textAlign: 'center'}}>Top-100</Card.Title>
                <Card.Text style={{color: 'black', textAlign: 'center'}}>100 best chess players in the world</Card.Text>
              </Card>
            </NavLink>
            <NavLink to='/engines'>
              <Card className='mb-3 pb-2' style={{backgroundColor: 'rgba(200, 200, 200, 0.9)'}}>
                <Card.Img src={require('../../img/engines.jpg')} fluid />
                <Card.Title style={{color: 'black', textAlign: 'center'}}>Chess Engines</Card.Title>
                <Card.Text style={{color: 'black', textAlign: 'center'}}>Most popular modern chess programs</Card.Text>
              </Card>
            </NavLink>
          </Jumbotron>
        </Col>
      </Row>
    );
  }
}

export default HomePage;
