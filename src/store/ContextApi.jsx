import {createContext, useContext, useEffect, useState} from "react";
import axiosInstance from "../services/api.jsx";

const ContextApi = createContext(null);

export const ContextProvider = ({ children }) => {
    // TODO: Find the token in local storage
    const getToken = localStorage.getItem("JWT_TOKEN") || null

    // TODO: Find user status from the local storage
    const isADmin = localStorage.getItem("IS_ADMIN") || false

    // TODO: Store the token, Handle sidebar opening and closing of the admin panel,
    //       Check the logged in user is admin or not
    const [token, setToken] = useState(getToken)
    const [currentUser, setCurrentUser] = useState(null)
    const [openSidebar, setOpenSidebar] = useState(true)
    const [isAdmin, setIsAdmin] = useState(isADmin)

    const fetchUser = async () => {
        const user = JSON.parse(localStorage.getItem("USER"))
        if (user?.username) {
            try {
                const { data } = await axiosInstance.get(`/auth/user`)
                const roles = data.roles

                if (roles.includes("ROLE_ADMIN")) {
                    localStorage.setItem("IS_ADMIN", JSON.stringify(true))
                    setIsAdmin(true)
                }
                else {
                    localStorage.removeItem("IS_ADMIN")
                    setIsAdmin(false)
                }
                setCurrentUser(data)
            }
            catch (error) {
                console.error("Failed fetching current user", error)
                // TODO: use toast or any UI Component
            }
        }
    }

    // TODO: Token exist -> Fetch the current user
    useEffect(() => {
        if (token) {
            fetchUser()
        }
    }, [token])

    // TODO: Through context provider, sending all data(s) as such we could access it anytime
    return (
        <ContextApi.Provider
            value={{
                token,
                setToken,
                currentUser,
                setCurrentUser,
                openSidebar,
                setOpenSidebar,
                isAdmin,
                setIsAdmin
            }}
        >{ children }</ContextApi.Provider>
    )
}

// TODO: By using (useMyContext) custom hook, this could reach our context provider and access
export const useMyContext = () => {
    return useContext(ContextApi)
}