import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { resetMessage, userLogin } from "./loginSlice";
import Spinner from "../../components/Spinner";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector((store) => store.loginReducer.message);
  const loading = useSelector((store) => store.loginReducer.loading);
  const [btnContent,setbtnContent]=useState("Login")
  const token = useSelector((store) => store.loginReducer.token);
  const [passwordType, setPasswordType] = useState("password");
  function submitLogin(values) {
    dispatch(userLogin(values));
   if(loading ==="idle")
    {
      setbtnContent(<Spinner/>)
    }
  }

  useEffect(() => {
    if (message === "success") {
      localStorage.setItem("userToken", token);

      dispatch(resetMessage());
      navigate("/", { replace: true });
    }
  }, [message, navigate, token, dispatch]);

  useEffect(() => {
    // Load token from local storage and update the state
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      dispatch({
        type: "login/loginUser/fulfilled",
        payload: { token: storedToken },
      });
      navigate("/", { replace: true });
    }
  }, [dispatch,navigate]);
  
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
          <div className="position-relative">
            <input
              className="form-control mt-2"
              type={passwordType}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              id="password"
            />

            <FontAwesomeIcon
              className="position-absolute end-0 pe-4  translate-middle-y"
              icon={faEye}
              onClick={() =>
                passwordType === "password"
                  ? setPasswordType("text")
                  : setPasswordType("password")
              }
              style={{
                backgroundColor: "transparent",
                top: "55%",
                cursor: "pointer",
              }}
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
        </div>

        {message && <div className="alert alert-danger">{message}</div>}

        <button type="submit" className="btn bg-main mt-4 text-white">
        {btnContent}
        </button>
      </form>
    </div>
  );
}

export default Login;
