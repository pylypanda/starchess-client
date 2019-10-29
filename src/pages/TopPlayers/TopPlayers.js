import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import api from '../../api';
import TopPlayersTable from '../../components/TopPlayersTable/TopPlayersTable';

class TopPlayers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: [],
            header: ''
        }
    }

    componentDidMount() {
        this.getTopStandart();
    }

    getTopStandart = async () => {
        await api.getTopStandartPlayers().then(top => {
            this.setState({
                top: top.data.data,
                header: "Standart"
            });
        });        
    }

    getTopStandartWomen = async () => {
        await api.getTopStandartWomPlayers().then(top => {
            this.setState({
                top: top.data.data,
                header: "Standart / Women"
            });
        });
    }

    getTopRapid = async () => {
        await api.getTopRapidPlayers().then(top => {
            this.setState({
                top: top.data.data,
                header: "Rapid"
            });
        });      
    }

    getTopRapidWomen = async () => {
        await api.getTopRapidWomPlayers().then(top => {
            this.setState({
                top: top.data.data,
                header: "Rapid / Women"
            });
        });
    }

    getTopBlitz = async () => {
        await api.getTopBlitzPlayers().then(top => {
            this.setState({
                top: top.data.data,
                header: "Blitz"
            });
        });        
    }

    getTopBlitzWomen = async () => {
        await api.getTopBlitzWomPlayers().then(top => {
            this.setState({
                top: top.data.data,
                header: "Blitz / Women"
            });
        });
    }

    sortTop = (sorted) => {
        this.setState({
            top: sorted
        });
    }

    topButtons = <>
    <div className='d-sm-inline-block d-md-block'>
        <h4 className='mt-md-3'>Standart:</h4>
        <Button onClick={this.getTopStandart} className='light-gray-btn' variant="warning" size='md' block>Top 100 Players</Button>
        <Button onClick={this.getTopStandartWomen} className='light-gray-btn' variant="warning" size='md' block>Top 100 Women</Button>        
    </div>
    <div className='d-sm-inline-block d-md-block'>
        <h4 className='mt-md-3'>Rapid:</h4>
        <Button onClick={this.getTopRapid} className='light-gray-btn' variant="warning" size='md' block>Top 100 Players</Button>
        <Button onClick={this.getTopRapidWomen} className='light-gray-btn' variant="warning" size='md' block>Top 100 Women</Button>        
    </div>
    <div className='d-sm-inline-block d-md-block'>
        <h4 className='mt-md-3'>Blitz:</h4>
        <Button onClick={this.getTopBlitz} className='light-gray-btn' variant="warning" size='md' block>Top 100 Players</Button>
        <Button onClick={this.getTopBlitzWomen} className='light-gray-btn' variant="warning" size='md' block>Top 100 Women</Button>        
    </div>
    </>

    render() {
        return(
            <>
            <Row>
                <Col className='d-md-none mb-3' xs={12}>
                    {this.topButtons}
                </Col>
                <Col xs={12} md={8}>
                    <h2>{this.state.header}</h2>
                    <TopPlayersTable top={this.state.top} sortTop={this.sortTop} />
                </Col>
                <Col className='d-none d-md-block' md={4}>
                    {this.topButtons}
                </Col>
            </Row>
            </>
        );
    }
}
export default TopPlayers;
