import React from 'react';
import logo from "./../../../assets/logo.png";
import './contentFirst.scss';
import 'animate.css';


const ContentFirst = () => {
    return (
        <div>
            <div className="row content-first">
                <p className='content-cross'></p>
                <div className="col-md-3 content-brand animate__animated animate__bounce animate__infinite">
                    <h2>Style</h2>
                    <h2>Made</h2>
                    <h1>SIMPLE</h1>
                </div>
                <div className="col-md-3 content-slogan">
                    <p>Americus & Gosani is a clothing and accessories brand inspired by vintage workwear,
                        military surplus and sportswear. With our roots in skateboarding and street culture
                        we take pride in our quality and a timeless approach to design.</p>
                </div>
                <div className="col-md-3 ">

                    <img src={logo} alt="" />
                </div>
                <p className='content-cross'></p>
            </div>
        </div>
    )
}
export default ContentFirst;