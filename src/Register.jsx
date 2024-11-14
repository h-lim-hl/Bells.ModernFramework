import React from "react";
import Header from "./Header";

// without formik
function Register() {
  // Name
  // Email
  // Contact No.
  // Referer
  // How they know of this site
  return (<>
  <Header title="Join Us!" subtitle="Enjoy exclusive discounts and benefits!"/>
  <div className="container mt-5">
    <h1>Register</h1>
    <form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="confirmPassword" />
      </div>
      <div className="mb-3">
        <label className="form-label">Saluation</label>
        <div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="salutation" id="mr" value="Mr" />
            <label className="form-check-label" htmlFor="mr">Mr</label>
          </div>
          <div className="form-check form-checl-inline">
            <input className="form-check-input" type="radio" name="salutation" id="ms" value="Ms" />
            <label className="form-check-label" htmlFor="ms">Ms</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="salutation" id="mrs" value="Mrs" />
            <label className="form-check-label" htmlFor="mrs">Mrs</label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country</label>
          <select className="form-select" id="country">
            <option value="">Select Country</option>
            <option value="sg">Singapore</option>
            <option value="my">Malaysia</option>
            <option value="in">Indonesia</option>
            <option value="th">Thailand</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </div>
    </form>
  </div>
  </>);
}

export default Register;