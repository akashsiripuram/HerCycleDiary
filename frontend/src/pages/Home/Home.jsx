import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import ThemeToggle from '../../components/ThemeToggle'

function Home() {
  const navigate = useNavigate()
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            HerCycleDiary
          </h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Track Your Cycle, <br />
                <span className="text-primary-600 dark:text-primary-400">
                  Embrace Your Rhythm
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                HerCycleDiary is your personal companion for tracking menstrual cycles, 
                understanding your body's patterns, and maintaining optimal health. 
                Get personalized insights, track symptoms, and take control of your 
                well-being.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate('/register')}
                  className="px-6 py-3 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-lg transition-colors text-lg font-medium"
                >
                  Get Started
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors text-lg font-medium border border-gray-200 dark:border-gray-700"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3807332/pexels-photo-3807332.jpeg"
                alt="Woman practicing yoga"
                className="rounded-2xl shadow-xl w-full object-cover"
                style={{ height: '500px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-2xl" />
            </div>
          </div>

          {/* Features */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Smart Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Easily track your cycles, symptoms, and moods with our intuitive interface.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Personalized Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get customized predictions and health recommendations based on your data.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Smart Reminders
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Never miss important dates with customizable notifications and alerts.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home