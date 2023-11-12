import React, { useState, useEffect } from 'react';
import HeaderClient from '../HeaderClient';
import Footer from '../Welcome/Footer/footer';
import './styled.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { Form } from "antd";


const CheckOut = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [checkOutInput, setCheckOutInput] = useState({
        user_name: '',
        address: '',
        email: '',
        phone: '',
        note: '',
        payment_method: '',
        subtotal: '',
        total: '',
    });
    const [errors, setErrors] = useState([]);
    const [form] = Form.useForm()
    let totalOrderPrice = 0;

    const onSelectPaymentMethod = (method) => {
        setPaymentMethod(method)
    }

    if (!localStorage.getItem('auth_token')) {
        navigate('/');
        swal('Warning', 'Login to come to Shopping Cart page', 'Warning')
    }

    useEffect(() => {
        let isMounted = true;
        axios.get(`api/client/v1/shopping-cart`).then((res) => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setCart(res.data.cartItems)
                    setLoading(false)
                } else if (res.data.status === 401) {
                    navigate('/home');
                    swal("Warning", res.data.message, "Warning")
                }
            }
        })
        return () => {
            isMounted = false
        }
    }, [navigate])

    if (loading) {
        return (
            <h2>Loading Check Out...</h2>
        )
    }

    const handleInput = (e) => {
        setCheckOutInput({ ...checkOutInput, [e.target.name]: e.target.value })
    }

    const submitOrder = async () => {

        const data = {
            user_name: localStorage.getItem("auth_name"),
            address: checkOutInput.address,
            email: localStorage.getItem("auth_email"),
            phone: checkOutInput.phone,
            note: checkOutInput.note,
            payment_method: paymentMethod,
            subtotal: totalOrderPrice,
            total: totalOrderPrice
        }
        axios.post(`/api/client/v1/place-order`, data).then((res) => {
            if (res.data.status === 200) {
                swal('Order Successfully', res.data.message, 'Success')
                setErrors([]);
                navigate('/home')
            } else if (res.data.status === 422) {
                setErrors(res.data.errors)
            }
        })

    }
    const backtoCart = () => {
        navigate('/shopping-cart')
    }

    return (
        <div>
            <HeaderClient />
            <div className="wrapper-content"><p className="animate__animated animate__pulse animate__infinite">Check Out</p>
            </div>
            <div className='bill-detail'>Billing Details</div>
            <div className='row g-0 order-container '>

                <div className='col-sm-6 col-md-7 order-information' form={form}>
                    <div>
                        <label htmlFor="name" className="form-label">Custumer Name<span>*</span></label>
                        <input name='user_name' disabled={true} className="form-control " id="name" value={localStorage.getItem('auth_name')} onChange={(e) => handleInput(e)} />
                    </div>
                    <div>
                        <label htmlFor="adress" className="form-label">Adress<span>*</span></label>
                        <input name='address' className="form-control" id="adress" onChange={(e) => handleInput(e)} value={checkOutInput.address} />
                        <small style={{ color: "red" }}>{errors.address}</small>
                    </div>
                    <div className='email-phone'>
                        <div >
                            <label htmlFor="email" className="form-label">Email<span>*</span></label>
                            <input name='email' disabled={true} className="form-control " id="email" value={localStorage.getItem('auth_email')} onChange={(e) => handleInput(e)} />
                            <small style={{ color: "red" }}>{errors.email}</small>
                        </div>
                        <div>
                            <label htmlFor="phone" className="form-label">Phone<span>*</span></label>
                            <input name='phone' className="form-control" id="phone" onChange={(e) => handleInput(e)} value={checkOutInput.phone} />
                            <small style={{ color: "red" }}>{errors.phone}</small>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="note" className="form-label">Note</label>
                        <input name='note' className="form-control " id="note" onChange={(e) => handleInput(e)} value={checkOutInput.note} />
                        <small style={{ color: "red" }}>{errors.note}</small>
                    </div>

                </div>

                <div className='col-6 col-md-5 order-checkout'>
                    <div className='frame-outside' >
                        <div className='title'>
                            Your Order
                        </div>
                        <div className='content'>
                            <div className='first-title'>
                                <div className='name-title' >
                                    <div className='product-title'>
                                        Products
                                    </div>
                                    {cart && cart.length > 0 && cart.map((items, index) => {
                                        return (
                                            <div className='product-list' key={index}>
                                                {items.name}
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='name-title'>
                                    <div className='product-title'>
                                        Total
                                    </div>
                                    {cart && cart.length > 0 && cart.map((items, index) => {
                                        totalOrderPrice += items.price * items.quantity
                                        return (
                                            <div className='product-price'>
                                                ${items.price * items.quantity}.00
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='subtotal'>
                            <div >
                                Subtotal
                            </div>
                            <div>
                                ${totalOrderPrice}.00
                            </div>
                        </div>
                        <div className='total'>
                            <div>
                                Total
                            </div>
                            <div style={{ color: "red" }}>
                                ${totalOrderPrice}.00
                            </div>
                        </div>
                        <div className='content-checkout'>Lorem ipsum dolor sit amet, consectetur adip elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>

                        <div className='payment-method'>
                            <ul>
                                <li>
                                    <input type='checkbox' id='checkbox-1' checked={paymentMethod === "cash"} onChange={() => onSelectPaymentMethod("cash")} />
                                    <label htmlFor="checkbox-1" className='checkbox'>Pay by cash<span>*</span></label>
                                </li>
                                <li>
                                    <input type='checkbox' id='checkbox-2' checked={paymentMethod === "vn"} onChange={() => onSelectPaymentMethod("vn")} />
                                    <label htmlFor="checkbox-2" className='checkbox'>Pay by VNpay<span>*</span></label>
                                    <small style={{ color: "red" }}>{errors.payment_method}</small>
                                </li>
                            </ul>
                        </div>
                        <button onClick={() => { submitOrder() }}>Place Order</button>
                        <button onClick={() => { backtoCart() }} >Back to Cart</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default CheckOut;