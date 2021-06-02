import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import Todo from './Todo'
import { getTodos } from '../../store/actions/todoActions'

const useStyles = makeStyles({
    todoStyle: {
        margin: "20px auto",
        padding: "20px",
        borderRadius: "9px",
        boxShadow: "0 0 12px -3px #000000"
    }
})

const ListTodos = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const todos = useSelector((state) => state.todos)

    useEffect(() => {
        dispatch(getTodos())
    }, [dispatch])

    return (
        <>
            <div className={classes.todoStyle}>
                <Typography variant="h5">
                    {todos.length > 0 ? "The Todos" : "No Todos In Database"}
                </Typography>
                {todos && todos.map((todo) => (
                    <Todo todo={todo} key={todo._id} />
                ))}
            </div>
        </>
    )
}

export default ListTodos
