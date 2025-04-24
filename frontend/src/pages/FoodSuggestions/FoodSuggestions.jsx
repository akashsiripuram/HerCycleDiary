import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import ThemeToggle from '../../components/ThemeToggle'

function FoodSuggestions() {
  const [periodInfo, setPeriodInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const getUser = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/auth/get-user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      setUser(response.data.user);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const foodSuggestions = {
    mild: [
      { name: 'Chamomile Tea', benefits: 'Natural relaxant, helps reduce cramps', emoji: '🫖' },
      { name: 'Bananas', benefits: 'Rich in potassium, helps reduce bloating', emoji: '🍌' },
      { name: 'Dark Chocolate', benefits: 'Contains magnesium, improves mood', emoji: '🍫' },
      { name: 'Yogurt', benefits: 'Probiotics support gut health', emoji: '🥛' }
    ],
    moderate: [
      { name: 'Ginger Tea', benefits: 'Anti-inflammatory, reduces pain', emoji: '🫖' },
      { name: 'Spinach', benefits: 'Iron-rich, helps with blood loss', emoji: '🥬' },
      { name: 'Salmon', benefits: 'Omega-3s reduce inflammation', emoji: '🐟' },
      { name: 'Oats', benefits: 'Fiber helps regulate hormones', emoji: '🥣' }
    ],
    severe: [
      { name: 'Turmeric Milk', benefits: 'Powerful anti-inflammatory', emoji: '🥛' },
      { name: 'Leafy Greens', benefits: 'Rich in iron and minerals', emoji: '🥬' },
      { name: 'Avocados', benefits: 'Healthy fats reduce inflammation', emoji: '🥑' },
      { name: 'Pumpkin Seeds', benefits: 'Zinc supports immune function', emoji: '🎃' }
    ]
  }

  const remedies = [
    { name: 'Warm Compress', description: 'Apply to lower abdomen', emoji: '🌡️' },
    { name: 'Light Exercise', description: 'Gentle yoga or walking', emoji: '🧘‍♀️' },
    { name: 'Stay Hydrated', description: 'Drink plenty of water', emoji: '💧' },
    { name: 'Rest Well', description: 'Get adequate sleep', emoji: '😴' }
  ]

  useEffect(() => {
    const fetchPeriodInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/period', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (response.data.success) {
            
          setPeriodInfo(response.data)
        } else {
          setError('Failed to fetch period information')
          toast.error('Failed to fetch period information')
        }
      } catch (error) {
        console.error('Error fetching period data:', error)
        setError('Something went wrong')
        toast.error('Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchPeriodInfo()
  }, [])

  const getCrampLevelSuggestions = (crampLevel) => {
    if (!crampLevel) return foodSuggestions.mild
    if (crampLevel === 'severe') return foodSuggestions.severe
    if (crampLevel === 'moderate') return foodSuggestions.moderate
    return foodSuggestions.mild
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-2xl font-bold text-primary-600 dark:text-primary-400"
          >
            HerCycleDiary
          </button>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => navigate('/profile')}
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 transition-colors"
            >
              Profile
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="bg-error-50 dark:bg-error-900/30 border border-error-200 dark:border-error-800 rounded-lg p-4 text-error-700 dark:text-error-300">
            {error}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Period Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Food & Relief Suggestions
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
                  <h3 className="font-medium text-primary-900 dark:text-primary-100">Next Period</h3>
                  <p className="text-lg text-primary-700 dark:text-primary-300">
                    {user.daysUntilNextPeriod!==null ?`${user.daysUntilNextPeriod} days` : 'Not available'}
                  </p>
                </div>
                <div className="bg-secondary-50 dark:bg-secondary-900/20 rounded-lg p-4">
                  <h3 className="font-medium text-secondary-900 dark:text-secondary-100">Days Until Next</h3>
                  <p className="text-lg text-secondary-700 dark:text-secondary-300">
                  {user.daysUntilNextPeriod!==null ?`${user.daysUntilNextPeriod} days` : 'Not available'}
                  </p>
                </div>
                
                <div className="bg-success-50 dark:bg-success-900/20 rounded-lg p-4">
                  <h3 className="font-medium text-success-900 dark:text-success-100">Cramp Level</h3>
                  <p className="text-lg text-success-700 dark:text-success-300">
                    {periodInfo?.periods[0].crampLevel || 'None'}
                  </p>
                </div>
              </div>
            </div>

            {/* Food Suggestions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Recommended Foods
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {getCrampLevelSuggestions(periodInfo?.crampLevel).map((food, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl mb-2">{food.emoji}</div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {food.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {food.benefits}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Natural Remedies */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Natural Remedies
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {remedies.map((remedy, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl mb-2">{remedy.emoji}</div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {remedy.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {remedy.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default FoodSuggestions