import React, { useState } from 'react'
import Layout from '../../components/layouts/Layout'

const Register = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    return (
        <Layout title={"Register page"}>
            <div className='register'>
                <h1>Register</h1>
                <form>
                    <div className="mb-3">
                        
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="name" placeholder='name' />
                        
                    </div>
                    <div className="mb-3">
                        
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="email" placeholder='email' />
                        
                    </div>
                    <div className="mb-3">
    
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="password" placeholder='password' />
                    </div>
                    <div className="mb-3">
                        
                        <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control" id="phone" placeholder='phone' maxLength={10} />
                        
                    </div>
                    <div className="mb-3">
                        
                        <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} className="form-control" id="address" placeholder='address' />
                        
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>


        </Layout>
    )
}

export default Register