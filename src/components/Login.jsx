import React from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a special character")
    .required("Password is required"),
});

const Login = () => {

  const handleSubmit = async (values) => {
    const { email, password } = values;
    
    try {
      const response = await axios.post("http://localhost:8880/api/auth/login", {
        email,
        password,
      });
  
      if (response.status === 200) {
        toast.success("Login successful!");
      }
    } catch (error) {
      console.error("Login Error:", error);
  
      if (error.response) {
        toast.error(error.response.data.message || "Login failed!");
      } else {
        toast.error("Login failed! Please try again.");
      }
    }
  };

  return (
    <div className="card col-sm-9 col-lg-6 mt-5 mx-auto border-black border-1 shadow">
      <div className="card-head text-center p-3 rounded-top-1 text-light" style={{backgroundColor:'#172A3A'}}>
        <h2>Login</h2>
      </div>
      <div className="card-body p-4">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form className="mt-3">
              {touched.email && errors.email && (
                  <div className="error-message-container">
                    <div className="error-message">{errors.email}</div>
                  </div>
                )}
              <div className="form-floating mb-4">
                <Field
                  type="email"
                  name="email"
                  className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email address</label>
                
              </div>
              {touched.password && errors.password && (
                  <div className="error-message-container">
                    <div className="error-message">{errors.password}</div>
                  </div>
                )}
              <div className="form-floating mb-4">
                <Field
                  type="password"
                  name="password"
                  className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
                
              </div>

              <button type="submit" className="btn btn-secondary">
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
