// src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [profileImage, setProfileImage] = useState(currentUser?.photoURL || '/default-avatar.png');
  
  useEffect(() => {
    if (!currentUser) {
      return;
    }
    
    // Load user info from localStorage
    const storedUserInfo = localStorage.getItem('gymUserInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      // If we don't have detailed info, at least use what we have from Firebase
      setUserInfo({
        firstName: currentUser.displayName ? currentUser.displayName.split(' ')[0] : '',
        lastName: currentUser.displayName ? currentUser.displayName.split(' ')[1] || '' : '',
        email: currentUser.email,
        phone: '',
        address: ''
      });
    }
    
    // If user has a profile image from Google/Firebase, use it
    if (currentUser.photoURL) {
      setProfileImage(currentUser.photoURL);
    } else {
      // Otherwise check if we have one in localStorage
      const storedImage = localStorage.getItem('gymProfileImage');
      if (storedImage) {
        setProfileImage(storedImage);
      }
    }
  }, [currentUser]);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setProfileImage(imageData);
        localStorage.setItem('gymProfileImage', imageData);
      };
      reader.readAsDataURL(file);
    }
  };
  
  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        <div className="alert alert-warning">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>You need to log in first.</span>
        </div>
        <Link to="/login" className="btn btn-primary mt-4">Go to Login</Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>
      
      <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <div className="avatar">
                <div className="w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={profileImage} alt="Profile" />
                </div>
              </div>
              
              <label className="btn btn-outline mt-4 cursor-pointer">
                Change Photo
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange}
                />
              </label>
            </div>
            
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-4">
                {userInfo?.firstName} {userInfo?.lastName}
              </h2>
              
              <div className="divider"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold">Contact Information</h3>
                  <p><strong>Email:</strong> {userInfo?.email}</p>
                  <p><strong>Phone:</strong> {userInfo?.phone || 'Not provided'}</p>
                </div>
                
                <div>
                  <h3 className="font-bold">Address</h3>
                  <p>{userInfo?.address || 'Not provided'}</p>
                </div>
              </div>
              
              <div className="divider"></div>
              
              <div>
                <h3 className="font-bold">Membership Information</h3>
                <p><strong>Status:</strong> <span className="badge badge-success">Active</span></p>
                <p><strong>Plan:</strong> 6 Months</p>
                <p><strong>Start Date:</strong> {new Date().toLocaleDateString()}</p>
                <p><strong>Expiry Date:</strong> {new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
          <div className="divider"></div>
          
          <div className="flex justify-center">
            <Link to="/" className="btn btn-primary">Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;