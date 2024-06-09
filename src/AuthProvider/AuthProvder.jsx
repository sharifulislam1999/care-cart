import { FacebookAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from './../Firebase/firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
import usePublic from "../Hooks/usePublic";

export const MyContext = createContext(null);
const AuthProvder = ({children}) => {
    const axiosPublic = usePublic();
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true);

    const signUp = (email,password)=>{
        setLoading(true)
       return createUserWithEmailAndPassword(auth,email,password)
    }
    const popSign = (dependency)=>{
        if(dependency === 'google'){
            return signInWithPopup(auth,new GoogleAuthProvider());
        }else{
            return signInWithPopup(auth,new FacebookAuthProvider());
        }
    }
    const signIn = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const handleLogOut = ()=>{
        setLoading(true)
        return signOut(auth);
    }

    useEffect(()=>{
        // setLoading(true)
        const unSubscribe = onAuthStateChanged(auth,currentUser=>{
                setUser(currentUser);
                if(currentUser){
                    axiosPublic.post('/jwt',{email:currentUser.email})
                    .then(res=>{
                        if(res.data.token){
                            localStorage.setItem('jwt_token',res.data.token);
                            setLoading(false)
                        }
                    })
                }else{
                    localStorage.removeItem('jwt_token');
                    setLoading(false)
                }
                // setLoading(false)
            });
        return ()=> unSubscribe();
    },[])
    const authInfo = {
        signUp,
        user,
        popSign,
        signIn,
        loading,
        handleLogOut
    }
    return (
        <MyContext.Provider value={authInfo}>
            {children}
        </MyContext.Provider>
    );
};

export default AuthProvder;