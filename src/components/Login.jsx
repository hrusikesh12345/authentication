// Login.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a special character")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { email, password } = values;
    
    // Simulate login request (replace with actual API call)
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Login successful!");
        navigate("/dashboard"); // redirect to dashboard or home page
      })
      .catch((error) => {
        toast.error("Login failed!");
      });
  };

  return (
    <div className="card w-75 mt-5 mx-auto border-black border-1 shadow">
      <div className="card-head text-center p-3 rounded-top-1 text-light" style={{backgroundColor:'#172A3A'}}>
        <h2>Login</h2>
      </div>
      <div className="card-body p-4">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="text-danger mb-3">
              <ErrorMessage name="email" component="div" className="error-message" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <Field type="email" name="email" className="form-control" />
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <Field type="password" name="password" className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
