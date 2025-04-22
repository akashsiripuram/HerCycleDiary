import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Auth/Login/login'
import Register from './pages/Auth/register/register'
import CalendarPage from './pages/Calender/CalenderPage'
import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Profile/Profile'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/tracker" element={<CalendarPage/>} />
        <Route path='/profile' element={<Profile/>}/>



        
      </Routes>


      
    </>
  )
}

export default App
