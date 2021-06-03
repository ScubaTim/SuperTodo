export const url = "http://localhost:5000/api"

export const setHeaders = () => {
    const Header = {
        headers: {
            "x-auth-token": localStorage.getItem("token")
        }
    }

    return Header
}