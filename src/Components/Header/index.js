

// import * as React from 'react';
// import { useNavigate } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import { NavLink } from 'react-router-dom';



// function Header({ setIsAuthenticated }) {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const navigate = useNavigate();

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//     const [roles, setRoles] = React.useState([]);
  
//     React.useEffect(() => {
//       const storedRoles = localStorage.getItem('userRoles');
//       if (storedRoles) {
//         setRoles(JSON.parse(storedRoles)); // Chuyển từ JSON về array
//       }
//     }, []);
//     var pages = [];

//     if(roles.includes("admin")) {
//        pages = [
//         ['Home', '/home'],
//         ['Teacher', '/teacher'],
//         ['Student', '/student'],
//         ['Score', '/score'],
//         ['Subject', '/subject'],
//         ['SubjectDetail', '/subjectDetail'],
//         ['Major', '/major'],
//         ['Cohort', '/cohort']
//       ];
//     }else if(roles.includes("teacher")) {
//        pages = [
//         ['Home', '/home'],
//         ['Teacher', '/teacher'],
//         ['Student', '/student'],
//         ['Score', '/score'],
//         ['Cohort', '/cohort']
//       ];
//     }else if(roles.includes("admin"))
//     {
//        pages = [
//         ['Home', '/home'],
//         ['Teacher', '/teacher'],
//         ['Student', '/student'],
//         ['Score', '/score'],
//         ['Cohort', '/cohort']
//       ];
//     }

//   // ✅ Hàm xử lý Logout
//   const handleLogout = () => {
//     localStorage.removeItem('jwtToken'); // Xóa token
//     localStorage.removeItem('userRoles'); // Xóa roles
//     setIsAuthenticated(false); // Cập nhật state
//     navigate('/login'); // Điều hướng về trang đăng nhập
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>

//           {/* Menu nhỏ trên mobile */}
//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{ display: { xs: 'block', md: 'none' } }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
//                   <NavLink to={page[1]} style={{ textDecoration: 'none', color: 'inherit' }}>
//                     <Typography sx={{ textAlign: 'center' }}>{page[0]}</Typography>
//                   </NavLink>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>

//           <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>

//           {/* Menu trên desktop */}
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page[0]}
//                 component={NavLink}
//                 to={page[1]}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 {page[0]}
//               </Button>
//             ))}
//           </Box>

//           {/* Avatar & Menu User */}
//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               <MenuItem onClick={handleCloseUserMenu}>
//                 <NavLink to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
//                   <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
//                 </NavLink>
//               </MenuItem>
//               {/* ✅ Nút Logout gọi trực tiếp handleLogout */}
//               <MenuItem onClick={handleLogout}>
//                 <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
//               </MenuItem>
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// export default Header;




import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon, Adb as AdbIcon } from "@mui/icons-material";

function Header({ setIsAuthenticated }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRoles = localStorage.getItem("userRoles");
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles));
    }
  }, []);

  const pages = useMemo(() => {
    const commonPages = [{ label: "Home", path: "/home" }];
    if (roles.includes("admin")) {
      return [
        ...commonPages,
        { label: "Teacher", path: "/teacher" },
        { label: "Student", path: "/student" },
        { label: "Score", path: "/score" },
        { label: "Subject", path: "/subject" },
        { label: "SubjectDetail", path: "/subjectDetail" },
        { label: "Major", path: "/major" },
        { label: "Cohort", path: "/cohort" },
      ];
    }
    if (roles.includes("teacher")) {
      return [
        ...commonPages,
        { label: "Teacher", path: "/teacher" },
        { label: "Student", path: "/student" },
        { label: "Score", path: "/score" },
        { label: "Cohort", path: "/cohort" },
      ];
    }

    if (roles.includes("student")) {
      return [
        ...commonPages,
        { label: "Student", path: "/student" },
        { label: "Score", path: "/score" },
        { label: "Cohort", path: "/cohort" },
      ];
    }
    return commonPages;
  }, [roles]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userRoles");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={(e) => setAnchorElNav(e.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map(({ label, path }) => (
                <MenuItem key={label} onClick={() => setAnchorElNav(null)}>
                  <NavLink to={path} style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography textAlign="center">{label}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ label, path }) => (
              <Button key={label} component={NavLink} to={path} sx={{ my: 2, color: "white" }}>
                {label}
              </Button>
            ))}
          </Box>

          {/* User Avatar Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
              sx={{ mt: "45px" }}
            >
              <MenuItem onClick={() => setAnchorElUser(null)}>
                <NavLink to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
                  <Typography textAlign="center">Profile</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

