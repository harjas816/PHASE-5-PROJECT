import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { UserContext } from "../context/user";
import { useContext } from "react";
import { useState } from "react";

function HomePageThreadCard({ id, title, description, creator }) {

    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [tform, setTform] = useState(false)
    const [formObj, setformObj] = useState({})


    const handleView = () => {
        navigate(`/threads/${id}`)
    }

    const handleUserReRender = () => {
        fetch("/authorized")
            .then(r => {
                if (r.ok) {
                    r.json().then(resp => {
                        setUser(resp)
                    })
                }
            })
    }

    const handleDelete = () => {
        fetch(`/threads/${id}`, {
            method: 'DELETE'
        })
        handleUserReRender()
    }

    const handleFormToggle = () => {
        setTform(!tform)
    }

    const handleChange = (e) => {
        setformObj({ ...formObj, [e.target.name]: e.target.value })
        console.log(formObj)
    }

    const handleSubmit = () => {
        fetch(`/threads/${id}`, {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formObj)
        })
            .then(r => {
                if (r.ok) {
                    handleUserReRender()
                }
            })
    }




    return (
        <Card className="threadcard" style={{ width: '11rem' }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
            <Button onClick={handleDelete} style={{ width: "10rem" }}>Delete Thread</Button>
            <br></br>
            <Button onClick={handleView} style={{ width: "10rem" }}>View Thread</Button>
            <br>
            </br>
            <Button onClick={handleFormToggle} style={{ width: "10rem" }}>Edit Thread</Button>
            <div>
                {tform ? <form onSubmit={handleSubmit} >
                    <input
                        type="textbox"
                        name="title"
                        onChange={handleChange}
                        placeholder="Title"
                    ></input>
                    <br></br>
                    <input
                        type="textbox"
                        name="description"
                        onChange={handleChange}
                        placeholder="Description"
                    ></input>
                    <input
                        type = "number"
                        name = "id"
                        value={id}
                    >
                    </input>
                    <br></br>
                    <br></br>
                    <button type="submit">submit</button>
                </form> : <div></div>}
            </div>
        </Card>
    )

}

export default HomePageThreadCard