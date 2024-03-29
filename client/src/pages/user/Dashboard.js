import React from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
import { useAuth } from '../../context/auth'
const Dashboard = () => {
  const [auth]=useAuth()
  return (
    <Layout title={"Dashbord"}>
         <div className="container-fluid m-3 p-3">
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                    <div className="card w-75 p-3">
              <h1>User name: {auth?.user?.name}</h1>
              <h3>User email: {auth?.user?.email}</h3>
              <h3>User phone: {auth?.user?.phone}</h3>
            </div>
                    </div>
                </div>
            </div>
    </Layout>
    
  )
}

export default Dashboard