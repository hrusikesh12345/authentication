// Signup.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { email, mobile, password } = values;

    // Simulate signup request (replace with actual API call)
    fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, mobile, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Signup successful!");
        navigate("/login"); // redirect to login page after successful signup
      })
      .catch((error) => {
        toast.error("Signup failed!");
      });
  };

  return (
    <div className="card w-75 mx-auto mt-5 shadow border-black border-1">
      <div className="card-head text-center rounded-top-1  p-3 text-light" style={{backgroundColor:'#172A3A'}}>
        <h2>Sign Up</h2>
      </div>
      <div className="card-body p-4">
        <Formik
          initialValues={{ email: "", mobile: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="text-danger mb-2">
              <ErrorMessage name="email" component="div" className="error-message" />
              <ErrorMessage name="mobile" component="div" className="error-message" />
              <ErrorMessage name="password" component="div" className="error-message" />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>

            <div className="form-group mb-3">
              <label>Email</label>
              <Field type="email" name="email" className="form-control" />
            </div>

            <div className="form-group mb-3">
              <label>Mobile Number</label>
              <Field type="text" name="mobile" className="form-control" />
            </div>

            <div className="form-group mb-3">
              <label>Password</label>
              <Field type="password" name="password" className="form-control" />
            </div>

            <div className="form-group mb-3">
              <label>Confirm Password</label>
              <Field type="password" name="confirmPassword" className="form-control" />
            </div>

            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
