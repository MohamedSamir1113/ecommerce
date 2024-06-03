import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router";
import { userLogin } from "./loginSlice";


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector((store) => store.loginReducer.message);
  const token = useSelector((store) => store.loginReducer.token);
  
  function submitLogin(values) {
    dispatch(userLogin(values));
  }

  useEffect(() => {
    if (message === "success") {
        localStorage.setItem('userToken',token)
      navigate("/");
    }
  }, [message, navigate,token]);

  useEffect(() => {
    // Load token from local storage and update the state
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      dispatch({ type: 'login/loginUser/fulfilled', payload: { token: storedToken } });
    }
  }, [dispatch]);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: submitLogin,
  });

  return (
    <div className="w-75 mx-auto p-5">
      <h3>Login Now</h3>
      <form onSubmit={formik.handleSubmit}>
        
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="form-control mt-2"
            type="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            id="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className="form-control mt-2"
            type="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            id="password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
        </div>
        

        <button type="submit" className="btn bg-main mt-4 text-white">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
