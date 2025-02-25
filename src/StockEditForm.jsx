import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
// import { useLocation } from "wouter";
import { useFlashMessage } from "./FlashMessageStore";

const SUPPORTED_IMG_FORMATS = ["image/jpeg", "image/png",
  "image/gif", "image/jpg"];
const MAX_FILE_SIZE = 5 * 1048576; // 1048576 = 1024^2

function StockEditForm(prop) {
  const { showMessage } = useFlashMessage();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => { if (prop.imageUrl) setImageUrl(prop.imageUrl); }, []);
  useEffect(() => { }, [imageUrl]);

  const imgFormValationSchema = Yup.object({
    imgSelected:
      Yup.mixed()
        .required("Please select a image file")
        .test("fileSize", `File exceeds allowed size (${MAX_FILE_SIZE} MB)`,
          (value) => {
            return value && value.size <= MAX_FILE_SIZE;
          }
        )
        .test("filetype", "Please select either jpeg, png, gif or jpg",
          (value) => {
            return value && SUPPORTED_IMG_FORMATS.includes(value.type);
          }
        )
  });

  const handleImgUpload = async (values, actions) => {
    const formData = new FormData();
    formData.append("name", "toUpload");
    formData.append("file", values.fileSelect);
    console.log("Upload request started");
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + "/api/product/imgUpload",
        formData, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        }
      );
      showMessage("Image Uploaded", "success");
      setImageUrl(response.data.imageUrl);
      actions.setSubmitting(false);
    } catch (err) {
      console.error(err);
      actions.setErrors({ upload: error.response.data.message });
      actions.setSubmitting(false);
    }
  };

  const productFormValidationSchema = Yup.object({
    imageUrl: Yup.string("Please provide the url to the product image")
      .required("Required"),

    name: Yup.string("Please name the product")
      .required("Required"),

    price: Yup.number("Please provide a selling price")
      .required("Required")
      .positive("Must be a positive number"),

    store: Yup.number("Please provide the amount of product stored")
      .required("Required")
      .positive("Must be a positive number")
      .integer("Must be an integer"),

    reserved: Yup.number("Please provide the amount reserved")
      .required("Required")
      .integer("Must be an integer")
      .max(Yup.ref("store"), "Cannot reserve more than stored amount"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + "/api/product/stock")
      console.log("product update successful", response.data);
      actions.setSubmitting(false);
      showMessage("Product update success", "success");
      setLocation(`/stock`);
    } catch (err) {
      console.error("Product updated failed: ", err);
      actions.setErrors({ submit: error.response.data.message })
      actions.setSubmitting(false);
    }
  };

  return (<>
    <Formik
      initialValues={{
        imageSelect: null
      }}
      validationSchema={imgFormValationSchema}
      onSubmit={handleImgUpload}
    >
      {function (formik) {
        return (
          <Form>
            <div className="md-3">
              <label htmlFor="fileSelect" className="form-label">Image Select</label>
              <input
                id="fileSelect"
                type="file"
                name="fileSelect"
                accept={SUPPORTED_IMG_FORMATS.join(", ")}
                onChange={(event) => { setFieldValue("fileSelect", event.currentTarget.files[0]); }}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Uploading..." : "Upload"}
            </button>
          </Form>
        );
      }}
    </Formik>
    <Formik
      initialValues={{
        imageUrl: imageUrl,
        name: "",
        price: 0,
        store: 0,
        reserved: 0
      }}
      validatationSchema={productFormValidationSchema}
      onSubmit={handleSubmit}
    >
      {function (formik) {
        return (
          <Form>
            <div className="md-3">
              <label htmlFor="imageUrl" className="form-label">Image Url</label>
              <Field type="text" name="imageUrl" id="imageUrl" className="form-contorl" />
              <ErrorMessage name="imageUrl" component="div" className="text-danger" />
            </div>
            <div className="md-3">
              <label htmlFor="name" className="form-label">Product Name</label>
              <Field type="text" name="name" id="name" className="form-contorl" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="md-3">
              <label htmlFor="price" className="form-label">Selling Price</label>
              <Field type="number" name="price" id="price" className="form-contorl" />
              <ErrorMessage name="price" component="div" className="text-danger" />
            </div>
            <div className="md-3">
              <label htmlFor="store" className="form-label">Store Amount</label>
              <Field type="number" name="store" id="store" className="form-contorl" />
              <ErrorMessage name="store" component="div" className="text-danger" />
            </div>
            <div className="md-3">
              <label htmlFor="reserved" className="form-label">Reserved Amount</label>
              <Field type="text" name="reserved" id="reserved" className="form-contorl" />
              <ErrorMessage name="reserved" component="div" className="text-danger" />
            </div>
            {formik.errors.submit && <div className="alert alert-danger">{formik.errors.submit}</div>}

            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Updating Products' : 'Update Product'}
            </button>
          </Form>
        );
      }}
    </Formik>
  </>);
}