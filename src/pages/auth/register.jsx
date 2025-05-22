import React, { useState } from 'react'
import Register from '../../components/auth/registerCard'

export const register = () => {
    const [isregister, setIsRegister] = useState(true);
  return (
    <div>
        <div>
            <Register />
        </div>
    </div>
  )
}

export default register;
