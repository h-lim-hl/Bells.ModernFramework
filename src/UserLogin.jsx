import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useLocation } from "wouter";
import { useFlashMessage } from "./FlashMessageStore";
import { useJwt } from "./UserStore";

function UserLogin() {
  const [, setLocation] = useLocation();
  const { showMessage } = useFlashMessage();
  const { setJwt } = useJwt();

  const initialValues = {
    email: "",
    password: ""
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required")
  });

  const handleSubmit = async (val, act) => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL +
        "/api/users/login");
      console.log("login successful", response.data);
      setJwt(response.data.token);
      act.setSubmitting(false);
      showMessage("Login successful!", "success");
      setLocation("/");
    } catch (err) {
      console.error("Login error: ", err);
      act.setErrors({ submit: err.response.data.message });
      act.setSubmitting(false);
    }
  };

  return (<>
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {function (formik) {
          return (<>
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="email" id="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type="password" id="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              {formik.error.submit && <div className="alert alert-danger">{formik.errors.submit}</div>}

              <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Loggin in..." : "login"}
              </button>

            </Form>
          </>)
        }}
      </Formik>

    </div>
  </>)
}

export default UserLogin;