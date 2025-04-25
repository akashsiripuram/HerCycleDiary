// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// function Login() {
//     const [username,setUsername]=useState("");
//     const [password,setPassword]=useState("");
//     const [error,setError]=useState("");
//     const [loading,setLoading]=useState(false);
//     const navigate=useNavigate();
//     const handleSubmit=async (e)=>{
//         e.preventDefault();
//         setLoading(true);
//         setError("");
//         try{
//             const response=await axios.post("/api/auth/login",{username,password});
//             if(response.data.success){
//                 toast.success("Login successful");
                
//                 localStorage.setItem("token",response.data.token);
//                 navigate("/");
                
//             }else{
//                 setError(response.data.message);
//                 toast.error(response.data.message);

//             }
//         }catch(e){
//             setError(e.message);
//             toast.error("Something went wrong");
//         }
//         setLoading(false);
//     }
//     return ( 
//         <div>
//             <h1>Login</h1>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" value={username} onChange={(e)=>{
//                     setUsername(e.target.value)
//                 }} />
//                 <input type="password" value={password} onChange={(e)=>{
//                     setPassword(e.target.value)
//                 }} />
//                 <button type="submit"  disabled={loading}>
//                     {loading?"Logging in...":"Login"}
//                 </button>
//                 {error && <p style={{color:"red"}}>{error}</p>}
//             </form>
//             <p>Don't have an account? <a href="/register">Register</a></p>
//         </div>
//      );
// }

// export default Login;

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import FormInput from '../../../components/FormInput'
import AuthLayout from '../../../components/AuthLayout'

function Login() {
  if(localStorage.getItem("token")&&localStorage.getItem("token")!=="undefined"){
    window.location.href="/dashboard"
  }
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  
  const navigate = useNavigate()
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!username.trim()) {
      newErrors.username = 'Username is required'
    }
    
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
        console.log(username,password);
      // In a real app, this would be your API endpoint
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password })
      
      if (response.data.success) {
        toast.success('Login successful')
        
        // Store token in localStorage
        localStorage.setItem('token', response.data.token)
        
        // If remember me is checked, store credentials (not recommended for production)
        if (rememberMe) {
          localStorage.setItem('rememberedUser', username)
        } else {
          localStorage.removeItem('rememberedUser')
        }
        
        // Redirect to dashboard
        navigate('/dashboard')
      } else {
        setErrors({ general: response.data.message })
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error('Login error:', error)
      
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your account to continue your journey"
    >
      <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
        {errors.general && (
          <div className="p-3 bg-error-50 dark:bg-error-900/30 border border-error-200 dark:border-error-800 rounded-lg text-error-700 dark:text-error-300 text-sm mb-4">
            {errors.general}
          </div>
        )}
        
        <FormInput
          label="Username or Email"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username or email"
          error={errors.username}
          required
          autoComplete="username"
        />
        
        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          error={errors.password}
          required
          autoComplete="current-password"
        />
        
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="w-4 h-4 text-primary-500 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
          </label>
          
          <Link 
            to="/forgot-password"
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white py-2.5 px-4 rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-800 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
        
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link 
            to="/register"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
          >
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default Login