import React, { useState, useEffect } from 'react';

const Users = () => {


  const initialUsers = [
    { id: 1, name: "Ram Sharma", role: "Admin" },
    { id: 2, name: "Sita Gurung", role: "Manager" },
    { id: 3, name: "Hari Thapa", role: "Staff" },
    { id: 4, name: "Maya Rai", role: "Staff" }
  ];

  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('users');
      return saved ? JSON.parse(saved) : initialUsers;
    } catch (error) {
      console.error('Error parsing users data:', error);
      return initialUsers;
    }
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleAdd = () => {
    const name = prompt('Enter staff name:');
    const role = prompt('Enter role (Admin/Manager/Staff):');
    
    if (name && role) {
      const newUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        name,
        role
      };
      setUsers([...users, newUser]);
    }
  };

  const handleEdit = (id) => {
    const newName = prompt('Enter new name:');
    if (newName) {
      setUsers(users.map(user => 
        user.id === id ? { ...user, name: newName } : user
      ));
    }
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to permanently delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Staff
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Staff List</h2>
        
        <div className="space-y-3">
          {users.map((user, index) => (
            <div key={user.id} className="flex justify-between items-center p-3 border rounded">
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(user.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;