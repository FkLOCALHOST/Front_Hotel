import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from "../../components/login/Login.jsx"
import Register from "../../components/login/Register.jsx"


const authPage = () => {
    const [isLogin, setIsLogin] = useState(true)
    const navigate = useNavigate()

    const handleAuthPageToggle = () => {
        setIsLogin((prevState) => !prevState)
    }

    const handleLoginSuccess = () => {
        navigate("/dashboard")
    }

    return (
        <div className="login-page-container">
          <div className="auth-card">
            {isLogin ? (
              <Login
                switchAuthHandler={handleAuthPageToggle} 
                onLoginSuccess={handleLoginSuccess} 
              />
            ) : (
              <Register switchAuthHandler={handleAuthPageToggle} />
            )}
          </div>
        </div>
    );
};

export default authPage
