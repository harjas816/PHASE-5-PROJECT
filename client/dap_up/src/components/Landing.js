import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import { useState } from "react";
import "../css/Login.css"




function Landing() {

    const [login, setLogin] = useState(true)


    const handleLoginToggle = () => {
        setLogin(!login)
    }


    return (
        <div>


            {login ? <Login /> : <Signup handleLoginToggle = {handleLoginToggle}/>}
            
            <div className="landing-button-container">
                <button className = "landing-button" onClick={handleLoginToggle}>{login ? 'Not a member? Sign Up!':'Already a Member? Log In!' }</button>
            </div>
        </div>
    )
}

export default Landing