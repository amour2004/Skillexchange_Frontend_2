import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../App.css";


export const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    console.log(data);
    data.roleId = "67bd39d90d07b9633d60535d";

    try {
      const res = await axios.post("/user", data);
      if (res.status === 201) {
        alert("User created successfully");
        navigate("/login");
      }
    } catch (error) {
      alert("User not created");
      console.error("Signup Error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>First Name</label>
          <input 
            type="text" 
            {...register("firstName", { 
              required: "Please enter the first name", 
              minLength: { value: 1, message: "Minimum length is 1" },
              maxLength: { value: 20, message: "Maximum length is 20" }
            })} 
          />
          {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
        </div>

        <div>
          <label>Last Name</label>
          <input 
            type="text" 
            {...register("lastName", { 
              required: "Please enter the last name", 
              minLength: { value: 1, message: "Minimum length is 1" },
              maxLength: { value: 20, message: "Maximum length is 20" }
            })} 
          />
          {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <input 
            type="email" 
            {...register("email", { 
              required: "Please enter an email", 
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
              required: "Please enter a password", 
              minLength: { value: 6, message: "Password must be at least 6 characters" },
              maxLength: { value: 20, message: "Password must not exceed 20 characters" }
            })} 
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <div>
          <label>Age</label>
          <input 
            type="number" 
            {...register("age", { 
              required: "Please enter your age", 
              min: { value: 10, message: "Minimum age is 10" },
              max: { value: 100, message: "Maximum age is 100" }
            })} 
          />
          {errors.age && <p className="error-message">{errors.age.message}</p>}
        </div>

        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};
