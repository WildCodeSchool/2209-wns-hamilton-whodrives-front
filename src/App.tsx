import "react-toastify/dist/ReactToastify.css";

import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ProtectedArea from "./components/auth/ProtectedArea";
import ConfirmTrip from "./components/createTrip/ConfirmTrip";
import FooterComponent from "./components/layout/footer";
import HeaderComponent from "./components/layout/header/header";
<<<<<<< HEAD
import LoginPage from "./pages/auth/LoginPage";
=======
import AuthPage from "./pages/auth/AuthPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
>>>>>>> e7e67ebe36c67f825c75709af203851e81cefbf1
import CreateTripPage from "./pages/createTrip/createTripPage";
import Dashboard from "./pages/dashboard/dashboard";
import AboutUsPage from "./pages/footerPages/aboutUs";
import ContactUsPage from "./pages/footerPages/contactUs";
import FaqPage from "./pages/footerPages/faq";
import HomePage from "./pages/home/homePage";
import ProfilePage from "./pages/profile/profilePage";
<<<<<<< HEAD
import SearchTripPage from "./pages/searchTrip/searchTripPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ConfirmTrip from "./components/createTrip/ConfirmTrip";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/styles/global.css";
import Dashboard from "./pages/dashboard/dashboard";
import ProtectedArea from "./components/auth/ProtectedArea";
=======
import SearchTripPage from "./pages/searchTrip/SearchTripPage";
>>>>>>> e7e67ebe36c67f825c75709af203851e81cefbf1

function App() {
  return (
    <div className="min-h-screen">
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="dashboard" element={<Dashboard />} />
<<<<<<< HEAD
        {/* <Route
=======
        <Route
>>>>>>> e7e67ebe36c67f825c75709af203851e81cefbf1
          path="create-trip"
          element={
            <ProtectedArea>
              <CreateTripPage />
            </ProtectedArea>
          }
<<<<<<< HEAD
        /> */}
        <Route path="create-trip" element={<CreateTripPage />} />
=======
        />
>>>>>>> e7e67ebe36c67f825c75709af203851e81cefbf1
        <Route path="search-trip" element={<SearchTripPage />} />
        <Route path="auth" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contact-us" element={<ContactUsPage />} />
        <Route path="confirm-trip" element={<ConfirmTrip />} />
      </Routes>
      <ToastContainer />
      <FooterComponent />
    </div>
  );
}

export default App;
