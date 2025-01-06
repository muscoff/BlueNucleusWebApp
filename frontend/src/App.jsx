import './fonts.css';
import './App.css';
import Home from './Home.jsx';
import CreateAccountWrapper from './CreateAccountWrapper.jsx';
import SignIn from './SignIn.jsx'
import OnboardingList from './OnboardingList.jsx';
import EmployeeDashboard from './EmployeeDashboard.jsx';
import Wiki from './Wiki.jsx'
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
            <Route path="/create-account" element={<CreateAccountWrapper />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/wiki" element={<Wiki />} />

            <Route path="/dashboard" element={<EmployeeDashboard />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
}

export default App
