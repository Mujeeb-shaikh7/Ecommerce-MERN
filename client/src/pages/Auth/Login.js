import React, { useState } from 'react'
import Layout from '../../components/layouts/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import '../../styles/AuthStyles.css'
const Login = () => {
 
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [auth,setAuth]=useAuth()
    const navigate=useNavigate();
    let handleInput=async(e)=>{
        e.preventDefault();
        try {
            const res=await axios.post(
                '/api/v1/auth/login',
                {email,password}
            );
            if(res.data.success){
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token
                })
                localStorage.setItem('auth',JSON.stringify(res.data))
                navigate('/')
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    return (
        <Layout title={"Register page"}>
            <div className='form-container'>
                <h1>Login</h1>
                <form onSubmit={handleInput}>
                   
                    <div className="mb-3">
                        
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="form-control" id="email" placeholder='email' />
                        
                    </div>
                    <div className="mb-3">
    
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="form-control" id="password" placeholder='password' />
                    </div>
                    
                    <button type="submit"  className="btn btn-primary">Submit</button>
                </form>

            </div>


        </Layout>
    )
}

export default Login