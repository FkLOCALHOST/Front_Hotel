import React, { useState }  from 'react'
import Login from "../../components/auth/loginCard";

const login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <div>
        <Login />
    </div>
    </div>
    
  );
};

export default login;
