import React from "react";
import axios from "axios";
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

  const handleSubmit = async (values) => {
    const { email, password } = values;
  
    try {
      const response = await axios.post("http://localhost:8085/api/v1/user/save", {
        email,
        password,
      });
  
      if (response.status === 200 || response.status === 201) {
        toast.success("Signup successful!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup Error:", error);
  
      if (error.response) {
        const message = error.response.data.message;
  
        if (message === "Email already exists!") {
          toast.error("Email already exists!");
        } else {
          toast.error(message || "Signup failed!");
        }
      } else {
        toast.error("Signup failed! Please try again.");
      }
    }
  };

  return (
    <div className="card col-sm-9 col-lg-6 mx-auto mt-5 shadow border-black border-1">
      <div className="card-head text-center rounded-top-1 p-3 text-light" style={{ backgroundColor: '#172A3A' }}>
        <h2>Sign Up</h2>
      </div>
      <div className="card-body p-4 mt-3">
        <Formik
          initialValues={{ email: "", mobile: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form>
              <div className="d-flex justify-content-end">
              {touched.email && errors.email && (
                  <div className="error-message-container">
                    <div className="error-message">{errors.email}</div>
                  </div>
                )}
              </div>
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
              <div className="d-flex justify-content-end">

              {touched.mobile && errors.mobile && (
                <div className="error-message-container">
                    <div className="error-message">{errors.mobile}</div>
                  </div>
                )}
                </div>
              <div className="form-floating mb-4">
                <Field
                  type="text"
                  name="mobile"
                  className={`form-control ${touched.mobile && errors.mobile ? 'is-invalid' : ''}`}
                  id="floatingInput"
                  placeholder="9999999999"
                />
                <label htmlFor="floatingInput">Mobile</label>
                
              </div>
              <div className="d-flex justify-content-end">
                
              {touched.password && errors.password && (
                <div className="error-message-container">
                    <div className="error-message">{errors.password}</div>
                  </div>
                )}
                </div>
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
              <div className="d-flex justify-content-end">
                
                {touched.confirmPassword && errors.confirmPassword && (
                  <div className="error-message-container">
                    <div className="error-message">{errors.confirmPassword}</div>
                  </div>
                )}
                </div>
              <div className="form-floating mb-4">
                <Field
                  type="password"
                  name="confirmPassword"
                  className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                  id="floatingConfirmPassword"
                  placeholder="Confirm Password"
                />
                <label htmlFor="floatingConfirmPassword">Confirm Password</label>
              </div>

              <button type="submit" className="btn btn-secondary">
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
