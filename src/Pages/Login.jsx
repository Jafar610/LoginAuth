import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
      const [values, setValues] = useState({
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
        axios.post("http://localhost:3000/login", values).then((res) => {
          console.log(res);
        });
        navigate("/");
      };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input type="email" placeholder="email" name="email" onChange={changeHandler} />
        <br />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="password" name="password" onChange={changeHandler} />
        <br />

        <button>Login</button>
      </form>

      <p>
        I don't have an account <a href="">Register</a>{" "}
      </p>
    </div>
  );
}

export default Login;
