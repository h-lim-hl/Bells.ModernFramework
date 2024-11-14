Yes, you can use Yup for validation in a React form without Formik. Yup is a versatile validation library that can be integrated into your own form handling logic, allowing you to manage form state and validation manually or with other libraries. Below, I'll walk you through how to set up Yup with a simple React form using controlled components.

### Step-by-Step Guide to Using Yup Without Formik

1. **Install Yup**

   First, ensure you have Yup installed in your project. If you haven't done so, run:

   ```bash
   npm install yup
   ```

2. **Create Your Form Component**

   Here’s an example of a simple form using Yup for validation without Formik:

   ```jsx
   import React, { useState } from 'react';
   import * as Yup from 'yup';

   // Define the validation schema using Yup
   const validationSchema = Yup.object().shape({
       name: Yup.string()
           .required('Name is required')
           .min(2, 'Name must be at least 2 characters'),
       email: Yup.string()
           .email('Invalid email')
           .required('Email is required'),
       password: Yup.string()
           .required('Password is required')
           .min(6, 'Password must be at least 6 characters'),
   });

   const MyForm = () => {
       // Set initial form state
       const [formValues, setFormValues] = useState({
           name: '',
           email: '',
           password: '',
       });
       const [errors, setErrors] = useState({});

       // Handle input changes
       const handleChange = (e) => {
           const { name, value } = e.target;
           setFormValues({
               ...formValues,
               [name]: value,
           });
       };

       // Validate form values
       const validate = async () => {
           try {
               await validationSchema.validate(formValues, { abortEarly: false });
               setErrors({}); // Clear errors if validation is successful
               return true; // Return true if validation passes
           } catch (err) {
               const validationErrors = {};
               err.inner.forEach((error) => {
                   validationErrors[error.path] = error.message; // Map validation errors
               });
               setErrors(validationErrors);
               return false; // Return false if validation fails
           }
       };

       // Handle form submission
       const handleSubmit = async (e) => {
           e.preventDefault(); // Prevent default form submission behavior
           const isValid = await validate(); // Validate form values

           if (isValid) {
               // Handle successful form submission (e.g., send data to server)
               console.log('Form submitted successfully', formValues);
           }
       };

       return (
           <form onSubmit={handleSubmit}>
               <div>
                   <label htmlFor="name">Name</label>
                   <input
                       type="text"
                       name="name"
                       value={formValues.name}
                       onChange={handleChange}
                   />
                   {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
               </div>
               <div>
                   <label htmlFor="email">Email</label>
                   <input
                       type="email"
                       name="email"
                       value={formValues.email}
                       onChange={handleChange}
                   />
                   {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
               </div>
               <div>
                   <label htmlFor="password">Password</label>
                   <input
                       type="password"
                       name="password"
                       value={formValues.password}
                       onChange={handleChange}
                   />
                   {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
               </div>
               <button type="submit">Submit</button>
           </form>
       );
   };

   export default MyForm;
   ```

### Explanation of the Code

1. **State Management**:
   - We use React's `useState` to manage the form values and validation errors.
   - `formValues` holds the current values of the inputs.
   - `errors` stores any validation errors that occur.

2. **Validation Schema**:
   - We define a Yup validation schema to specify the rules for each field (name, email, and password).

3. **Handle Input Changes**:
   - `handleChange` updates the `formValues` state as the user types in the inputs.

4. **Validate Function**:
   - The `validate` function uses Yup to validate the current form values.
   - If validation fails, it sets the `errors` state with relevant messages.
   - If validation passes, it clears any previous errors.

5. **Handle Form Submission**:
   - `handleSubmit` prevents the default form submission behavior and calls the `validate` function.
   - If the validation is successful, you can handle the form submission (e.g., sending data to an API).

6. **Rendering the Form**:
   - The form inputs are controlled components that reflect the current state.
   - Error messages are displayed conditionally based on the `errors` state.

### Conclusion

Using Yup without Formik gives you flexibility in how you manage form state and validation. This method allows you to have full control over the form's behavior, which can be useful for simpler forms or specific use cases. You can expand this basic setup by adding more fields, custom validation logic, or styles to enhance the user experience.