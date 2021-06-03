import { toast } from 'react-toastify'
import jwtDecode from 'jwt-decode'

const initialState = {
    token: localStorage.getItem("token"),
    name: null,
    email: null,
    _id: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_LOADED":
        case "SIGN_UP":
            toast("Welcome to SuperTodo!", { position: toast.POSITION.BOTTOM_RIGHT })
            const user = jwtDecode(action.token)
            console.log('user', user)
            console.log('action', action)
            return {
                ...initialState,
                token: action.token,
                name: user.name,
                email: user.email,
                _id: user._id
            }
        default:
            return state
    }
}

export default authReducer