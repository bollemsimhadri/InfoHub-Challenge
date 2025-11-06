import React, { useState } from 'react';
import WeatherModule from '../WeatherModule';
import QuoteGenerator from '../QuoteGenerator';
import CurrencyConverter from '../CurrencyConverter';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('Weather');

  const tabs = [
    { name: 'Weather', color: 'blue' },
    { name: 'Quote', color: 'indigo' },
    { name: 'Currency', color: 'green' },
  ];

  const getButtonClasses = (tab) => {
    if (activeTab === tab.name) {
      if (tab.color === 'blue') return 'bg-blue-500 text-white shadow-lg';
      if (tab.color === 'indigo') return 'bg-indigo-500 text-white shadow-lg';
      if (tab.color === 'green') return 'bg-green-500 text-white shadow-lg';
    } else {
      if (tab.color === 'blue') return 'bg-white text-blue-500 hover:bg-blue-100 shadow-md';
      if (tab.color === 'indigo') return 'bg-white text-indigo-500 hover:bg-indigo-100 shadow-md';
      if (tab.color === 'green') return 'bg-white text-green-500 hover:bg-green-100 shadow-md';
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-indigo-100 via-blue-50 to-blue-200 px-6 py-12">

      {/* Tabs container */}
      <div className="flex justify-center gap-6 mt-5 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-10 py-4 rounded-full font-semibold text-lg transition-all duration-200 ${getButtonClasses(tab)}`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Module container */}
      <div className="flex flex-col items-center justify-center w-full min-h-[70vh]">
        {activeTab === 'Weather' && <WeatherModule />}
        {activeTab === 'Quote' && <QuoteGenerator />}
        {activeTab === 'Currency' && <CurrencyConverter />}
      </div>

    </section>
  );
};

export default LandingPage;
