import './fonts.css';
import './App.css';
import Home from './Home.jsx';
import CreateAccount from './CreateAccount.jsx';
import OnboardingList from './OnboardingList.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<OnboardingList />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
