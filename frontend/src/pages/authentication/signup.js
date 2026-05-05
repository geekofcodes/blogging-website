// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { motion } from 'framer-motion';
// import zxcvbn from 'zxcvbn';

// const SignupSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match')
//     .required('Confirm Password is required'),
// });

// const SignUpPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState(0);

//   const handlePasswordChange = (e) => {
//     const password = e.target.value;
//     const result = zxcvbn(password);
//     setPasswordStrength(result.score);
//   };

//   const toggleShowPassword = () => setShowPassword(!showPassword);

//   const strengthMeterColors = ['#FF5A5A', '#FFBD5A', '#FFFF5A', '#9DFF5A', '#00FF5A'];

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm"
//       >
//         <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

//         <Formik
//           initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
//           validationSchema={SignupSchema}
//           onSubmit={(values) => {
//             console.log(values);
//             alert('Signup successful!');
//           }}
//         >
//           {({ values, handleChange }) => (
//             <Form className="space-y-4">
//               {/* Name Field */}
//               <div>
//                 <Field
//                   name="name"
//                   as={TextField}
//                   label="Name"
//                   variant="outlined"
//                   fullWidth
//                   helperText={<ErrorMessage name="name" />}
//                   error={!!<ErrorMessage name="name" />}
//                 />
//               </div>

//               {/* Email Field */}
//               <div>
//                 <Field
//                   name="email"
//                   as={TextField}
//                   label="Email"
//                   variant="outlined"
//                   fullWidth
//                   helperText={<ErrorMessage name="email" />}
//                   error={!!<ErrorMessage name="email" />}
//                 />
//               </div>

//               {/* Password Field */}
//               <div>
//                 <Field
//                   name="password"
//                   as={TextField}
//                   type={showPassword ? 'text' : 'password'}
//                   label="Password"
//                   variant="outlined"
//                   fullWidth
//                   onChange={(e) => {
//                     handleChange(e);
//                     handlePasswordChange(e);
//                   }}
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton onClick={toggleShowPassword} edge="end">
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                   helperText={<ErrorMessage name="password" />}
//                   error={!!<ErrorMessage name="password" />}
//                 />
//               </div>

//               {/* Password Strength Meter */}
//               <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
//                 <div
//                   className="h-2 rounded-full"
//                   style={{
//                     width: `${(passwordStrength + 1) * 20}%`,
//                     backgroundColor: strengthMeterColors[passwordStrength],
//                   }}
//                 />
//               </div>

//               {/* Confirm Password Field */}
//               <div>
//                 <Field
//                   name="confirmPassword"
//                   as={TextField}
//                   type={showPassword ? 'text' : 'password'}
//                   label="Confirm Password"
//                   variant="outlined"
//                   fullWidth
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton onClick={toggleShowPassword} edge="end">
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                   helperText={<ErrorMessage name="confirmPassword" />}
//                   error={!!<ErrorMessage name="confirmPassword" />}
//                 />
//               </div>

//               {/* Submit Button */}
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 className="mt-4"
//               >
//                 Sign Up
//               </Button>
//             </Form>
//           )}
//         </Formik>
//       </motion.div>
//     </div>
//   );
// };

// export default SignUpPage;

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';
import zxcvbn from 'zxcvbn';
import authService from '../../service/authService';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const result = zxcvbn(password);
    setPasswordStrength(result.score);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const strengthMeterColors = ['#FF5A5A', '#FFBD5A', '#FFFF5A', '#9DFF5A', '#00FF5A'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setLoading(true);
            setError(null);
            try {
              const response = await authService.register({username:values.name, password:values.password});
              alert('Signup successful!');
              console.log(response);
            } catch (err) {
              setError(err.message);
            }
            setLoading(false);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form className="space-y-5">
              <Field
                name="name"
                as={TextField}
                label="Full Name"
                variant="outlined"
                fullWidth
                error={!!<ErrorMessage name="name" />}
                helperText={<ErrorMessage name="name" />}
              />

              <Field
                name="email"
                as={TextField}
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                error={!!<ErrorMessage name="email" />}
                helperText={<ErrorMessage name="email" />}
              />

              <Field
                name="password"
                as={TextField}
                type={showPassword ? 'text' : 'password'}
                label="Password"
                variant="outlined"
                fullWidth
                onChange={(e) => {
                  handleChange(e);
                  handlePasswordChange(e);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!<ErrorMessage name="password" />}
                helperText={<ErrorMessage name="password" />}
              />

              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${(passwordStrength + 1) * 20}%`, backgroundColor: strengthMeterColors[passwordStrength] }}
                />
              </div>

              <Field
                name="confirmPassword"
                as={TextField}
                type={showPassword ? 'text' : 'password'}
                label="Confirm Password"
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!<ErrorMessage name="confirmPassword" />}
                helperText={<ErrorMessage name="confirmPassword" />}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting || loading}
                className="mt-4"
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
              </Button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default SignUpPage;