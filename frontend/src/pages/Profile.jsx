import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        setUser(data.user);
      } catch (err) {
        setError('Failed to load profile');
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !user) {
    return null;
  }

  return (
    <div className="auth-page">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.name ? user.name[0].toUpperCase() : 'U'}
        </div>
        <h1>Welcome, {user.name}</h1>
        
        <div className="profile-info">
          <div className="profile-info-item">
            <span className="label">Email Address</span>
            <span className="value">{user.email}</span>
          </div>
          <div className="profile-info-item">
            <span className="label">Account Created</span>
            <span className="value">
              {new Date(user.createdAt || Date.now()).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
