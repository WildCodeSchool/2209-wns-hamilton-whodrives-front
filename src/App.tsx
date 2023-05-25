import { Route, Routes } from "react-router-dom";
import FooterComponent from "./components/layout/footer";
import HeaderComponent from "./components/layout/header/header";
import LoginPage from "./pages/auth/LoginPage";
import AuthPage from "./pages/auth/AuthPage";
import CreateTripPage from "./pages/createTrip/createTripPage";
import AboutUsPage from "./pages/footerPages/aboutUs";
import ContactUsPage from "./pages/footerPages/contactUs";
import FaqPage from "./pages/footerPages/faq";
import HomePage from "./pages/home/homePage";
import ProfilePage from "./pages/profile/profilePage";
import SearchTripPage from "./pages/searchTrip/searchTripPage";
import RegisterForm from "./pages/auth/RegisterPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="w-screen h-screen">
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="create-trip" element={<CreateTripPage />} />
        <Route path="search-trip" element={<SearchTripPage />} />
        <Route path="auth" element={<LoginPage />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="my-account" element={<AuthPage />} />
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contact-us" element={<ContactUsPage />} />
      </Routes>
      <ToastContainer />
      <FooterComponent />
    </div>
  );
}

export default App;
