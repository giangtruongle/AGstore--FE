import React, { useState, useEffect } from 'react';
import HeaderClient from '../HeaderClient';
import Footer from '../Welcome/Footer/footer';
import './styled.scss';
import 'animate.css';
import { FaStar, FaStarHalfStroke, FaMinus, FaPlus } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { FaCartShopping, FaHeart, FaHouseChimney, FaCartPlus, FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa6";
import RelatedProducts from '../RelatedProducts';


const DEFAULT_PRODUCT = {
    id: '', name: "", slug: "", price: "", original_price: "", description: "",
    quantity: "", image_url: "", status: "", size: "",
    product_category_id: ""
}

const ShopDetail = () => {
    const navigate = useNavigate();
    const [productDetail, setProductDetail] = useState(DEFAULT_PRODUCT);
    const [quantityOrder, setQuantityOrder] = useState(1);
    const [chooseSize, setChooseSize] = useState(null);
    const [loading, setLoading] = useState(true)

    const { arrivalId } = useParams();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/client/v1/list_products/${arrivalId}`).then((res) => {
            setProductDetail(res.data);
            setLoading(false)
        })

    }, [arrivalId, navigate])
    if (loading) {
        return <h1>Loading Product Details....</h1>
    }

    const onSelectSize = (size) => {
        setChooseSize(size);
    }

    const handleIncrement = () => {
        if (quantityOrder < 25) {
            setQuantityOrder(prevCount => prevCount + 1)
        }
    }

    const handleDecrement = () => {
        if (quantityOrder > 1) {
            setQuantityOrder(prevCount => prevCount - 1)
        }
    }

    const submitAddToCart = () => {
        const items = {
            product_id: productDetail.id,
            name: productDetail.name,
            price: productDetail.price,
            quantity: quantityOrder,
            size: chooseSize,
            image_product: productDetail.image_url,
        }
        axios.post(`api/client/v1/add-to-cart`, items).then((res) => {
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
        <div>
            <>
                <HeaderClient />
                <div className="wrapper-content"><p className="animate__animated animate__pulse animate__infinite">Product Details</p></div>
                <div className="row shop-detail">
                    <div className="col-md-6 shop-detail-picture"  >
                        <img src={productDetail.image_url} alt="" />
                    </div>
                    <div className="col-md-6 shop-detail-content">
                        <h1 className="title">{productDetail.name}</h1>
                        <h5 className="icon-review"><FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalfStroke />
                            <span className="number-review"> (14 reviews)</span>
                        </h5>
                        <h2 className="price">${productDetail.price}.00
                            <s >${productDetail.original_price}.00</s>
                        </h2>
                        <p className="description">
                            {productDetail.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Phasellus blandit massa enim.
                            Nullam id varius nunc id varius nunc.
                        </p>
                        <div className="size">
                            <h5 className="title-size">Size</h5>
                            <span className="cross" ></span>
                            <ul className="wraper-size">
                                <li>
                                    <input checked={chooseSize === "S"} type="checkbox" id="checkbox-1" onChange={() => onSelectSize("S")} />
                                    <label htmlFor="checkbox-1" className="select-size">S</label>
                                </li>
                                <li>
                                    <input checked={chooseSize === "M"} type="checkbox" id="checkbox-2" onChange={() => onSelectSize("M")} />
                                    <label htmlFor="checkbox-2" className="select-size">M</label>
                                </li>
                                <li>
                                    <input checked={chooseSize === "L"} type="checkbox" id="checkbox-3" onChange={() => onSelectSize("L")} />
                                    <label htmlFor="checkbox-3" className="select-size">L</label>
                                </li>
                                <li>
                                    <input checked={chooseSize === "XL"} type="checkbox" id="checkbox-4" onChange={() => onSelectSize("XL")} />
                                    <label htmlFor="checkbox-4" className="select-size">XL</label>
                                </li>
                            </ul>
                            <span className="cross"></span>
                        </div>
                        <h6 className="status">Status: <span>{productDetail.status === 1 ? 'In Stock' : 'Out of Stock'}</span></h6>
                        {productDetail.status === 1 &&
                            <div className="quantity">
                                <h5 className="title-quantity">Quantity:</h5>
                                <div className="select-quantity">
                                    <FaMinus className="icon-quantity" onClick={() => { handleDecrement() }} />
                                    <span>{quantityOrder}</span>
                                    <FaPlus onClick={() => { handleIncrement() }} className="icon-quantity" />
                                </div>
                            </div>
                        }
                        <div className='container-btn-action'>
                            {productDetail.status === 1 ?
                                <button className="add-cart" onClick={() => { submitAddToCart() }}><FaCartPlus /></button>
                                : <span></span>
                            }
                            <FaHeart className="add-wish-list" />
                            <FaCartShopping className="go-to-cart" onClick={() => navigate('/shopping-cart')} />
                            <FaHouseChimney className="go-to-home" onClick={() => navigate('/home')} />
                        </div>
                        <div className='share-social-media'>
                            <p>Share:</p>
                            <span><FaFacebook className='facebook' /></span>
                            <span><FaInstagram className='instagram' /></span>
                            <span><FaTiktok className='tiktok' /></span>
                            <span><FaTwitter className='twitter' /></span>
                        </div>
                    </div>
                    <div className='discription-box'>
                        <div className='description-box-nav-box'>Description</div>
                        <hr />
                        <div className='description-box-description'>
                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                                Vivamus bibendum magna Lorem ipsum dolor sit amet, consectetur adipiscing elit.Contrary to popular belief, Lorem Ipsum is not simply random text.
                                It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                                <br />
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,
                                similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                            </p>
                        </div>
                    </div>
                    <hr style={{ marginLeft: -20 }} />
                </div>
                <RelatedProducts loading={loading} />
                <Footer />
            </>
        </div >
    )
}
export default ShopDetail;