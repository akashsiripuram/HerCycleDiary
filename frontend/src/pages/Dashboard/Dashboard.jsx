import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "../../Contexts/ThemeContext";
import ThemeToggle from "../../components/ThemeToggle";
import axios from "axios";
import Calendar from "react-calendar";

function Dashboard() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { theme } = useTheme();
  const [lastPeriod] = useState("2024-02-15");
  const [cycleLength] = useState(28);
  // eslint-disable-next-line no-unused-vars
  const [periodLength] = useState(5);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState([]);
  useEffect(() => {
    const fetchPeriods = async () => {
      const res = await axios.get("http://localhost:5000/api/period", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("hWLOO",res.data);
      const markedDates = res.data.periods.map((p) => new Date(p.startDate));

      console.log(markedDates);
      if (res.data.nextPredicted)
        markedDates.push(new Date(res.data.nextPredicted));
      setDates(markedDates);
    };
    fetchPeriods();
  }, []);

  // Calculate next period
 
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const quickActions = [
    { label: "Log Period", color: "primary", to: "log-period" },
    { label: "Food Suggestions", color: "primary", to: "food-suggestions" },
    
    { label: "Period History", color: "primary", to: "periods" },
  ];
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
  console.log(user);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const selfCareCards = [
    {
      title: "Nutrition Tip",
      description:
        "Boost iron intake with leafy greens and lean proteins during menstruation.",
      icon: "🥗",
    },
    {
      title: "Exercise Tip",
      description:
        "Light yoga or stretching can help relieve menstrual cramps.",
      icon: "🧘‍♀️",
    },
    {
      title: "Self-Care",
      description:
        "Try a warm compress on your lower abdomen to ease discomfort.",
      icon: "💆‍♀️",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            HerCycleDiary
          </h1>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/profile")}
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 transition-colors">
              Profile
            </button>
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                Welcome back, {user && user.username} 👋
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                "Take care of your body, it's the only place you have to live."
                - Jim Rohn
              </p>
            </div>

            {/* Cycle Status */}
            <div className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Current Cycle Status
                </h3>
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                  Day 14 of 28
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                  style={{ width: "50%" }}></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Next Period in
                  </p>
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                   {user.daysUntilNextPeriod!==undefined?`${user.daysUntilNextPeriod} days`:`NA`} 
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Cycle Length
                  </p>
                  <p className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                    {user.averageCycleLength!==null?`${user.averageCycleLength} days`:`NA`}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  to={`/${action.to}`}
                  key={index}
                  className={`p-4 rounded-xl bg-${action.color}-50 dark:bg-${action.color}-900/20 
                    text-${action.color}-700 dark:text-${action.color}-300 
                    hover:bg-${action.color}-100 dark:hover:bg-${action.color}-900/30 
                    transition-colors duration-200`}>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Calendar Preview */}
            {dates && (
              <Calendar
              defaultActiveStartDate={new Date()}
              className={"dark:text-white  text-center"}
                tileClassName={({ date }) => {
                  const marked = dates.find(
                    (d) => d.toDateString() === date.toDateString()
                  );
                  const predicted =
                    dates.length > 0 ? new Date(dates[dates.length - 1]) : null;

                  if (
                    marked &&
                    (!predicted ||
                      date.toDateString() !== predicted.toDateString())
                  ) {
                    return "bg-pink-300 rounded-full";
                  }

                  if (
                    predicted &&
                    date.toDateString() === predicted.toDateString()
                  ) {
                    return "bg-blue-300 rounded-full";
                  }

                  return "p-2";
                }}
              />
            )}

            {/* Mood Tracker */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Today's Mood
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {["😊", "😐", "😢", "😴"].map((emoji, i) => (
                  <button
                    key={i}
                    className="p-3 text-2xl bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Self-Care Suggestions */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Self-Care Suggestions
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {selfCareCards.map((card, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{card.icon}</div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {card.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
