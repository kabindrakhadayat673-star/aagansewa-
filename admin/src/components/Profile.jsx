import React, { useState } from 'react'
import { User, Mail, Phone, MapPin, Edit, Save, X, Camera } from 'lucide-react'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Admin User',
    role: 'Administrator',
    email: 'admin@aangansewa.com',
    phone: '+977 9800000000',
    location: 'Kathmandu, Nepal',
    photo: null
  })
  const [originalProfile, setOriginalProfile] = useState(null)

  const handleSave = () => {
    setIsEditing(false)
    // Save to localStorage or API
  }

  const handlePhotoChange = (event) => {
    if (!event.target.files || event.target.files.length === 0) return
    
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (loadEvent) => {
        setProfile({...profile, photo: loadEvent.target.result})
      }
      reader.onerror = () => {
        alert('Error reading file')
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
              {profile.photo ? (
                <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={40} className="text-white" />
              )}
            </div>
            {isEditing && (
              <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700">
                <Camera size={16} />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div>
            {isEditing ? (
              <input 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="text-2xl font-bold border rounded px-2 py-1"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
            )}
            <p className="text-gray-600">{profile.role}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-gray-500" />
            {isEditing ? (
              <input 
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="border rounded px-2 py-1 flex-1"
              />
            ) : (
              <span>{profile.email}</span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Phone size={20} className="text-gray-500" />
            {isEditing ? (
              <input 
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="border rounded px-2 py-1 flex-1"
              />
            ) : (
              <span>{profile.phone}</span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-gray-500" />
            {isEditing ? (
              <input 
                value={profile.location}
                onChange={(e) => setProfile({...profile, location: e.target.value})}
                className="border rounded px-2 py-1 flex-1"
              />
            ) : (
              <span>{profile.location}</span>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex gap-2">
          {isEditing ? (
            <>
              <button 
                onClick={handleSave}
                
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Save size={16} />
                Save
              </button>
              <button 
                onClick={() => {
                  if (originalProfile) {
                    setProfile(originalProfile)
                  }
                  setIsEditing(false)
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
              >
                <X size={16} />
                Cancel
              </button>
            </>
          ) : (
            <button 
              onClick={() => {
                setOriginalProfile({...profile})
                setIsEditing(true)
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Edit size={16} />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile