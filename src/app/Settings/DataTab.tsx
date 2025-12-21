"use client";

import React from "react";

/**
 * DataTab Component
 *
 * Manages user data including:
 * - Data export functionality
 * - Data import from other systems
 * - Account deletion (danger zone)
 */
const DataTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Data Management</h2>

      <div className="space-y-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-white font-medium mb-2">Export Data</h3>
          <p className="text-gray-400 text-sm mb-4">
            Download all your issues and data
          </p>
          <button className="btn btn-info">Export JSON</button>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-white font-medium mb-2">Import Data</h3>
          <p className="text-gray-400 text-sm mb-4">
            Import issues from another system
          </p>
          <input
            type="file"
            className="file-input file-input-bordered file-input-neutral w-full max-w-xs bg-zinc-900"
          />
        </div>

        <div className="divider"></div>

        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
          <h3 className="text-red-400 font-medium mb-2">Danger Zone</h3>
          <p className="text-gray-400 text-sm mb-4">
            Permanently delete your account and all data
          </p>
          <button className="btn btn-error">Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default DataTab;
