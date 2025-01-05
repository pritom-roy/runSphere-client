import { AuthContext } from './AuthContext';
import PropTypes from 'prop-types';
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import axios from 'axios';


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const updateInfo = (obj) => {
        if (!auth.currentUser) return Promise.reject("No user logged in");
        return updateProfile(auth.currentUser, obj)
            .then(() => auth.currentUser.reload())
            .then(() => {
                setUser({ ...auth.currentUser });
            });
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleSignin = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser?.email) {
                setUser(currentUser);
                const user = { email: currentUser.email };

                axios.post('https://run-sphere-server.vercel.app/jwt', user, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                        setLoading(false);
                    })
            } else {
                axios.post('https://run-sphere-server.vercel.app/logout', {}, {
                    withCredentials: true
                }).then(res => {
                    console.log(res.data);
                    setLoading(false);
                });
                setUser(null);
            }
        });

        return () => {
            unSubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ createUser, user, logOut, loginUser, loading, setUser, googleSignin, updateInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default AuthProvider;
