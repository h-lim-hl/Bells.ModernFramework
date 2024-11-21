import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";

import Header from "./Header";

// without formik
function Register() {
  const [formValues, setFormValues] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    salutation: "",
    interests: []
  });

  const [errors, setErrors] = useState({});

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

  const validationSchema = Yup.object({
    fullname: Yup.string()
             .required('Name is required'),

    email: Yup.string()
              .email('Invalid email address')
              .required('Email is required'),
              
    password: Yup.string()
                 .min(8, 'Password must be at least 8 characters')
                 .required('Password is required'),

    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is required'),

    salutation: Yup.string()
                   .required('Salutation is required'),

    country: Yup.string()
                .required('Country is required'),
  });

  const validate = async () => {
    try {
      await validationSchema.validate(formValues, { aboutEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      console.log(err.message);
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleSubmit = async (evt) => {
    console.log("submit");
    evt.preventDefault();
    const isValid = await validate();
    if (isValid) {
      try {
        //const response = await axios.post("/register", formValues);
        //console.log('Form submitted successfully:', response.data);
        console.log('Form submitted successfully:', formValues);
      } catch (error) {
        console.error('Error submitting form:', error.response?.data || error.message);
      }
    }
    console.log("submit end");
  }


  return (<>
    <Header title="Join Us!" subtitle="Enjoy exclusive discounts and benefits!" />
    <div className="container mt-5">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
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
          </div>
          <div className="mb-3s">
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
          <button type="submit" className="btn btn-primary">Register</button>
        </div>
      </form >
    </div >
  </>);
}

export default Register;