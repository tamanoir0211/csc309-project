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
        if (res.status === 200) {
            if (data.token) {
                localStorage.setItem("authTokens", JSON.stringify(data.token));
                setAuthTokens(data.token);
                console.log(data.token);
                await loadUser();
                navigate('/account');
            } else {
                setIncorrectCreds(true);
                alert("Something went wrong. Please try again later.");
            }
        } else {
            setIncorrectCreds(true);
            console.log("Incorrect credentials");
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        localStorage.removeItem("authTokens");
        localStorage.removeItem("user");
        setUser(null);
        navigate('/');
    }
    const loadUser = async () => {
        const res = await fetch('http://localhost:8000/user/profile/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem('authTokens'))
            }
        })
        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data));
        await setUser(data);
    }

    const updateUser = async (data) => {
        const res = await fetch('http://localhost:8000/user/update/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem('authTokens'))
            },
            body: JSON.stringify(data)
        });
        const out = await res.json();
        return out;
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
        logoutUser,
        updateUser,
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

