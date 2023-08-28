import React from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/user";
import { useContext } from "react";
import "../css/Navbar.css"
import { useNavigate } from "react-router-dom";


function Navbar() {

    const { user, setUser } = useContext(UserContext)

    const handleLogOut = () => {
        fetch("/logout", { method: "DELETE" })
        setUser(null)
        navigate("/")
    }
    const navigate = useNavigate()
    return (
        <div className="header">
            <div className="right-side-nav-bar">
                <h1 className='tasty-bites'>Dap Up</h1>
            </div>
            <div className="nav-bar">
                <li className="nav-bar-list"><NavLink className="nav-bar-link" to="/Home">Home</NavLink></li>
                <li className="nav-bar-list"><NavLink className="nav-bar-link" to="/Threads">Threads</NavLink></li>
                <div classname="front-page-button">
                    <button onClick={handleLogOut}>Log Out</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar