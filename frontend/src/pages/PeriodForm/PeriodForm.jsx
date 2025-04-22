import React from 'react';
import PeriodForm from '../../components/PeriodForm';

const PeriodTracker = () => {
  return (
    <div className="max-w-2xl mx-auto animate-fade-in min-h-screen bg-gray-50 dark:bg-gray-900 ">
      <div className="mb-8 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Track Your Cycle</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Log your period details to monitor your menstrual health
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6 md:p-8 transition-all duration-300 animate-slide-up">
        <PeriodForm />
      </div>
    </div>
  );
};

export default PeriodTracker;