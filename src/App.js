import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './auth/page/LoginPage';
import SignupPage from './auth/page/SignupPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
