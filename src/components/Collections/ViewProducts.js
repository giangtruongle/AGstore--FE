import React, { useEffect, useState } from 'react';
import Header from '../Welcome/Header/header';
import Footer from '../Welcome/Footer/footer';
import HeaderClient from '../HeaderClient/index';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import './ViewProducts.scss';
import { FaRegHeart, FaSeedling, FaCartShopping } from "react-icons/fa6";

const ViewProducts = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    const { category_slug } = useParams();

    useEffect(() => {

        axios.get(`api/fetchProducts/${category_slug}`).then((res) => {
            if (res.data.status === 200) {
                setProducts(res.data.product_data.product);
                setCategory(res.data.product_data.category);
                setLoading(false)

            } else if (res.data.status === 404) {
                navigate('/collections');
                swal("Warning", res.data.message, "Warning")

            } else if (res.data.status === 400) {
                swal("Warning", res.data.message, "warning");
            }
        });

    }, [category_slug]);


    const addToCartItem = async (id) => {
        const res = await axios.get(`api/client/v1/list_products/${id}`)
        const data = {
            product_id: res.data.id,
            name: res.data.name,
            price: res.data.price,
            quantity: 1,
            size: 'S',
            image_product: res.data.image_url,
        }
        axios.post(`api/client/v1/add-to-cart`, data).then((res) => {
            if (res.data.status === 201) {
                swal('success', res.data.message, 'success');
            } else if (res.data.status === 409) {
                swal('Warning', res.data.message, 'warning');
            } else if (res.data.status === 401) {
                swal('Error', res.data.message, 'Error');
            } else if (res.data.status === 404) {
                swal('Warning', res.data.message, 'Warning');
            }
        })
    }

    if (loading) {

        return <h2>Loading Products...</h2>

    } else {

        var showProductList = '';
        showProductList = products.map((items, index) => {
            return (
                <div className='col-md-3' key={index}>
                    <div className='card-product'>
                        <div className='card-product-img'>
                            <Link to="">
                                <img src={items.image_url} alt={items.name} className='w-100' />
                            </Link>
                            <ul className='card-product-action'>
                                <li><Link><FaRegHeart className='card-icon' /></Link></li>
                                <li><Link><FaSeedling className='card-icon' onClick={() => { navigate(`/detail/product/${items.id}`) }} /></Link></li>
                                <li><Link><FaCartShopping className='card-icon' onClick={() => { addToCartItem(items.id) }} /></Link></li>
                            </ul>
                        </div>
                        <div className='card-product-body'>
                            <Link to="">
                                <h4 onClick={() => {
                                    navigate(`/detail/product/${items.id}`)
                                }}>{items.name}</h4>
                                <div className='card-product-price'>
                                    <h5>${items.price}.00</h5>
                                    <s>${items.original_price}.00</s>
                                </div>
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
                <div className='container products'>
                    <h6>Products</h6>
                </div>
            </div>
            <div className='py-3'>
                <div className='container products'>
                    <div className='row'>
                        {showProductList}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default ViewProducts;