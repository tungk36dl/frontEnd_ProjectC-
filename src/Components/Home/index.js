import React, { useEffect, useState } from 'react'

const Home = () => {


  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const storedRoles = localStorage.getItem('userRoles');
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles)); // Chuyển từ JSON về array
    }
  }, []);
  return (
    <div>
      <h1>HomeHome</h1>
      <h2>Your Roles:</h2>
      <ul>
        {roles.map((role, index) => (
          <li key={index}>{role}</li>
        ))}
      </ul>
    </div>
  )
}

export default Home