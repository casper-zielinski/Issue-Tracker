"use client";

import React, { useState } from "react";

/**
 * AppearanceTab Component
 *
 * Manages user appearance and UI preferences including:
 * - Theme selection (light, dark, auto)
 * - Language preferences
 * - Auto-save functionality
 */
const AppearanceTab = () => {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        Appearance Settings
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Theme</label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Language</label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div>
            <h3 className="text-white font-medium">Auto-save</h3>
            <p className="text-gray-400 text-sm">
              Automatically save form inputs
            </p>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={autoSave}
            onChange={(e) => setAutoSave(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default AppearanceTab;
