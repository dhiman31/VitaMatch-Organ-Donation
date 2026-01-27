import React from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    let navigate=useNavigate();
  return (
    <div>
        <form>
            <button>Create account</button>
            <br></br>
            <button onClick={()=>navigate('/login')}>Already have an account</button>
        </form>
    </div>
  )
}

export default Signup