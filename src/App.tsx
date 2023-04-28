import { Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/layout/header/Header";
import AuthPage from "./pages/auth/AuthPage";
import CreateTripPage from "./pages/createTrip/createTripPage";
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
      </Routes>
    </div>
  );
}

export default App;
