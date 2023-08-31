import React from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../css/Threadcard.css"
import CommentCard from "./CommentCard";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";


function ThreadPage({ threads }) {


    const { id } = useParams()

    const navigate = useNavigate()

    const selectedThread = threads.filter(t => t.id == id)[0]

    const threadComments = selectedThread?.comments.map(c => {
        return (
            <CommentCard
                content={c.content}
                user={c.user}
            />
        )
    })

    const { user, setUser } = useContext(UserContext)

    const [comform, setComform] = useState(false)

    const handlFormButtonClick = () => {
        setComform(!comform)
    }



    const [formObj, setformObj] = useState({ "user_id": user?.id, "thread_id": selectedThread?.id })

    const handleChange = (e) => {
        setformObj({ ...formObj, [e.target.name]: e.target.value })
    }

    const handleNavBack = () => {
        navigate("/Threads")
    }

    const handleSubmit = () => {
        fetch("/comments", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formObj)
        })
    }

    





    return (
        <div>
            <Card className="threadcard" style={{ width: "25rem" }}>
                <Card.Body className="threadcard">
                    <Card.Header>{selectedThread?.title}</Card.Header>
                    <Card.Text>{selectedThread?.description}</Card.Text>
                </Card.Body>
            </Card>

            <div>
                {threadComments}
            </div>

            <div>
                <button className="Toggle" onClick={handlFormButtonClick}>{comform ? "go back" : "add comment"}</button>
            </div>
            <br></br>
            <br></br>
            <div>
                {comform ?
                    <form onSubmit={handleSubmit}>
                        <input
                            type="textbox"
                            name="content"
                            onChange={handleChange}
                        ></input>
                        <br></br>
                        <br></br>
                        <button type="submit">submit</button>
                    </form> : <div></div>
                }
            </div>
            <div>
                <button onClick={handleNavBack}>Thread Page</button>
            </div>
            
        </div>

    )
}

export default ThreadPage