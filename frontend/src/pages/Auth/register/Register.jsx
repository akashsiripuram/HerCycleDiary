// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// function Register() {
//     const [username,setUsername]=useState("");
//     const [email,setEmail]=useState("");
//     const [password,setPassword]=useState("");
//     const [confirmPassword,setConfirmPassword]=useState("");
//     const [error,setError]=useState("");
//     const [,setLoading]=useState(false);
//     const navigate=useNavigate();
//     const handleSubmit=async (e)=>{
//         e.preventDefault();
//         setLoading(true);
//         setError("");
//         if(password!==confirmPassword){
//             setError("Passwords do not match");
//             setLoading(false);
//             return;
//         }
//         try{
//             const response=await axios.post("/api/auth/register",{username,email,password});
//             if(response.data.success){
//                 toast.success("Registration successful");
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
//             <h1>Register</h1>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" value={username} onChange={(e)=>{
//                     setUsername(e.target.value)
//                 }} placeholder="Username" required />
//                 <input type="email" value={email} onChange={(e)=>{
//                     setEmail(e.target.value)
//                 }} placeholder="Email" required />
//                 <input type="password" value={password} onChange={(e)=>{
//                     setPassword(e.target.value)
//                 }} placeholder="Password" required />
//                 <input type="password" value={confirmPassword} onChange={(e)=>{
//                     setConfirmPassword(e.target.value)
//                 }} placeholder="Confirm Password" required />
//                 <button  type="submit">Register</button>
//                 {error && <p style={{color:"red"}}>{error}</p>}
//                 <p>By registering, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.</p>
//                 <p>Already have an account? <a href="/login">Login</a></p>


                
//             </form>
//             <p>Already have an account? <a href="/login">Login</a></p>
//         </div>
//      );
// }

// export default Register;


import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import AuthLayout from '../../../components/AuthLayout'
import FormInput from '../../../components/FormInput'
import axios from 'axios'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      // In a real app, this would be your API endpoint
      const response=await axios.post("http://localhost:5000/api/auth/register",formData);
            if(response.data.success){
                toast.success("Registration successful");
                localStorage.setItem("token",response.data.token);
                navigate("/");
            }else{
            
                toast.error(response.data.message);
            }
      navigate('/login')
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({ general: 'Failed to register. Please try again.' })
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <AuthLayout 
      title="Create an Account" 
      subtitle="Join us to start tracking your cycle"
    >
      <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
        {errors.general && (
          <div className="p-3 bg-error-50 dark:bg-error-900/30 border border-error-200 dark:border-error-800 rounded-lg text-error-700 dark:text-error-300 text-sm mb-4">
            {errors.general}
          </div>
        )}
        
        <FormInput
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Choose a username"
          error={errors.username}
          required
          autoComplete="username"
        />
        
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          error={errors.email}
          required
          autoComplete="email"
        />
        
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          error={errors.password}
          required
          autoComplete="new-password"
        />
        
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          required
          autoComplete="new-password"
        />
        
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
              Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>
        
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <Link 
            to="/login"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default Register