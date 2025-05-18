import { useState } from 'react';
import { sendNotification } from '../api';

export default function NotificationForm() {
  const [form, setForm] = useState({
    type: 'sms',
    userId: '',
    recipient: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendNotification(form);
      alert('✅ Notification sent!');
    } catch (err) {
      alert('❌ Error sending notification');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-gray-800 shadow-lg rounded-xl border border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-white">Send Notification</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="userId"
          placeholder="User ID"
          onChange={handleChange}
          className={inputStyle}
        />

        <select
          name="type"
          onChange={handleChange}
          className={inputStyle}
          value={form.type}
        >
          <option value="sms">SMS</option>
          <option value="email">Email</option>
          <option value="in-app">In-App</option>
        </select>

        <input
          name="recipient"
          placeholder="Recipient"
          onChange={handleChange}
          className={`${inputStyle} sm:col-span-2`}
        />

        <input
          name="subject"
          placeholder="Subject (Email only)"
          onChange={handleChange}
          className={`${inputStyle} sm:col-span-2`}
        />
      </div>

      <textarea
        name="message"
        placeholder="Message"
        onChange={handleChange}
        className={`${inputStyle} h-28 resize-none`}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
      >
        Send Notification
      </button>
    </form>
  );
}

// Reusable input style
const inputStyle =
  'bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition w-full';
