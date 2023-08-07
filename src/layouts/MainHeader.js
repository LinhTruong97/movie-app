import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import useAuth from "../hooks/useAuth";
import SearchBar from "../components/SearchBar";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Button, Menu, MenuItem, Tooltip, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

const pages = ['Category', 'Favorite'];
const settings = ['Profile', 'Settings'];

function MainHeader() {
    const auth = useAuth();
    const navigate = useNavigate()
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElPages, setAnchorElPages] = useState(null);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenPagesMenu = (event) => {
        if (event) {
            setAnchorElPages(event.currentTarget);
        }
    };

    const handleClosePagesMenu = () => {
        setAnchorElPages(null);
    };
    const handleLogout = () => {
        handleCloseUserMenu();
        auth.logout(() => navigate("/"));
    };
    const handleLogin = () => {
        handleCloseUserMenu();
        navigate("/login");;
    };
    return (

        <AppBar position="static" sx={{ backgroundColor: "black" }}>
            <Toolbar variant="dense">
                <Box sx={{ flexGrow: 1 }}>
                    {isMobile ? (
                        <>
                            <IconButton
                                color="inherit"
                                aria-label="menu"
                                onClick={handleOpenPagesMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorElPages}
                                open={Boolean(anchorElPages)}
                                onClose={handleClosePagesMenu}

                            >
                                <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={() => navigate(`/${page.toLowerCase()}`)}>
                                        {page}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Box sx={{ display: 'flex' }}>
                                <Button
                                    key="Home"
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    onClick={() => navigate("/")}
                                >
                                    Home
                                </Button>
                                {pages.map((page) => (
                                    <Button
                                        key={page}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                        onClick={() => navigate(`/${page.toLowerCase()}`)}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Box>

                        </>
                    )}
                </Box>
                <Box sx={{ flexGrow: 1, maxWidth: "300px", m: 1 }} >
                    <SearchBar />
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar src="/broken-image.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {auth.user ? (
                            [
                                <MenuItem key="user" onClick={handleCloseUserMenu} >
                                    <Typography>
                                        Hi {auth.user.username}
                                    </Typography>
                                </MenuItem>,
                                ...settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu} >
                                        <Typography>{setting}</Typography>
                                    </MenuItem>
                                )),
                                <MenuItem key="logout" onClick={handleLogout} >
                                    <Typography>
                                        Logout
                                    </Typography>
                                </MenuItem>
                            ]
                        ) : (
                            <MenuItem key="login" onClick={() => handleLogin()} >
                                <Typography>
                                    Login
                                </Typography>
                            </MenuItem>
                        )}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>

    );
}

export default MainHeader;