import React from 'react'

import { Typography, TextField, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
    formStyle: {
        margin: "0px auto",
        padding: "30px",
        borderRadius: "9px",
        boxShadow: "0 0 12px -3px #000000"
    },
    spacing: {
        marginTop: "20px"
    }
})

const SignUp = () => {
    const classes = useStyles()

    return (
        <>
            <form className={classes.formStyle} noValidate="true" autoComplete="off">
                <Typography variant="h5">Sign Up</Typography>
                <TextField className={classes.spacing} id="enter-name" label="Enter Name" variant="outlined" fullWidth></TextField>
                <TextField className={classes.spacing} id="enter-email" label="Enter Email" variant="outlined" fullWidth></TextField>
                <TextField className={classes.spacing} id="enter-password" label="Enter Password" variant="outlined" fullWidth type="password" />
                <Button className={classes.spacing} variant="contained" color="primary" type="submit">
                    Sign In
                </Button>
            </form>
        </>
    )
}

export default SignUp