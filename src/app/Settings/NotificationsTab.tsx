"use client";

import React, { useState } from "react";

/**
 * NotificationsTab Component
 *
 * Manages user notification preferences including:
 * - Email notifications for issue updates
 * - Push notifications for real-time alerts
 * - Weekly summary digest
 */
const NotificationsTab = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        Notification Preferences
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div>
            <h3 className="text-white font-medium">Email Notifications</h3>
            <p className="text-gray-400 text-sm">
              Receive issue updates via email
            </p>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-neutral"
            checked={notifications.email}
            onChange={(e) =>
              setNotifications((prev) => ({
                ...prev,
                email: e.target.checked,
              }))
            }
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div>
            <h3 className="text-white font-medium">Push Notifications</h3>
            <p className="text-gray-400 text-sm">
              Get real-time notifications in browser
            </p>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={notifications.push}
            onChange={(e) =>
              setNotifications((prev) => ({
                ...prev,
                push: e.target.checked,
              }))
            }
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div>
            <h3 className="text-white font-medium">Weekly Summary</h3>
            <p className="text-gray-400 text-sm">
              Weekly digest of your issue activity
            </p>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={notifications.weekly}
            onChange={(e) =>
              setNotifications((prev) => ({
                ...prev,
                weekly: e.target.checked,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;
