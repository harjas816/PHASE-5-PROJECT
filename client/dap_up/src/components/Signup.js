import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";



function Signup() {

    const navigate = useNavigate()

    const formSchema = yup.object().shape({
        username: yup.string(),
        email: yup.string().email(),
        password: yup.string()
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/users`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(values)
            })
                .then(resp => {
                    if (resp.ok) {
                        console.log("you have successfully signed up!")
                        navigate("/")
                    }
                    else {
                        console.log("handle errors!")
                    }
                })
        }
    })


    return (


        <form onSubmit={formik.handleSubmit}>
            <input
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="username"
            >
            </input>

            <br></br>

            <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="email"
            ></input>

            <br></br>

            <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="password"
            ></input>

            <br></br>

            <button type="submit"> sign up!</button>

            <br></br>

            <Link to={-1}>
                <button>back</button>
            </Link>
        </form>
    )
}

export default Signup