import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";


function Signup() {

    const [form, setForm] = useState({})

    const changeForm = (e) => {
        setForm((f) => { 
            return { ...f, [e.target.name]: e.target.value } 
        })
    }

    return (
        <form>
            <Link to={-1}>
                <button>back</button>
            </Link>
        </form>
    )
}

export default Signup