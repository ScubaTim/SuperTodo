import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppBar, Typography, Toolbar, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Link, useHistory } from 'react-router-dom'

import { signOut } from '../../store/actions/authActions'

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    linkStyle: {
        color: '#fafafa',
        textDecoration: 'none'
    }
})

const NavBar = () => {
    const classes = useStyles()
    const state = useSelector(state => state)
    const history = useHistory()
    const dispatch = useDispatch()

    console.log('state', state)

    const handleSignOut = () => {
        dispatch(signOut())

        history.push("/signin")
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.root} variant="h4">
                        <Link className={classes.linkStyle} to="/">
                            SuperTodo
                        </Link>
                    </Typography>
                    <Typography className={classes.root} variant="subtitle2">
                        Logged in as Chaoo
                    </Typography>
                    <Button color="inherit" onClick={() => handleSignOut()}>
                        Sign Out
                    </Button>
                    <Button color="inherit" >
                        <Link className={classes.linkStyle} to="/signin">
                            Sign In
                        </Link>
                    </Button>
                    <Button color="inherit" >
                        <Link className={classes.linkStyle} to="/signup">
                            Sign Up
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar
