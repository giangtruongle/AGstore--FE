import React from 'react';
import './newArrival.scss';
import { FaRegHeart, FaSeedling, FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import axios from 'axios';

const NewArrival = (props) => {
    const navigate = useNavigate()
    const addToCart = async (id) => {

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
    return (
        <div className="new-arrival-wrapper" >
            <h1 className="new-arrival-title">New Products</h1>
            <ul className="new-arrval-list uk-grid-small uk-child-width-1-2 uk-child-width-1-4@s" uk-sortable="handle: .uk-card" uk-grid="true" >
                {props.newArrival && props.newArrival.length > 0 && props.newArrival.map((item, index) => {
                    return (
                        <li className="featured__item" key={index}>
                            <div className="new-arrval-items uk-card uk-card-default uk-card-body uk-text-center" >
                                <div className="featured__item__pic" >
                                    <img src={item.image_url} alt="" />
                                    <ul className="featured__item__pic__hover">
                                        <li><Link><FaRegHeart className="icon" style={{ fontSize: 17 }} /></Link></li>
                                        <li><Link><FaSeedling onClick={() => { navigate(`/detail/product/${item.id}`) }} className="icon" style={{ fontSize: 17 }} /></Link></li>
                                        <li><Link><FaCartShopping onClick={() => { addToCart(item.id) }} className="icon" style={{ fontSize: 17 }} /></Link></li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6 className="title" onClick={() => { navigate(`/detail/product/${item.id}`) }}>{item.name}</h6>
                                    <div className="price">
                                        <h5 className="price-sale">${item.price}.00</h5>
                                        <s>${item.original_price}.00</s>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })
                }
            </ul>
        </div>
    )
}
export default NewArrival;