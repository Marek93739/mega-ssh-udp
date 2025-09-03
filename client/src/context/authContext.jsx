import { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from '../firebase/auth.config'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const auth = getAuth(app)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, userDATA => {
            setUser(userDATA)
            setLoading(false)
        })
        return unsub
    }, [auth])

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);