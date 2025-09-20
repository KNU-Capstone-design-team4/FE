import{ BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginIntroPage from "./components/Login진입화면";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

function App() {
  return (
    <Router>
     <Routes>
      <Route path="/" element={<LoginIntroPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;