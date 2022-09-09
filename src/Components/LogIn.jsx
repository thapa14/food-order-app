import React, { useState } from "react";
import { logInFunc } from "../Redux/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function LogIn({ toggleVisibility, setSignUpUser, isSignUpUser }) {
  // states
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.cart.userList);
  const userData = storeData.userList;
  const [loginFormError, setLoginFormError] = useState({});
  const [userLoginData, changeUserLoginData] = useState({
    userEmail: "",
    userPassword: "",
  });
  // console.log(userData);
  // console.log(userData[userData.length - 1]);

  useEffect(() => {
    if (isSignUpUser) {
      changeUserLoginData(() => {
        return {
          userEmail: userData[userData.length - 1].userEmail,
          userPassword: userData[userData.length - 1].userPassword,
        };
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    changeUserLoginData(() => {
      return {
        ...userLoginData,
        [name]: value,
      };
    });
  };

  const formValidation = (values) => {
    const errors = {};
    if (!values.userEmail) {
      errors.userEmail = "email is required";
    }
    if (!values.userPassword) {
      errors.userPassword = "password is required";
    }
    return errors;
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    setLoginFormError(() => {
      return formValidation(userLoginData);
    });
    const { userEmail, userPassword } = userLoginData;
    if (userEmail && userPassword) {
      dispatch(
        logInFunc({
          userData: userLoginData,
        })
      );
      changeUserLoginData(() => {
        return {
          userEmail: "",
          userPassword: "",
        };
      });
      setSignUpUser(false);
    }
  };

  return (
    <>
      <div className="login-ad d-flex justify-content-end align-items-center">
        <h5>Don't have an account</h5>
        <button
          className="btn btn-success"
          onClick={() => {
            toggleVisibility(true);
          }}
        >
          Sign Up
        </button>
      </div>
      <div className="login-main">
        <h1 className="display-6 fw-normal">Welcome to Food's Restaurant</h1>
        <h2>Log In to Continue</h2>

        <form onSubmit={handleSubmitClick}>
          <div className="login-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="userEmail"
              type="email"
              placeholder="Enter your email"
              value={userLoginData.userEmail}
              onChange={handleInputChange}
            />
            <p className="text-danger fs-5 m-0">{loginFormError.userEmail}</p>
          </div>
          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="userPassword"
              type="password"
              placeholder="Password123"
              value={userLoginData.userPassword}
              onChange={handleInputChange}
            />
            <p className="text-danger fs-5 m-0">
              {loginFormError.userPassword}
            </p>
          </div>

          <input type="submit" value="Log In" className="btn btn-primary" />
        </form>
      </div>
    </>
  );
}

export default LogIn;
