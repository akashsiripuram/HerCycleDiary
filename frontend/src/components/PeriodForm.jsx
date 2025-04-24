import React, { useState } from 'react';
import SliderWithEmojis from './SliderWithEmojis';
import Button from './ui/Button';
import axios from 'axios';
import {toast} from "sonner";
import { useNavigate } from 'react-router-dom';

const PeriodForm = () => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [crampLevel, setCrampLevel] = useState(5);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const periodData = {
      startDate,
      endDate,
      crampLevel,
      notes
    };
    
    console.log('Form data submitted:', periodData);
    try{
      const response=await axios.post("http://localhost:5000/api/period", periodData, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(response.data.success){
        toast.success("Period data saved successfully!");
        setStartDate(new Date().toISOString().split('T')[0]);
        setEndDate(new Date().toISOString().split('T')[0]);
        setCrampLevel(5);
        setNotes('');
        navigate('/dashboard'); 
        window.location.reload(); 
      }
      else{
        toast.error("Failed to save period data. Please try again.");
      }
    }catch(err){
      console.error('Error submitting form:', err);
      toast.error("An error occurred while saving your data. Please try again.");
    }
    
    
   
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 max-w-[100%] justify-center mx-auto p-4">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Log Period</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Cramp Level
              </label>
              <SliderWithEmojis value={crampLevel} onChange={setCrampLevel} />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Notes
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How are you feeling today? Any symptoms to note?"
                rows="4"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                type="submit" 
                variant="primary" 
                isLoading={isSubmitting}
                className="flex-1"
              >
                Save Period Data
              </Button>
              <Button 
                type="button" 
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  setStartDate(new Date().toISOString().split('T')[0]);
                  setEndDate(new Date().toISOString().split('T')[0]);
                  setCrampLevel(5);
                  setNotes('');
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PeriodForm;