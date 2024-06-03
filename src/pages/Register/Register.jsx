import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "./registerSlice";
import { useNavigate } from "react-router";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector((store) => store.registerReducer.message);

  function submitRegister(values) {
    dispatch(userRegister(values));
  }

  useEffect(() => {
    if (message === "success") {
      navigate("/login");
    }
  }, [message, navigate]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10,11}$/, "Phone number must be 10 or 11 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Re-enter your password"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: submitRegister,
  });

  return (
    <div className="w-75 mx-auto p-5">
      <h3>Register Now</h3>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            className="form-control mt-2"
            type="text"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
            id="name"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-danger">{formik.errors.name}</div>
          ) : null}
        </div>
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
          <label htmlFor="phone">Phone</label>
          <input
            className="form-control mt-2"
            type="tel"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            name="phone"
            id="phone"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-danger">{formik.errors.phone}</div>
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
        <div>
          <label htmlFor="rePassword">Re-enter Password</label>
          <input
            className="form-control mt-2"
            type="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            name="rePassword"
            id="rePassword"
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div className="text-danger">{formik.errors.rePassword}</div>
          ) : null}
        </div>

        <button type="submit" className="btn bg-main mt-4 text-white">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
