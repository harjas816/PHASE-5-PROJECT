import React from "react";
import {Card, Button} from 'react-bootstrap';
import { useState } from "react";
import { useNavigate } from "react-router-dom";




function ThreadCard({id, title, description, creator}){

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/threads/${id}`)
    }
    

    return(
        <Card  className="threadcard" onClick={handleClick} style={{width: '24rem'}}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text>By: {creator.username}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ThreadCard
