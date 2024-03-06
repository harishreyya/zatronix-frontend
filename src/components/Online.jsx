import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SuccessModal = ({ message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="success-modal">
      <p>{message}</p>
    </div>
  );
};

export const OnlineMode = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    const offlineData = JSON.parse(localStorage.getItem('offlineData') || '[]');


    if (offlineData.length > 0 && navigator.onLine) {
      axios.post('https://zatronix-backend.onrender.com/registerOffline',offlineData)
        .then((response) => {
          localStorage.removeItem('offlineData');
        })
        .catch((error) => {
          console.error('Error -', error.message);
        });
    }
  }, [navigation]);

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
      const response = await axios.post('https://zatronix-backend.onrender.com/registerOnline', formData);
      console.log(response.data);
      setSuccessMessage('Registered Online mode');
      setShowModal(true);
    } catch (error) {
      console.error('Not Registration-', error.response ? error.response.data : error.message);
    }
  };

  return <div className='form-container'>
        <p className='glowing-text-online'>You are Online</p>
      <div className="online-box">
        <form className="container" onSubmit={handleSubmit}>
          <h4>ONLINE SIGNUP</h4>
          {showModal && <SuccessModal message={successMessage} onClose={handleModalClose} />}
          <label>
            Name 
            <br/><input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label><br/>
          <label>
            Email
            <br/><input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label><br/>
          <label>
            Phone
            <br/><input type="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </label><br/>
          <label>
            Password
            <br/><input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </label><br/>
          <br/>
          <button className='btn-online' type="submit">Register</button>
        </form>
      </div>
    </div>
};
