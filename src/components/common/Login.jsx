import "../../App.css"; // Ensure correct import path for error styling
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    console.log(data);

    try {
      const res = await axios.post("/login", data);
      if (res.status === 200) {
        alert("Login successful");
        navigate("/dashboard"); // Redirect to the dashboard or home page
      }
    } catch (error) {
      alert("Invalid credentials");
      console.error("Login Error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Please enter your email",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" }
            })}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Please enter your password",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
              maxLength: { value: 20, message: "Password must not exceed 20 characters" }
            })}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
};
