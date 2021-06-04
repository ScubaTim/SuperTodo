import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppBar, Typography, Toolbar, Button, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles'

import { Link, useHistory } from 'react-router-dom'

import { signOut } from '../../store/actions/authActions'

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    subtitle: {
        textTransform: "capitalize"
    },
    spacer: {
        padding: "0 0.5rem",
    },
    linkStyle: {
        color: '#fafafa',
        textDecoration: 'none'
    }
})

const NavBar = () => {
    const classes = useStyles()
    const state = useSelector(state => state)
    const auth = useSelector(state => state.auth)
    const history = useHistory()
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log('state', state)

    const handleSignOut = () => {
        dispatch(signOut())

        history.push("/signin")
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.root} variant="h6">
                        <Link className={classes.linkStyle} to="/">
                            <strong>SuperTodo</strong>
                        </Link>
                    </Typography>
                    {auth._id ? (
                        <>
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                <MenuIcon style={{ color: "white", fontSize: "2rem" }} />
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => handleClose()}>Signed in as: <strong style={{ padding: "0 6px", textTransform: "capitalize" }}>{auth.name}</strong></MenuItem>
                                <hr />
                                <MenuItem onClick={() => handleSignOut()}><strong>Sign Out</strong></MenuItem>
                            </Menu>
                            {/* <Typography className={classes.subtitle}>
                                <p>{auth.name}</p>
                            </Typography>
                            <span className={classes.spacer}>|</span>
                            <Button className={classes.linkStyle} color="inherit" onClick={() => handleSignOut()}>
                                Sign Out
                            </Button> */}
                        </>
                    ) : (
                        <>
                            <Button color="inherit">
                                <Link className={classes.linkStyle} to="/signin">
                                    Sign In
                                </Link>
                            </Button>
                            <Button color="inherit" >
                                <Link className={classes.linkStyle} to="/signup">
                                    Sign Up
                                </Link>
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar
