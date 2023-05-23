import { Route, Routes } from "react-router-dom";
import FooterComponent from "./components/layout/footer";
import HeaderComponent from "./components/layout/header/header";
import AuthPage from "./pages/auth/AuthPage";
import CreateTripPage from "./pages/createTrip/createTripPage";
import AboutUsPage from "./pages/footerPages/aboutUs";
import ContactUsPage from "./pages/footerPages/contactUs";
import FaqPage from "./pages/footerPages/faq";
import HomePage from "./pages/home/homePage";
import ProfilePage from "./pages/profile/profilePage";
import SearchTripPage from "./pages/searchTrip/searchTripPage";

function App() {
  return (
    <div className="w-screen h-screen">
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="create-trip" element={<CreateTripPage />} />
        <Route path="search-trip" element={<SearchTripPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contact-us" element={<ContactUsPage />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
