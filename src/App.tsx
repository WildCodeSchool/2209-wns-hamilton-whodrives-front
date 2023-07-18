import { Route, Routes } from "react-router-dom";
import FooterComponent from "./components/layout/footer";
import HeaderComponent from "./components/layout/header/header";
import LoginPage from "./pages/auth/LoginPage";
import CreateTripPage from "./pages/createTrip/createTripPage";
import AboutUsPage from "./pages/footerPages/aboutUs";
import ContactUsPage from "./pages/footerPages/contactUs";
import FaqPage from "./pages/footerPages/faq";
import HomePage from "./pages/home/homePage";
import ProfilePage from "./pages/profile/profilePage";
import RegisterPage from "./pages/auth/RegisterPage";
import ConfirmTrip from "./components/createTrip/ConfirmTrip";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/styles/global.css";
import Dashboard from "./pages/dashboard/dashboard";
import ProtectedArea from "./components/auth/ProtectedArea";
import AboutPage from "./pages/about/aboutPage";
import UserInfo from "./pages/userInfo/userInfoPage";
import CarAddPage from "./pages/car/CarAddPage";
import CarPicturePage from "./pages/car/carPicturePage";
import SearchTripPage from "./pages/searchTrip/SearchTripPage";

function App() {
  return (
    <div>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="dashboard" element={<Dashboard />} />
        {/* <Route
          path="create-trip"
          element={
            <ProtectedArea>
              <CreateTripPage />
            </ProtectedArea>
          }
        /> */}
        <Route path="create-trip" element={<CreateTripPage />} />
        <Route path="search-trip" element={<SearchTripPage />} />
        <Route path="auth" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contact-us" element={<ContactUsPage />} />
        <Route
          path="userInfo"
          element={
            <ProtectedArea>
              <UserInfo />
            </ProtectedArea>
          }
        />
        <Route
          path="userInfo/about"
          element={
            <ProtectedArea>
              <AboutPage />
            </ProtectedArea>
          }
        />
        <Route
          path="/userInfo/Car"
          element={
            <ProtectedArea>
              <CarAddPage />
            </ProtectedArea>
          }
        />
        <Route
          path="/userInfo/AddPictureCar"
          element={
            <ProtectedArea>
              <CarPicturePage />
            </ProtectedArea>
          }
        />
        <Route path="*" element={<h1>404</h1>} />
        <Route path="confirm-trip" element={<ConfirmTrip />} />
      </Routes>
      <ToastContainer />
      <FooterComponent />
    </div>
  );
}
export default App;
