import React from "react";
import { UserContext } from "../context/user";
import { useContext } from "react";
import ThreadCard from "./ThreadCard";
import "../css/Login.css"
import HomePageThreadCard from "./HomePageThreadCard";
import { useEffect } from "react";
import "../css/Home.css"
import { useState } from "react";



function Home() {


    const { user, setUser } = useContext(UserContext)
    const [formObj, setformObj] = useState({})
    const [tform, setTform] = useState(false)

    const handleFormToggle = () => {
        setTform(!tform)
    }

    const handleChange = (e) => {
        setformObj({ ...formObj, [e.target.name]: e.target.value })
        console.log(formObj)
    }

    const handleUserReRender = () => {
        fetch("/authorized")
        .then(r => {
          if(r.ok){
            r.json().then(resp => {
              setUser(resp)
            })
          }
        })
    }


    const handleSubmit = () => {
        fetch("/threads", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formObj)
        })
        .then(r => {
            if (r.ok){
                handleUserReRender()
            }
        })
    }


    const usersThreads = user?.created_threads.map(t => {
        return (
            <HomePageThreadCard
                key={t.id}
                id={t.id}
                title={t.title}
                description={t.description}
                creator={t.creator}
            />
        )

    })

    console.log(usersThreads)




    return (
        <div>
            <div className="Header">
                <h1>{user?.username}</h1>
            </div>
            <div className="wrapper">
                {usersThreads ? usersThreads : <div></div>}
                <br></br>

                <br></br>
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
                                type="number"
                                name="id"
                                onChange={handleChange}
                                placeholder="user_id"
                            >
                            </input>
    
                        <br></br>
                        <br></br>
                        <button type="submit">submit</button>
                    </form> : <div></div>
                    }
                </div>
            </div>
            <button onClick={handleFormToggle}>add new thread</button>
        </div>
    )

}

export default Home