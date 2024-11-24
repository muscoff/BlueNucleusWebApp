import './fonts.css';
import './App.css';
import Home from './Home.jsx';
import CreateAccount from './CreateAccount.jsx';
import OnboardingList from './OnboardingList.jsx';
import EmployeeDashboard from './EmployeeDashboard.jsx';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({

  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <header>
            <Link to="/">Home</Link>
          </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/onboarding" element={<OnboardingList />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/dashboard" element={<EmployeeDashboard />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
}

export default App
