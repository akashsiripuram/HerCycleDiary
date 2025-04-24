import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import ThemeToggle from '../../components/ThemeToggle'

function Periods() {
  const [periods, setPeriods] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [newPeriod, setNewPeriod] = useState({
    startDate: '',
    endDate: '',
    crampLevel: 'mild',
    notes: ''
  })
  
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchPeriods()
  }, [])
  
  const fetchPeriods = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:5000/api/period", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(response.data.periods)

      if (response.data.success) {
        setPeriods(response.data.periods)
        console.log(periods.length)
      } else {
        setError(response.data.message)
        toast.error(response.data.message)
      }
    } catch (e) {
      setError(e.message)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }
  

  const handleAddPeriod = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("/api/period", newPeriod, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      if (response.data.success) {
        toast.success("Period added successfully")
        setShowAddModal(false)
        fetchPeriods()
        setNewPeriod({
          startDate: '',
          endDate: '',
          crampLevel: 'mild',
          notes: ''
        })
      }
    } catch (error) {
      toast.error("Failed to add period")
    }
  }

  const getCrampLevelColor = (level) => {
    const colors = {
      mild: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-300',
      moderate: 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-300',
      severe: 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-300'
    }
    return colors[level] || colors.mild
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Period History
            </h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Add New Period
            </button>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-error-50 dark:bg-error-900/30 border border-error-200 dark:border-error-800 rounded-lg p-4 text-error-700 dark:text-error-300">
              {error}
            </div>
          )}

          {!loading && !error && periods.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No periods recorded yet.</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-4 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                Add your first period
              </button>
            </div>
          )}

          {!loading && !error && periods.length > 0 && (
            <div className="space-y-4">
              {periods.map((period, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-gray-700 dark:text-gray-300">
                          {new Date(period.startDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="text-gray-400 dark:text-gray-500">to</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {new Date(period.endDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getCrampLevelColor(period.crampLevel)}`}>
                          {period.crampLevel } Cramp Level
                        </span>
                      </div>
                    </div>
                  </div>
                  {period.notes && (
                    <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                      {period.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add Period Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Add New Period
            </h2>
            <form onSubmit={handleAddPeriod}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newPeriod.startDate}
                    onChange={(e) => setNewPeriod({ ...newPeriod, startDate: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={newPeriod.endDate}
                    onChange={(e) => setNewPeriod({ ...newPeriod, endDate: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cramp Level
                  </label>
                  <select
                    value={newPeriod.crampLevel}
                    onChange={(e) => setNewPeriod({ ...newPeriod, crampLevel: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  >
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={newPeriod.notes}
                    onChange={(e) => setNewPeriod({ ...newPeriod, notes: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    rows="3"
                    placeholder="Add any symptoms or notes..."
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  Add Period
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Periods