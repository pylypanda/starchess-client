import React from 'react';
import { Card } from 'react-bootstrap';

const NewsCard = news => {
    const { img, title, author, article, date } = news;
    return(
        <Card style={{backgroundColor: 'rgba(200, 200, 200, 0.9)'}}>
            <Card.Img variant='top' src={img} fluid />
            <Card.Body>
                <Card.Title style={{color: 'black'}}>{title}</Card.Title>
                <small className="text-muted mr-2">{date}</small>
                <small className="text-muted">Author:&nbsp;<cite>{author}</cite></small>
                <Card.Text style={{color: 'black'}}>
                    {article}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
export default NewsCard;
