import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ViewCategory.scss';
import { Link } from 'react-router-dom';
import Header from '../Welcome/Header/header';
import HeaderClient from '../HeaderClient/index'
import Footer from '../Welcome/Footer/footer'

const ViewCategory = () => {

    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        axios.get(`api/getCategory`).then((res) => {
            if (res.data.status === 200) {
                // console.log(res.data.category)
                setCategory(res.data.category);
                setLoading(false)
            }
        });
    }, []);

    if (loading) {
        return <h2>Loading Category...</h2>
    } else {
        var showCategoryList = '';
        showCategoryList = category.map((item, index) => {
            return (
                <div className='col-md-4' key={index} >
                    <div className='card'>
                        <div className='card-img'>
                            <Link to={`/collections/${item.slug}`}>
                                <img src={item.image_url_pc} alt={item.name} className='w-100' />
                            </Link>
                        </div>
                        <div className='card-body'>
                            <Link to={`/collections/${item.slug}`}>
                                <h5>{item.name}</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            {localStorage.getItem('auth_token') ?
                <HeaderClient /> : <Header />}
            <div className='py-3'>
                <div className='container'>
                    <h6>Product Categories</h6>
                </div>
            </div>
            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        {showCategoryList}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ViewCategory;