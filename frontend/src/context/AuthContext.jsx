import { createContext, useContext } from 'react';
import { useAuth } from '../controllers/authController.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const authLogic = useAuth();
    return (
        <AuthContext.Provider value={authLogic}>
        {!authLogic.loading && children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);