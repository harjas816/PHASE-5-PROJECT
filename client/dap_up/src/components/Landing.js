import React from "react";
import { useNavigate } from "react-router-dom";




function Landing(){

    const navigate = useNavigate()
    
    return(
        <div>
            <h1>Dap_Up</h1>
            <button onClick={() => navigate("/signup_page")}>Signup</button>
            <br></br>
            <button onClick={() => navigate("/login")}>Login</button>
        </div>
    )
}

export default Landing