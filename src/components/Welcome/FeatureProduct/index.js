import React from 'react';
import './styled.scss';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";


const FeatureProduct = (props) => {

    return (
        <div className='container-fearture-product'>
            <div>
                <h1 className="title-feature-product " >Feature Category</h1>
            </div>
            <div className="feature-product uk-position-relative uk-visible-toggle uk-light" uk-slider="autoplay: true">
                <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@m uk-grid">
                    {props.category && props.category.length > 0 && props.category.map((items, index) => {
                        return (
                            <li key={index}>
                                <div className="uk-panel">
                                    <img src={items.image_url_pc} width="400" height="600" alt="" />
                                    <div className="uk-position-center uk-panel">
                                        <Link to={`/collections/${items.slug}`}>
                                            <button className='btn-link'>View more <FaArrowRight className='arrow' /></button>
                                        </Link>
                                    </div>

                                </div>
                            </li>
                        )
                    })}
                </ul>
                <a className="uk-position-center-left uk-position-small uk-hidden-hover" uk-slidenav-previous="true" uk-slider-item="previous" href=""></a>
                <a className="uk-position-center-right uk-position-small uk-hidden-hover" uk-slidenav-next="true" uk-slider-item="next"></a>
            </div>
            <div className='content-empty'></div>
        </div>
    )
}
export default FeatureProduct;