import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";


function Login() {

    const navigate = useNavigate()

    const user = useContext(UserContext)

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
                        setUser(resp.json())
                    }
                })
        }
    })
}


