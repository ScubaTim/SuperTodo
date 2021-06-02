import axios from 'axios'
import { url } from '../../api'

export const addTodo = (todo) => {
    return (dispatch, getState) => {
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
            })
    }
}

export const getTodos = () => {
    return (dispatch, getState) => {
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