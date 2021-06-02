import React from 'react'
import moment from 'moment'

import { Typography, Button, ButtonGroup } from "@material-ui/core"
import { Create, Delete, CheckCircle } from "@material-ui/icons"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
    todoStyle: {
        margin: "20px auto",
        padding: "20px",
        border: "2px solid #bdbdbd",
        borderRadius: "9px",
        display: "flex",
        justifyContent: "space-between"
    },
    muted: {
        color: "#8f8f8f"
    },
    isComplete: {
        color: "green"
    },
    checked: {
        textDecoration: "line-through"
    }
})

const Todo = ({ todo }) => {
    const classes = useStyles()

    return (
        <>
            <div className={classes.todoStyle}>
                <div>
                    {todo.isComplete ?
                        (
                            <Typography variant="subtitle1" className={classes.checked}>
                                {todo.name}
                            </Typography>
                        ) : (
                            <Typography variant="subtitle1">
                                {todo.name}
                            </Typography>
                        )
                    }

                    <Typography className={classes.muted} variant="body2">
                        todo author
                    </Typography>
                    <Typography className={classes.muted} variant="body2">
                        Added: {moment(todo.date).fromNow()}
                    </Typography>
                </div>
                <div>
                    <ButtonGroup size="small" aria-label="outlined primary button group" >
                        {todo.isComplete ?
                            (
                                <Button>
                                    <CheckCircle color="action" className={classes.isComplete} />
                                </Button>
                            ) : (
                                <Button>
                                    <CheckCircle color="action" />
                                </Button>
                            )}
                        <Button>
                            <Create color="primary" />
                        </Button>
                        <Button>
                            <Delete color="secondary" />
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </>
    )
}

export default Todo
