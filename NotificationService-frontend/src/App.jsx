import NotificationForm from './components/NotificationForm';
import NotificationList from './components/NotificationList';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 to-gray-800 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-gray-850 rounded-2xl shadow-2xl p-8 space-y-8 border border-gray-700">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          🚀 Notification Service
        </h1>
        <p className="text-center text-gray-400 text-sm">
          Send and view real-time updates with ease.
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <NotificationForm />
          </div>

          
          <div className="w-full lg:w-1/2">
            <NotificationList />
          </div>
        </div>
      </div>
    </div>
  );
}
