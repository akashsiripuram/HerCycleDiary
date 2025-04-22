import React from 'react';

const emojis = [
  { level: 1, emoji: '😩', label: 'Extremely painful' },
  { level: 2, emoji: '😖', label: 'Very painful' },
  { level: 3, emoji: '😣', label: 'Quite painful' },
  { level: 4, emoji: '😕', label: 'Uncomfortable' },
  { level: 5, emoji: '😐', label: 'Moderate' },
  { level: 6, emoji: '😊', label: 'Minor discomfort' },
  { level: 7, emoji: '😁', label: 'Slightly noticeable' },
  { level: 8, emoji: '😄', label: 'Barely noticeable' },
  { level: 9, emoji: '😆', label: 'Very mild' },
  { level: 10, emoji: '😂', label: 'No pain at all' }
];

const SliderWithEmojis = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          style={{
            backgroundImage: `linear-gradient(to right, #be185d ${(value - 1) * 10}%, #e0e0e0 ${(value - 1) * 10}%)`,
          }}
        />
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>1</span>
          <span className="hidden sm:block">2</span>
          <span className="hidden sm:block">3</span>
          <span className="hidden sm:block">4</span>
          <span>5</span>
          <span className="hidden sm:block">6</span>
          <span className="hidden sm:block">7</span>
          <span className="hidden sm:block">8</span>
          <span className="hidden sm:block">9</span>
          <span>10</span>
        </div>
      </div>
      
      <div className="mt-8 pt-2 flex justify-between items-center">
        <div className="text-center flex-1">
          <div className="emoji-current text-4xl transition-all duration-300 transform hover:scale-110">
            {emojis.find(e => e.level === value)?.emoji}
          </div>
          <div className="text-sm mt-1 font-medium text-gray-700 dark:text-gray-300">
            {emojis.find(e => e.level === value)?.label}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-2 md:gap-4 pt-2 emoji-slider mt-2">
        {emojis.map((item) => (
          <button
            key={item.level}
            type="button"
            onClick={() => onChange(item.level)}
            className={`text-center p-2 rounded-lg transition-all duration-200 hover:bg-primary-100 dark:hover:bg-primary-900/20 ${
              value === item.level 
                ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-500 scale-110' 
                : 'opacity-60'
            }`}
          >
            <span role="img" aria-label={item.label} className="text-xl sm:text-2xl block">
              {item.emoji}
            </span>
            <span className="sr-only">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SliderWithEmojis;