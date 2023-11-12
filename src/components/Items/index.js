import React, { useEffect, useState } from 'react';
import './styled.scss';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export const Items = () => {

    const [relatedItems, setRelatedItems] = useState([])

    useEffect(() => {
        axios.get(`api/client/v1/list_products`).then((res) => {
            setRelatedItems(res.data.data)
        })
    }, [])

    let scrollContainer = document.querySelector(".wrapper-items");
    let nextButton = document.getElementById("next-btn");
    let backButton = document.getElementById("back-btn");

    if (scrollContainer) {

        nextButton.addEventListener("click", () => {
            scrollContainer.style.scrollBehavior = "smooth";
            scrollContainer.scrollLeft += 220;
        });
        backButton.addEventListener("click", () => {
            scrollContainer.style.scrollBehavior = "smooth";
            scrollContainer.scrollLeft -= 220;
        });

    }
    return (
        <div className='gallery-wrap-items'>
            <FaChevronLeft id='back-btn' />
            <div className='wrapper-items' >
                <div className='items' >
                    {relatedItems && relatedItems.length > 0 && relatedItems.slice(0, 4).map((items, index) => {
                        return (
                            <div key={index}><img src={items.image_url} alt="" />
                                <p>{items.name}</p>
                                <div className='items-price'>
                                    <div className='items-price-new'>
                                        {items.price}.00
                                    </div>
                                    <div className='items-price-old'>
                                        <s>{items.original_price}.00</s>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {relatedItems && relatedItems.length > 0 && relatedItems.slice(4, 8).map((items, index) => {
                        return (
                            <div key={index}><img src={items.image_url} alt="" />
                                <p>{items.name}</p>
                                <div className='items-price'>
                                    <div className='items-price-new'>
                                        {items.price}.00
                                    </div>
                                    <div className='items-price-old'>
                                        <s>{items.original_price}.00</s>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <FaChevronRight id='next-btn' />
        </div>
    )
}
export default Items;
