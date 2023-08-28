import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css"


function Login() {

    const navigate = useNavigate()



    const { user, setUser } = useContext(UserContext)

    const formSchema = yup.object().shape(
        {
            username: yup.string(),
            password: yup.string()
        }
    )

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/login', {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(values)
            })
                .then(resp => {
                    if (resp.ok) {
                        resp.json().then(resp_body => {
                            setUser(resp_body)
                            navigate("/Home")

                        })
                    }
                })


        }
    })

    return (
        <div >
            <div className="cover">
                <form onSubmit={formik.handleSubmit}>
                    <h1 className="Header">Dap Up</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            placeholder="username"
                        ></input>
                    </div>

                    <br>
                    </br>
                    <div className="input-box">
                        <input
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder="password"
                        ></input>
                    </div>

                    <br>
                    </br>

                    <button className="front-page-button" type="submit">login</button>

                    <br>
                    </br>

                    




                </form>
            </div>
        </div>
    )
}


export default Login


