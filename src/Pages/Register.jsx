import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/register", values).then((res) => {
      console.log(res);
    });
    navigate("/login");
  };
  return (
    <>
      <div>
        <form onSubmit={submitHandler}>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            placeholder="username"
            name="name"
            onChange={changeHandler}
          />
          <br />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={changeHandler}
          />
          <br />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={changeHandler}
          />
          <br />

          <button>Register</button>
        </form>

        <p>
          I have an account <a href="">Login</a>{" "}
        </p>
      </div>
    </>
  );
}

export default Register;
