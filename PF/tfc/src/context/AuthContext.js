import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
    let navigate = useNavigate();
    const [authTokens, setAuthTokens] = useState( () => 
        localStorage.getItem("authTokens") 
        ? JSON.parse(localStorage.getItem("authTokens")) : null
    );
    
    const [user, setUser] = useState( () =>
        localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")) : null);

    const [loading, setLoading] = useState(true);
    const [incorrectCreds, setIncorrectCreds] = useState(false);
    const { BACKEND_URL } = process.env;
    const loginUser = async (email, password) => {
        setIncorrectCreds(true);

        const res = await fetch("http://127.0.0.1:8000"+ "/user/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const data = await res.json();
        setIncorrectCreds(true);
        if (res.status === 200) {
            setAuthTokens(data.token);

            if (data.token) {
                setAuthTokens(data.token);
                localStorage.setItem("authTokens", JSON.stringify(data.token));
                navigate('/account');
            } else {
                alert("Something went wrong. Please try again later.");
            }
        } else {
            setIncorrectCreds(true);
            console.log("Incorrect credentials");
        }
        loadUser();
    };

    const loadUser = async () => {
        const res = await fetch('http://localhost:8000/user/profile/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + authTokens
            }
        })
        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
    }


    useEffect(() => {
        if (authTokens) {
            setLoading(false);
        }
        setLoading(false);
    }, [authTokens, loading]);

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        loginUser,
        loading,
        setLoading,
        incorrectCreds,
        setIncorrectCreds,
        loadUser
    };
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <h1>Loading...</h1> : children}
        </AuthContext.Provider>
    );
}

