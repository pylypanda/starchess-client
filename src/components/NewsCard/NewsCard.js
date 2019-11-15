import React from 'react';
import { Card } from 'react-bootstrap';

const NewsCard = news => {
    const { img, title, author, link, article, date } = news;
    let articleChecked = [];
    if(article)
        articleChecked = article.split('||');
    return(
        <Card style={{backgroundColor: 'rgba(200, 200, 200, 0.9)'}}>
            <Card.Img variant='top' src={img} />
            <Card.Body>
                <Card.Title style={{color: 'black'}}>{title}</Card.Title>
                <small className="text-muted mr-2">{date}</small>
                <small className="text-muted">Author:&nbsp;<a href={link} className='news-author' target='_blank'><cite>{author}</cite></a></small>
                <Card.Text style={{color: 'black'}}>
                    {articleChecked.map((par) => {
                        return(
                            <p>{par}</p>
                        )
                    })}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
export default NewsCard;
