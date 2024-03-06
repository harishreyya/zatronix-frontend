import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessModal = ({ message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return <div className="success-modal">
      <p>{message}</p>
    </div>
};

export const OfflineMode = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSuccessMessage('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
    });
    navigation('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const offlineData = JSON.parse(localStorage.getItem('offlineData') || '[]');
      localStorage.setItem('offlineData', JSON.stringify([...offlineData, formData]));
      setSuccessMessage('Registered Offline mode');
      setShowModal(true);
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return  <div className='form-container'>
      <p className='glowing-text-offline'>You are offline</p>
      <div className="offline-box">
        <form className="container" onSubmit={handleSubmit}>
          <h4>OFFLINE SIGNUP</h4>
          {showModal && <SuccessModal message={successMessage} onClose={handleModalClose} />}
          <label>
            Name
            <br/>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label> <br/>
          <label>
            Email
            <br/>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label> <br/>
          <label>
            Phone
            <br/>
            <input type="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </label> <br/>
          <label>
            Password
            <br/>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </label> <br/> <br/>
          <button className='btn-offline' type="submit">Register</button>
        </form>
      </div>
    </div>
};
