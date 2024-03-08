import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layouts/AdminMenu'
import Layout from '../../components/layouts/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from "react-router-dom";

const Products = () => {
    const [product, setProducts] = useState([])
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/products/get-product")
            setProducts(data.products)
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }
    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <Layout>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All products list</h1>
                    <div className='d-flex'>

                        {product?.map((p) => (
                            <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                                <div className="card m-3" style={{ width: '18rem' }} >
                                    <img src={`/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                    </div>
                                </div>
                            </Link>
                        ))}


                    </div>

                </div>
            </div>
        </Layout>

    )
}

export default Products