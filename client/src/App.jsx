import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import LoginPage from './pages/Login'
import { useAuth } from './context/authContext'

export default function App() {

  const {user} = useAuth();

  return (
    <Router>
      <Routes>
          <Route path='/' element={user ? <HomePage/> : <LoginPage/>}/>
          <Route path='/about' element={user ? <AboutPage/> : <LoginPage/>}/>
          <Route path='/login' element={user ? <HomePage/> : <LoginPage/>}/>
        </Routes>
    </Router>
  )
}