import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DarkModeSwitcher from '../../components/Header/DarkModeSwitcher.tsx';
import useColorMode from '../../hooks/useColorMode.tsx';
const Settings = () => {

  const [language, setLanguage] = useState('English');
  const [colorMode, setColorMode] = useColorMode();
  const handleThemeChange = (e) => {
    setColorMode(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <div className="flex flex-col mb-4">
        <h2 className="text-lg font-bold mb-2">Theme</h2>
        <select
          value={colorMode}
          onChange={handleThemeChange}
          className="block w-full py-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div className="flex flex-col mb-4">
        <h2 className="text-lg font-bold mb-2">Language</h2>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="block w-full py-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <option value="English">English</option>
          <option value="Vietnamese">Tiếng Việt</option>
          <option value="French">French</option>
        </select>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Settings;