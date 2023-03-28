import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

import { authServiceFactory } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const navigate = useNavigate();

    const authService = authServiceFactory(auth.accessToken);

    const onLoginSubmit = async (loginFormData) => {
        try {
            const user = await authService.login(loginFormData);

            setAuth(user);
            navigate('/catalog');
        } catch (error) {
            console.log('Please check your email or password');
        }
    }

    const onRegisterSubmit = async (registerFormData) => {
        const { confirmPassword, ...registerData } = registerFormData

        if (confirmPassword !== registerData.password) {
            return;
        }

        try {
            const user = await authService.register(registerData);

            setAuth(user);

            navigate('/catalog');
        } catch (error) {
            console.log('There is a problem');
        }
    }

    const onLogout = async () => {
        await authService.logout();

        setAuth({});
    };

    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
};