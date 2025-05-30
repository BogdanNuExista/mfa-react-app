import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebaseConfig';
import { 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword
} from "firebase/auth";
import { clearUserSecret } from '../services/qrAuthService'; // Import the new function

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMfaVerified, setIsMfaVerified] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setIsMfaVerified(false); // Reset MFA status on auth state change
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        setIsMfaVerified(false); // Reset MFA status on login
        return await signInWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = async () => {
        setIsMfaVerified(false); // Reset MFA status on login
        const provider = new GoogleAuthProvider();
        return await signInWithPopup(auth, provider);
    };

    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        // Clear user's secret before logging out if there's a current user
        if (currentUser && currentUser.email) {
            clearUserSecret(currentUser.email);
        }
        
        setIsMfaVerified(false);
        return await signOut(auth);
    };

    const completeMfaVerification = () => {
        setIsMfaVerified(true);
    };

    const isAuthenticated = () => {
        return currentUser !== null;
    };

    const value = {
        currentUser,
        isMfaVerified,
        login,
        loginWithGoogle,
        registerUser,
        logout,
        isAuthenticated,
        completeMfaVerification
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};