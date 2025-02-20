
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

