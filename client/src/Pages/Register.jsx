import { useState } from "react";
import "../assets/css/form.css";
import { Link, useNavigate } from "react-router-dom";
import { Validation } from "../Components/Validation";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [serverErrors, setServerErrors] = useState([]);
  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = Validation(values);
    setErrors(errs);
    if (errs.name === "" && errs.email === "" && errs.password === "") {
      axios
        .post("http://127.0.0.1:3000/contactmsyt/register", values)
        .then((res) => {
          if (res.data.success) {
            toast.success("Account Created Succesfully", {
              position: "top-right",
              autoClose: 5000,
            });
            navigate("/login");
          }
        })
        .catch((err) => {
          if (err.response.data.errors) {
            setServerErrors(err.response.data.errors);
          } else {
            console.log(err);
          }
        });
    }
  };

  return (
    <div className="form-container" onSubmit={handleSubmit}>
      <form className="form">
        <h2>Create Account</h2>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            className="form-control"
            name="name"
            id="name"
            onChange={handleInput}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control"
            name="email"
            id="email"
            onChange={handleInput}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            placeholder="******"
            className="form-control"
            name="password"
            id="password"
            onChange={handleInput}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        {serverErrors.length > 0 &&
          serverErrors.map((error, index) => (
            <p key={index} className="error">
              {error.msg}
            </p>
          ))}

        <button className="form-btn">Register</button>
        <p>
          Already Have Account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
