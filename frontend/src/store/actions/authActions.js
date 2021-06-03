import axios from 'axios'
import { url } from '../../api'
import { toast } from 'react-toastify'

export const signUp = (user) => {
    return (dispatch) => {
        axios
            .post(`${url}/signup`, user)
            .then(token => {

                localStorage.setItem("token", token.data)

                dispatch({
                    type: "SIGN_UP",
                    token: token.data
                })
            })
            .catch(err => {
                console.log(err.response)
                toast.error(err.response?.data, { position: toast.POSITION.BOTTOM_RIGHT })
            })
    }
}

// export const signOut = (user) => {
//     return (dispatch) => {

//     }
// }

// export const signIn = () => {
//     return (dispatch) => {

//     }
// }