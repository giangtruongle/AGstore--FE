import React, { useEffect, useState } from 'react';
import HeaderClient from '../HeaderClient';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import './styled.scss';
import { FaTrashCan, FaMinus, FaPlus } from "react-icons/fa6";
import Footer from '../Welcome/Footer/footer';
import { Modal } from 'antd';
import empty_cart from '../../assets/empty-cart.png'

const ShoppingCart = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    let cartTotal = 0;

    if (!localStorage.getItem('auth_token')) {
        navigate('/');
        swal('Warning', 'Login to come to Shopping Cart page', 'Warning')
    }

    const fetchData = () => {
        setLoading(true)
        axios.get(`api/client/v1/shopping-cart`).then((res) => {
            setCart(res.data.cartItems);
            setLoading(false)
        })
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
            <h2 className='loading'>Loading Shopping Cart...</h2>
        )
    }

    const handleQuantityInscrement = (cart_id) => {
        setCart(cart =>
            cart.map((item) =>
                cart_id === item.id ? { ...item, quantity: item.quantity + (item.quantity < 25 ? 1 : 0) } : item
            )
        )
        updateQuantityOrder(cart_id, 'insc')
    }
    const handleQuantityDescrement = (cart_id) => {
        setCart(cart =>
            cart.map((item) =>
                cart_id === item.id ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) } : item
            )
        )
        updateQuantityOrder(cart_id, 'desc')
    }

    const updateQuantityOrder = (cart_id, scope) => {
        axios.put(`api/client/v1/cart-updateQuantity/${cart_id}/${scope}`).then((res) => {
            if (res.data.status === 200) {
                // swal('Success', res.data.message, 'Success');
            }
        })
    }

    const deleteCartItem = (e, id) => {

        const thisClick = e.currentTarget
        thisClick.innerText = "Removing...";

        Modal.confirm({
            title: "Are you sure?",
            content: `This Cart will be removed`,

            onOk() {
                axios.delete(`/api/client/v1/delete-cart-item/${id}`).then((res) => {
                    if (res.data.status === 200) {
                        swal('Success', res.data.message, 'Success')
                        thisClick.closest("tr").remove();
                        fetchData()

                    } else if (res.data.status === 404) {
                        swal('Error', res.data.message, 'Error')
                        thisClick.innerText = "Remove"
                    }
                })
            }
        })
    }
    const moveToCheckOut = () => {
        navigate('/check-out');
    }

    return (
        <>
            <HeaderClient />
            <div className="wrapper-content"><p>Shopping Cart</p></div>
            <div className="waraper-container">
                <div className="content">
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='cart-data-table'>
                                <tr className='cart-title' height='100px'>
                                    <th width='45%'>Product Name</th>
                                    <th width='10%'>Size</th>
                                    <th width='10%'>Price</th>
                                    <th width='20%'>Quantity</th>
                                    <th width='15%'>Total Price</th>
                                    <th width='10%'>Remove</th>
                                </tr>
                                {cart && cart.length > 0 ?
                                    <>
                                        {cart.map((items, index) => {
                                            cartTotal += items.price * items.quantity;
                                            return (
                                                <tr className='cart-data' height='180px' key={index}>
                                                    <td width='45%' >
                                                        <img src={items.image_url} alt={items.name} width="110px" height="150px" />
                                                        <span>{items.name}</span>
                                                    </td>
                                                    <td width='10%' >{items.size}</td>
                                                    <td width='10%' >{items.price}</td>
                                                    <td width='15%' className='total-quatity' >
                                                        <span className='qty'>
                                                            <FaMinus onClick={() => { handleQuantityDescrement(items.id) }} className='edit-qty' />
                                                            <span>{items.quantity}</span>
                                                            <FaPlus onClick={() => { handleQuantityInscrement(items.id) }} className='edit-qty' />
                                                        </span>
                                                    </td>
                                                    <td width='15%'  >
                                                        <span>${items.price * items.quantity}.00</span>
                                                    </td>
                                                    <td width='' ><FaTrashCan onClick={(e) => { deleteCartItem(e, items.id) }} className='delete-icon' /></td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <div className='cart-empty'>
                                        <div className='cart-empty-title'><img src={empty_cart} alt="" />No products in the cart.</div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='row'>
                    <div className='col-md-6'>

                        <div className='continute-shopping'>
                            <button style={{ background: '#006266' }} onClick={() => navigate('/home')}>Home</button>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='cart-total'>
                            <div className='title'>
                                Cart total
                            </div>
                            <div className='total-total'>
                                <h3>Total</h3>
                                <span>${cartTotal}.00</span>
                            </div>
                            <button onClick={() => { moveToCheckOut() }} >Proceed to check out</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default ShoppingCart;