import "../src/styles/global.css";
import "react-toastify/dist/ReactToastify.css";

import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ProtectedArea from "./components/auth/ProtectedArea";
import ConfirmTrip from "./components/createTrip/ConfirmTrip";
import FooterComponent from "./components/layout/footer";
import HeaderComponent from "./components/layout/header/header";
import AboutPage from "./pages/about/aboutPage";
import ProfilePictureUploadComponent from "./pages/about/profilePicturePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AddCarPage from "./pages/car/CarAddPage";
import AddCarPicturePage from "./pages/car/carPicturePage";
import CreateTripPage from "./pages/createTrip/createTripPage";
import DashboardPage from "./pages/dashboard/dashboardPage";
import AboutUsPage from "./pages/footerPages/aboutUs";
import ContactUsPage from "./pages/footerPages/contactUs";
import FaqPage from "./pages/footerPages/faq";
import HomePage from "./pages/home/homePage";
import ProfilePage from "./pages/profile/profilePage";
import SearchTripPage from "./pages/searchTrip/searchTripPage";
import UserInfoPage from "./pages/userInfo/userInfoPage";

function App() {
  return (
    <div>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="profile"
          element={
            <ProtectedArea>
              <ProfilePage />
            </ProtectedArea>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedArea>
              <DashboardPage />
            </ProtectedArea>
          }
        />
        <Route
          path="create-trip"
          element={
            <ProtectedArea>
              <CreateTripPage />
            </ProtectedArea>
          }
        />
        <Route path="search-trip" element={<SearchTripPage />} />
        <Route path="auth" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contact-us" element={<ContactUsPage />} />
        <Route
          path="user-infos"
          element={
            <ProtectedArea>
              <UserInfoPage />
            </ProtectedArea>
          }
        />
        <Route
          path="user-infos/about"
          element={
            <ProtectedArea>
              <AboutPage />
            </ProtectedArea>
          }
        />
        <Route
          path="user-infos/car"
          element={
            <ProtectedArea>
              <AddCarPage />
            </ProtectedArea>
          }
        />
        <Route
          path="user-infos/car-picture"
          element={
            <ProtectedArea>
              <AddCarPicturePage />
            </ProtectedArea>
          }
        />
        <Route
          path="user-infos/user-picture"
          element={
            <ProtectedArea>
              <ProfilePictureUploadComponent />
            </ProtectedArea>
          }
        />
        <Route path="confirm-trip" element={<ConfirmTrip />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      <ToastContainer />
      <FooterComponent />
    </div>
  );
}
export default App;
