import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@material-ui/icons/Home';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Navigation() {

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => setAnchorEl(e.target);
    const handleClose = () => setAnchorEl(null);
    return (
        <AppBar position="static">
            <Toolbar>
                <NavLink to='/'>
                    <HomeIcon
                        style={styles.home}
                        fontSize="large" />
                </NavLink>
                <Button
                    color="inherit"
                    component={Link}
                    to='/orders'
                >Orders
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to='/orders/new'
                >New order
                </Button>
                <Button
                    color="inherit"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    style={styles.adminBtn}
                >Admin
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem
                        onClick={handleClose}
                        component={NavLink}
                        to='/waiters'
                    >Waiters list</MenuItem>
                    <MenuItem
                        onClick={handleClose}
                        component={NavLink}
                        to='/menu'
                    >Menu sections list</MenuItem>
                    <MenuItem
                        onClick={handleClose}
                        component={NavLink}
                        to='/dishes'
                    >Dishes list</MenuItem>
                    <MenuItem
                        onClick={handleClose}
                    >Statistic</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}

export default Navigation
const styles = {
    header: { textAlign: 'center' },
    adminBtn: {
        marginLeft: 'auto',
        marginRight: '0'
    },
    home: {
        color: '#fff'
    }
}