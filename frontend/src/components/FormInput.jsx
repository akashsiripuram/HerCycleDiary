import { useState } from 'react'

function FormInput({ 
  type = 'text', 
  label, 
  value, 
  onChange, 
  placeholder, 
  error,
  required = false,
  autoComplete = 'off',
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  
  const actualType = type === 'password' && showPassword ? 'text' : type
  
  const handleTogglePassword = () => {
    setShowPassword(prev => !prev)
  }
  
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      
      <div className={`relative group ${isFocused ? 'focused' : ''}`}>
        <input
          type={actualType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-200
            ${error 
              ? 'border-error-400 focus:border-error-500'
              : 'border-gray-300 dark:border-gray-600 focus:border-primary-400 dark:focus:border-primary-400'
            }
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-opacity-30
            ${error 
              ? 'focus:ring-error-300 dark:focus:ring-error-500'
              : 'focus:ring-primary-200 dark:focus:ring-primary-600'
            }
            placeholder-gray-400 dark:placeholder-gray-500
          `}
          {...props}
        />
        
        {type === 'password' && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1"
            onClick={handleTogglePassword}
            tabIndex="-1"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-error-500 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  )
}

function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clipRule="evenodd" />
      <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
    </svg>
  )
}

export default FormInput