import React, { useState } from 'react'
import Layout from '../../components/layouts/Layout'
import {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    const navigate=useNavigate();
    let handleInput=async(e)=>{
        e.preventDefault();
        try {
            const res=await axios.post(
                '/api/v1/auth/register',
                {name,email,password,phone,address}
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
        <Layout title={"Register page"}>
            <div className='register'>
                <h1>Register</h1>
                <form onSubmit={handleInput}>
                    <div className="mb-3">
                        
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required className="form-control" id="name" placeholder='name' />
                        
                    </div>
                    <div className="mb-3">
                        
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="form-control" id="email" placeholder='email' />
                        
                    </div>
                    <div className="mb-3">
    
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="form-control" id="password" placeholder='password' />
                    </div>
                    <div className="mb-3">
                        
                        <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} required className="form-control" id="phone" placeholder='phone' maxLength={10} />
                        
                    </div>
                    <div className="mb-3">
                        
                        <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} required className="form-control" id="address" placeholder='address' />
                        
                    </div>
                    <button type="submit"  className="btn btn-primary">Submit</button>
                </form>

            </div>


        </Layout>
    )
}

export default Register