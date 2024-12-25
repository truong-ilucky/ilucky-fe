import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "./register.css"
import {useTranslation} from "react-i18next";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const{t, i18n} = useTranslation();

    const togglePassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    const validateSchema = Yup.object({
        username: Yup.string().required(t("Username is required")),
        password: Yup.string()
            .required(t("Password is required"))
            .min(6, t("Password must be at least 6 characters")),
    });

    const handleSubmit = async (values,{setFieldError}) => {
        try {
            const res = await axios.get(`http://localhost:8085/api/user/find/${values.username}`);
            console.log(res);
            if (res.status === "409") {
                setFieldError("username", t("Username already exists"));
                return;
            }
                await axios.post("http://localhost:8085/api/user/create", values);
                toast.success(t("User created successfully"));
                navigate("/login");

        } catch (err) {
            console.error(err);
            toast.error("An error occurred. Please try again.");

        }
    }



    return (
        <div className="register">
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={validateSchema}
                onSubmit={(values,{setFieldError}) => handleSubmit(values,{setFieldError})}
            >
                <Form>
                    <div>
                        <Field
                            name="username"
                            type="text"
                            placeholder="Username"
                        />
                        <ErrorMessage name="username" component="div" className="text-danger" />
                    </div>

                    <div className="field-pass">
                        <Field
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                        />
                        <div className="showPass">
                        <button onClick={togglePassword}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        </div>
                        <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>

                    <div>
                        <button type="submit">{t("Register")}</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default Register;
