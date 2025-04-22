import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import Dashboard from './components/Dashboard'
import HomePage from './components/HomePage'
import StartPage from './components/StartPage'
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/start' element={<StartPage />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/login' element={<LoginForm />}></Route>
      <Route path='/signup' element={<SignUpForm />}></Route>
      <Route path="/settings" element={<Settings />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App