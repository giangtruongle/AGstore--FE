import React from 'react';
import './footer.scss';
import logo from '../../../assets/logo_light.webp';
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter, FaLocationDot, FaEnvelope, FaMobileScreenButton } from "react-icons/fa6";
import visa from '../../../assets/payment_method/visa-1.webp';
import discover from '../../../assets/payment_method/discover-1.webp';
import papal from '../../../assets/payment_method/paypal-1.webp';
import master_cart from '../../../assets/payment_method/master_card-1.webp';

const Footer = () => {
    return (
        <div>
            <div className="container-contact">
                <div className="row container-contact-links">
                    <div className='col-1'>
                        <div className="" >
                            <img src={logo} />
                            <p>If you are going to use of Lorem Ipsum need to be sure there isn't hidden of text</p>
                        </div>
                        <div className="wraper-icons">
                            <div className="col-3 social-icon" >
                                <FaFacebookF style={{ margin: 4 }} className="facebook" />
                            </div>
                            <div className="col-3 social-icon">
                                <FaInstagram style={{ margin: 4 }} className="instagram" />
                            </div >

                            <div className="col-3 social-icon">
                                <FaTiktok style={{ margin: 4 }} className="tiktok" />
                            </div>
                            <div className="col-3 social-icon">
                                <FaTwitter style={{ margin: 4 }} className="twitter" />
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="content-2">
                            <h5>Shopping Guide</h5>
                            <ul>
                                <li>How to Purchase</li>
                                <li>General Information</li>
                                <li>Payment</li>
                                <li>Exchange and Return</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="">
                            <h5>Category</h5>
                            <ul>
                                <li>T-shirt</li>
                                <li>Jeans</li>
                                <li>Clothing</li>
                                <li>Coats</li>
                                <li>Jackets</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="">
                            <h5>Our Policy</h5>
                            <ul>
                                <li>Privacy Policy</li>
                                <li>Shipping Policy</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="">
                            <h5>Contact Infor</h5>
                            <ul>
                                <li><FaLocationDot style={{ marginRight: 4 }} />123 Street, Old Trafford, New South London, UK</li>
                                <li><FaEnvelope style={{ marginRight: 10 }} />Infor@mrsimple.com</li>
                                <li><FaMobileScreenButton style={{ marginRight: 4 }} />+124 258 786 99</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='footer-end'>
                    <div className='end-left'>
                        <span>Copyright 2022.KlbTheme . All rights reserved</span>
                    </div>
                    <div className='end-right'>
                        <ul>
                            <li><img src={visa} alt="" /></li>
                            <li><img src={papal} alt="" /></li>
                            <li><img src={discover} alt="" /></li>
                            <li><img src={master_cart} alt="" /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;
