import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRoutes";
import UploadPage from "../pages/posts/upload";
import HomePage from "../pages/home";
import ViewPage from "../pages/posts/view";
import Navbar from "../components/navbar";
import AboutPage from "../pages/about";
import Footer from "../components/footer";
import EditPage from "../pages/posts/edit";

const MainRoutes = () => {

  return (
    <React.Fragment>
      <Navbar />
      {/* <Routes>
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/view/:postId" element={<ViewPage />} />
            <Route path="/edit/:postId" element={<EditPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/view/:postId" element={<ViewPage />} />

        {/* Protected routes */}
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <UploadPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:postId"
          element={
            <PrivateRoute>
              <EditPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </React.Fragment>
  );
};

export default MainRoutes;
