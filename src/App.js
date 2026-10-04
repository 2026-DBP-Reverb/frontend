import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './auth/page/LoginPage';
import SignupPage from './auth/page/SignupPage';
import HomePage from './home/page/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
