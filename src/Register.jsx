import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useLocation  } from "wouter";

import { useFlashMessage } from "./FlashMessageStore";
import Header from "./Header";

// without formik
function Register() {
  const { showMessage, clearMessage, getMessage } = useFlashMessage();

  const [location, setLocation] = useLocation();

  const [formValues, setFormValues] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    salutation: "",
    interests: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);


  const handleChange = (evt) => {
    const { name, value } = evt.target;
    if (typeof formValues[name] === typeof []) {
      let clone = [];
      if (!formValues[name].includes(value)) {
        clone = [...formValues.interests, value];
      } else {
        const indexToRemove =
          formValues.interests.indexOf(value);
        clone = [...formValues.interests.slice(0, indexToRemove),
        ...formValues.interests.slice(indexToRemove + 1)];
      }
      setFormValues({
        ...formValues,
        [name]: clone
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value
      });
    }
  };

  const passwordMinLength = 8;
  const errorMessages = {
    fullname: "Name is required",
    emailInvalid: "Email is invalid",
    email: "Email is required",
    passwordShort: `Password needs to be at least ` +
      `${passwordMinLength} Characters`,
    password: "Password is Required",
    confirmPasswordMatch: "Passwords must match",
    confirmPassword: "Confirm Password is required",
    salutation: "Salutation is required",
    country: "Country is required"
  }

  const validationSchema = Yup.object({
    fullname: Yup.string()
      .required(errorMessages.fullname),

    email: Yup.string()
      .email(errorMessages.emailInvalid)
      .required(errorMessages.email),

    password: Yup.string()
      .min(passwordMinLength, errorMessages.passwordShort)
      .required(errorMessages.password),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], errorMessages.confirmPasswordMatch)
      .required(errorMessages.confirmPassword),

    salutation: Yup.string()
      .required(errorMessages.salutation),

    country: Yup.string()
      .required(errorMessages.country),
  });

  const validate = async () => {
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      // console.log(err.name);
      console.log(err.errors);
      // console.log(err.path);
      // console.log(err.inner);
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleSubmit = async (evt) => {
    console.log("submitting");
    evt.preventDefault();
    setSubmitting(true);
    const isValid = await validate();
    if (isValid) {
      try {
        //const response = await axios.post("/register", formValues);
        //console.log('Form submitted successfully:', response.data);
        setTimeout(() => {
          showMessage("Registration successfull", "success");
          console.log('Form submitted successfully:', formValues);
          setLocation("/");
        }, 1000);
      } catch (error) {
        showMessage(`Error while registering: ${error.response?.data || error.message}`, "danger")
        // console.error('Error submitting form:', error.response?.data || error.message);
      } finally {
        setSubmitting(false);
        console.log("submit end");
      }
    }
  }


  return (<>
    <Header title="Join Us!" subtitle="Enjoy exclusive discounts and benefits!" />
    <div className="container mt-5">
      <h1>Register</h1>
      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="fullname"
            id="fullname"
            placeholder="Please enter your fullname."
            value={formValues.fullname}
            onChange={handleChange} />
          {errors.fullname && <div className="text-danger">{errors.fullname}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            placeholder="youremail@domin.com"
            value={formValues.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleChange}
          />
          {errors.password && <div className="text-danger">{errors.password}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            id="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Saluation</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="salutation"
                id="mr"
                value="Mr"
                onChange={handleChange}
                checked={formValues.salutation === "Mr"}
              />
              <label className="form-check-label" htmlFor="mr">Mr</label>
            </div>
            <div className="form-check form-checl-inline">
              <input
                className="form-check-input"
                type="radio"
                name="salutation"
                id="ms"
                value="Ms"
                onChange={handleChange}
                checked={formValues.salutation === "Ms"}
              />
              <label className="form-check-label" htmlFor="ms">Ms</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="salutation"
                id="mrs"
                value="Mrs"
                onChange={handleChange}
                checked={formValues.salutation === "Mrs"}
              />
              <label className="form-check-label" htmlFor="mrs">Mrs</label>
            </div>
            {errors.salutation && <div className="text-danger">{errors.salutation}</div>}
          </div>

        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country</label>
          <select
            className="form-select"
            id="country"
            name="country"
            value={formValues.country}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="sg">Singapore</option>
            <option value="my">Malaysia</option>
            <option value="in">Indonesia</option>
            <option value="th">Thailand</option>
          </select>
          {errors.country && <div className="text-danger">{errors.country}</div>}

        </div>
        <div className="mb-3">
          <label className="form-label">Interests (choose more than one)</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="interests"
              value="netflix"
              id="interests-netflix"
              onChange={handleChange}
              checked={formValues.interests.includes("netflix")}
            />
            <label
              className="form-check-label"
              htmlFor="interests-netflix"
            >Netflix and Chill</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="interests"
              value="sleeping"
              id="interests-sleeping"
              onChange={handleChange}
              checked={formValues.interests.includes("sleeping")}
            />
            <label
              className="form-check-label"
              htmlFor="interests-sleeping"
            >Sleeping</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="interests"
              value="cycling"
              id="interests-cycling"
              onChange={handleChange}
              checked={formValues.interests.includes("cycling")}
            />
            <label
              className="form-check-label"
              htmlFor="interests-cycling"
            >Cycling</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="interests"
              value="others"
              id="interests-others"
              onChange={handleChange}
              checked={formValues.interests.includes("others")}
            />
            <label
              className="form-check-label"
              htmlFor="interests-others"
            >Others</label>
          </div>
        </div>
        <button type="submit" className={"btn btn-primary " + (isSubmitting ? "d-none" : "")} disabled={isSubmitting}>Register</button>
        <div className={"spinner-border text-primary " + (isSubmitting ? "" : "d-none")} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </form >
    </div >
  </>);
}

export default Register;