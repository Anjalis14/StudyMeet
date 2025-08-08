import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/authContext';
import Videomeet from './pages/videoMeet';
function App() {
  return (
    <>
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/:url" element={<Videomeet/>} />
      </Routes>
      </AuthProvider>
    </Router>
    </>
  );
}

export default App;
