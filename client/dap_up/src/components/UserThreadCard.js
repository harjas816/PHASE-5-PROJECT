import React from "react";
import {Card, Button} from 'react-bootstrap';
import { useState } from "react";




function ThreadCard({id, title, description, user_id, likes, dislikes }){
    return(
        <Card  className="card">
            <Card.Body>
                <Card.Title>Hello There</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default ThreadCard
