import React, { useState } from 'react'
import Layout from '../../components/layouts/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import '../../styles/AuthStyles.css'
const Forgotpassword = () => {
    
    const [email,setEmail] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [answer,setAnswer] = useState('');

    const navigate=useNavigate();

    let handleInput=async(e)=>{
        e.preventDefault();
        try {
            const res=await axios.post(
                '/api/v1/auth/forgot-password',
                {email,newPassword,answer}
            );
            if(res.data.success){
                toast.success(res.data.message);
              
                
                navigate('/login')
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
  return (
    <Layout title={"Forgotpassword"}>
           <div className='form-container'>
                <h1>Forgot Password</h1>
                <form onSubmit={handleInput}>
                   
                    <div className="mb-3">
                        
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="form-control" id="email" placeholder='email' />
                        
                    </div>
                    <div className="mb-3">
    
                        <input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required className="form-control" id="password" placeholder='password' />
                    </div>
                    <div className="mb-3">
                        
                        <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)} required className="form-control" id="email" placeholder='What is your nickname' />
                        
                    </div>
                    <div className='mb-3'>
                    <button type="submit"  className="btn btn-primary">Reset</button>
                   
                    </div>
                    
                </form>

            </div>


    </Layout>
    
  )
}

export default Forgotpassword