import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {Formik, Field, Form, validateYupSchema, ErrorMessage} from "formik";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import "./login.css"


const PageLogin = () => {
    const{t, i18n} = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);}
    const navigate = useNavigate();

    const validateSchema = Yup.object({
        username: Yup.string().required(t("Username is required")),
        password: Yup.string().required(t("Password is required")),
    })

    const handleSubmit =async (values) => {
      try {
          const res = await axios.post("http://localhost:8085/api/auth/login", values)
          console.log(res)
          if (res.status === "404") {
              toast.error("username or password doesn't exist");
          } else {
              console.log(res.accessToken)
              localStorage.setItem("token",res.accessToken)
              navigate("/");
          }
      }catch(err) {
          console.log(err);
      }

    }

    return (
       <div className="login">
           <Formik initialValues={{username:"", password:""}}
                   validationSchema={validateSchema}
                   onSubmit={(values)=>handleSubmit(values)}>
               <Form>
                   <h2>Wellcome to ILucky</h2>

                   <div><Field
                       name="username"
                       type="text"
                       placeholder="Username">
                   </Field>
                       <ErrorMessage name="username" component="div" className="text-danger" />
                   </div>

                   <div className="field-pass">
                    <Field
                       name="password"
                       type = {showPassword ? "text" : "password"}
                       placeholder = "Password">
                    </Field>
                       <div className="showPass">
                       <button onClick={(e) =>{e.preventDefault(); togglePasswordVisibility()}}>{showPassword ? <FaEyeSlash/> : <FaEye/>}</button></div>
                       <ErrorMessage name="password" component="div" className="text-danger" />
                   </div>

                   <button type="submit">{t("Login")}</button>
                   <button onClick={(e)=> {e.preventDefault();
                       navigate("/register")}} style={{color:"orange"}}>{t("Register")}</button>

               </Form>
           </Formik>
       </div>
    )
};

export default PageLogin;
