import axios from 'axios'
import { url } from '../../api'
import { toast } from 'react-toastify'

export const getTodos = () => {
    return (dispatch) => {
        axios
            .get(`${url}/todos`)
            .then((todos) => {
                dispatch({
                    type: "GET_TODOS",
                    todos
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const addTodo = (todo) => {
    return (dispatch) => {
        axios
            .post(`${url}/todos`, todo)
            .then((todo) => {
                dispatch({
                    type: "ADD_TODO",
                    todo
                })
            })
            .catch(err => {
                console.log(err)
                toast.error(err.response?.data, { position: toast.POSITION.BOTTOM_RIGHT })
            })
    }
}

export const updateTodo = (updatedTodo, id) => {
    return (dispatch) => {
        axios
            .put(`${url}/todos/${id}`, updatedTodo)
            .then((todo) => {
                dispatch({
                    type: "UPDATE_TODO",
                    todo
                })
            })
            .catch(err => {
                console.log(err)
                toast.error(err.response?.data, { position: toast.POSITION.BOTTOM_RIGHT })
            })
    }
}

export const checkTodo = (id) => {
    return (dispatch) => {
        axios
            .patch(`${url}/todos/${id}`, {})
            .then((todo) => {
                dispatch({
                    type: "CHECK_TODO",
                    todo
                })
            })
            .catch(err => {
                console.log(err)
                toast.error(err.response?.data, { position: toast.POSITION.BOTTOM_RIGHT })
            })
    }
}

export const deleteTodo = (id) => {
    return (dispatch) => {
        axios
            .delete(`${url}/todos/${id}`)
            .then(() => {
                dispatch({
                    type: "DELETE_TODO",
                    id
                })
            })
            .catch(err => {
                console.log(err.response?.data)
                toast.error(err.response?.data, { position: toast.POSITION.BOTTOM_RIGHT })
            })
    }
}
