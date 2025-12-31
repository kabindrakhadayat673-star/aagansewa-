import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const Navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <div className="bg-white px-4 py-2 rounded-lg shadow text-gray-700">
          Welcome, Admin 👋
        </div>
      </div>
    </div>
  );
};

export default Dashboard;