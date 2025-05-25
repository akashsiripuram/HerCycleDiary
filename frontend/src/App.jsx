import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Auth/Login/login'
import Register from './pages/Auth/register/register'
import CalendarPage from './pages/Calender/CalenderPage'
import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Profile/Profile'
import PeriodTracker from './pages/PeriodForm/PeriodForm'
import Layout from './components/Layout'
import Home from './pages/Home/Home'
import Periods from './pages/periods/period'
import FoodSuggestions from './pages/FoodSuggestions/FoodSuggestions'
import ChatBot from './pages/ChatBot/ChatBot'
import { useTheme } from './contexts/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  const { theme } = useTheme()
  return (
    <div className={theme}>
    <div div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/tracker" element={<CalendarPage/>} />
        <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path='/periods' element={<ProtectedRoute><Periods/></ProtectedRoute>}/>
        <Route path="/chat" element={<ChatBot />} />
        <Route path="/food-suggestions" element={<ProtectedRoute><FoodSuggestions /></ProtectedRoute>} />
        <Route path='/log-period' element={
          <Layout>
          <PeriodTracker/>
          </Layout>
          }/>



        
      </Routes>

      <ChatBot />
      </div>
      
    </div>
  )
}

export default App
