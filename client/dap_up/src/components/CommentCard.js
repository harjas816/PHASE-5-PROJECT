import React from "react";
import "../css/Threadcard.css"
import { Card } from "react-bootstrap";


function CommentCard({content, user}) {
    return (
        <Card  style={{ width: '24rem' }}>
            <Card.Body>
                <Card.Text>{content}</Card.Text>
                <Card.Text>By: {user["username"]}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CommentCard