import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import { authService } from "../../service/authService";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);

  const handleLogin = (values, { setSubmitting }) => {
    authService.login(values)
      .then((response) => {
        authLogin(response); // Save token in context and localStorage
        navigate("/"); // Redirect to homepage
      })
      .catch((error) => console.error("Error handling login:", error))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <Field
                name="username"
                as={TextField}
                label="Username"
                variant="outlined"
                fullWidth
                helperText={<ErrorMessage name="username" />}
                error={!!<ErrorMessage name="username" />}
              />
              <Field
                name="password"
                as={TextField}
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                helperText={<ErrorMessage name="password" />}
                error={!!<ErrorMessage name="password" />}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default LoginPage;
