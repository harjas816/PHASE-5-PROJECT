import React from "react";
import { UserContext } from "../context/user";
import { useContext } from "react";
import ThreadCard from "./UserThreadCard";
import "../css/Login.css"



function Home() {



    const { user, setUser } = useContext(UserContext)



    return (
        <div>
            <div>
                <h1 className="username">{user?.username}</h1>
            </div>
        </div>
    )
}

export default Home