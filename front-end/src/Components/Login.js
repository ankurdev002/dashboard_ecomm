import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Enter Valid Email")
      .required("Please Enter Email")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        { message: "Enter Valid Email", excludeEmptyString: true }
      ),
    password: yup.string().required(),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // eslint-disable-next-line
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (info) => {
    setData(JSON.stringify(info));
    reset(); // Clear the form fields
    let result = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("Please Enter Correct Details");
    }
  };
    // console.log(data,'login');

  return (
    <div className="sign-up-form-container">
      <div className="form-card-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-signup-container">
            <input
              type="email"
              className="input-signup"
              {...register("email")}
              placeholder="Enter Email"
            />
            <p>{errors.email?.message}</p>
          </div>
          <div className="input-signup-container">
            <input
              type="password"
              className="input-signup"
              {...register("password")}
              placeholder="Enter Password"
            />
            <p>{errors.password?.message}</p>
          </div>

          <input className="btn-login" type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;
