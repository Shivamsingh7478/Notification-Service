import { useState } from 'react';
import { getNotifications } from '../api';

export default function NotificationList() {
  const [userId, setUserId] = useState('');
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications(userId);
      setNotifications(res.data.notifications);
    } catch (err) {
      alert('❌ Failed to fetch notifications');
    }
  };

  return (
    <div className="bg-gray-800 shadow-lg rounded-xl p-6 space-y-5 border border-gray-700">
      <h2 className="text-xl font-semibold text-white">Your Notifications</h2>

      <div className="flex gap-2">
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          className={inputStyle + ' flex-1'}
        />
        <button
          onClick={fetchNotifications}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
        >
          Fetch
        </button>
      </div>

      <ul className="divide-y divide-gray-700">
        {notifications.map((n, i) => (
          <li key={i} className="py-3 text-gray-300">
            <p><span className="font-medium text-white">Type:</span> {n.type}</p>
            <p><span className="font-medium text-white">Message:</span> {n.content}</p>
            <p><span className="font-medium text-white">Status:</span> {n.status}</p>
          </li>
        ))}
      </ul>

      {notifications.length === 0 && (
        <p className="text-sm text-gray-400 text-center">No notifications to show.</p>
      )}
    </div>
  );
}

// Reusable dark input style
const inputStyle =
  'bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition w-full';
