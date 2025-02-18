import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import SERVER_URL from '../../Constant';





const providers = [{ id: 'credentials', name: 'Email and Password' }];

const signIn = async (provider, formData, setIsAuthenticated, navigate) => {
  try {
    console.log("Call login ....");
    const response = await fetch(
      SERVER_URL + '/api/NoAuth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
        rememberMe: true,
      }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('jwtToken', data.jwtToken);
    setIsAuthenticated(true); // Cập nhật trạng thái đăng nhập
    navigate('/home'); // Chuyển về trang chủ

    // Gọi API lấy roles
    const rolesResponse = await fetch(
      SERVER_URL + '/get-roles-by-user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${data.jwtToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!rolesResponse.ok) {
      throw new Error('Failed to fetch roles');
    }

    const roles = await rolesResponse.json();
    localStorage.setItem('userRoles', JSON.stringify(roles));

  } catch (error) {
    alert(`Login error: ${error.message}`);
  }
};

export default function LoginSignup({ setIsAuthenticated }) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={(provider, formData) => signIn(provider, formData, setIsAuthenticated, navigate)}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false } }}
      />
    </AppProvider>
  );
}
