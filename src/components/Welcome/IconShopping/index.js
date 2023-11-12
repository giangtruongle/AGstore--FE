import React, { useEffect, useState } from "react";
import './styled.scss';
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const IconShopping = (props) => {

    const navigate2 = useNavigate();
    const [cartTotal, setCartTotal] = useState([])
    const [loading, setLoading] = useState(false)

    let totalItems = 0;

    useEffect(() => {
        setLoading(true)
        if (localStorage.getItem('auth_token')) {
            axios.get(`api/client/v1/shopping-cart`).then((res) => {
                if (res.data.status === 200) {
                    setCartTotal(res.data.cartItems)
                    setLoading(false)
                } else if (res.data.status === 401) {
                    swal("Warning", res.data.message, "Warning")
                }
            })
        } else {
            return
        }
    }, [])

    return (
        <div className=" waraper-cart" >
            <div className=" cart-icon">
                <FaHeart className="heart" />
                <div className="count-cart">0</div>
            </div>
            <div className="cart-icon">
                <FaCartShopping className="cart" onClick={() => { navigate2('/shopping-cart') }} />
                {cartTotal && cartTotal.length > 0 && cartTotal.map((items, index) => {
                    totalItems += cartTotal[index].quantity
                })}
                <div className="count-cart">{totalItems}</div>
            </div>
        </div>
    );
}
export default IconShopping;