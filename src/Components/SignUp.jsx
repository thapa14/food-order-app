import React, { useState, useEffect } from "react";
import { signUpFunc } from "../Redux/menuSlice";
import { useDispatch } from "react-redux";

function SignUp({ toggleVisibility, setSignUpUser }) {
  // states
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});

  const [signupData, changeSignupData] = useState({
    userName: "",
    userEmail: "",
    userDob: "",
    userPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    changeSignupData(() => {
      return {
        ...signupData,
        [name]: value,
      };
    });
  };

  const formValidation = (values) => {
    const errors = {};
    if (!values.userName) {
      errors.userName = "username is required";
    }
    if (!values.userEmail) {
      errors.userEmail = "email is required";
    }
    if (!values.userPassword) {
      errors.userPassword = "password is required";
    }
    if (!values.userDob) {
      errors.userDob = "DOB is required";
    }
    return errors;
  };

  const handleSubmitClick = (e) => {
    const { userName, userEmail, userDob, userPassword } = signupData;
    e.preventDefault();
    setFormErrors(() => {
      return formValidation(signupData);
    });
    console.log(formErrors);
    if (userName && userEmail && userDob && userPassword) {
      dispatch(
        signUpFunc({
          userData: { ...signupData },
        })
      );
      changeSignupData(() => {
        return { userName: "", userEmail: "", userDob: "", userPassword: "" };
      });
      toggleVisibility(false);
      setSignUpUser(true);
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0) {
      console.log("signupData");
    }
  }, [formErrors]);

  return (
    <>
      <div className="login-ad d-flex justify-content-end align-items-center">
        <h5>Already have an account</h5>
        <button
          className="btn btn-success"
          onClick={() => toggleVisibility(false)}
        >
          Log In
        </button>
      </div>
      <div className="login-main signup-main">
        <h1 className="display-6 fw-normal">Welcome to Food's Restaurant</h1>
        <h2>Please Sign up here</h2>

        <form onSubmit={handleSubmitClick}>
          <div className="login-field signup-field ">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="userName"
              type="text"
              placeholder="enter your name"
              value={signupData.userName}
              onChange={handleInputChange}
            />
            <p className="m-0 fs-5 text-danger">{formErrors.userName}</p>
          </div>
          <div className="login-field signup-field ">
            <label htmlFor="DOB">DOB</label>
            <input
              type="date"
              name="userDob"
              placeholder="enter your DOB"
              onChange={handleInputChange}
              value={signupData.userDob}
            />
            <p className="m-0 fs-5 text-danger">{formErrors.userDob}</p>
          </div>
          <div className="login-field signup-field ">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              name="userEmail"
              placeholder="enter your email"
              onChange={handleInputChange}
              value={signupData.userEmail}
            />
            <p className="m-0 fs-5 text-danger">{formErrors.userEmail}</p>
          </div>
          <div className="login-field signup-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="userPassword"
              placeholder="Password123"
              onChange={handleInputChange}
              value={signupData.userPassword}
            />
            <p className="m-0 fs-5 text-danger">{formErrors.userPassword}</p>
          </div>

          <input type="submit" value="Sign Up" className="btn btn-primary" />
        </form>
      </div>
    </>
  );
}

export default SignUp;
