const todoReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [action.todo.data, ...state]
        case "GET_TODOS":
            return action.todos.data
        default:
            return state
    }
}

export default todoReducer