import { useTheme } from '../contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'

function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Panel - Decorative */}
      <div className="md:w-1/2 bg-gradient-to-br from-primary-200 via-secondary-200 to-accent-100 dark:from-primary-900 dark:via-secondary-900 dark:to-accent-800 p-6 md:p-10 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-primary-300 dark:bg-primary-800 opacity-50"></div>
        <div className="absolute top-1/3 -right-16 w-36 h-36 rounded-full bg-accent-200 dark:bg-accent-800 opacity-70"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full bg-secondary-300 dark:bg-secondary-700 opacity-60"></div>
        
        {/* Floating elements */}
        <div className="relative z-10">
          <div className="w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-300 absolute left-[15%] top-[20%] animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-accent-400 dark:bg-accent-300 absolute left-[85%] top-[15%] animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="w-2 h-2 rounded-full bg-secondary-500 dark:bg-secondary-300 absolute left-[40%] top-[70%] animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        <div className="relative z-10 mt-4 md:mt-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-3">
            HerCycleDiary
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-md">
            Your personal journey companion for tracking your cycle with care and accuracy.
          </p>
        </div>
        
        <div className="hidden md:block relative z-10 text-sm text-gray-600 dark:text-gray-400 mt-auto">
          © 2025 HerCycleDiary. All rights reserved.
        </div>
      </div>
      
      {/* Right Panel - Form */}
      <div className="md:w-1/2 bg-white dark:bg-gray-900 p-6 md:p-8 lg:p-12 flex flex-col relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        <div className="w-full max-w-md mx-auto mt-6 md:mt-0 md:my-auto">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
          
          {children}
        </div>
        
        <div className="md:hidden text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
          © 2025 HerCycleDiary. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default AuthLayout