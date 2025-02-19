import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from '../../Constant';

const apiClient = axios.create({
  baseURL: SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
});

const logoutUser = async (jwtToken) => {
  try {
    await apiClient.post('/api/NoAuth/logout', {}, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
  } catch (error) {
    console.error('Logout error:', error.response?.data?.message || error.message);
  }
};

export default function Logout({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const jwtToken = localStorage.getItem('jwtToken');
    
    if (jwtToken) {
      await logoutUser(jwtToken);
    }

    // Xóa thông tin người dùng sau khi logout
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRoles');
    setIsAuthenticated(false);

    // Chuyển hướng về trang đăng nhập
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}
