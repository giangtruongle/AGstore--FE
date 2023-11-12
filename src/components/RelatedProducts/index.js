import React from 'react'
import Items from '../Items';
import './styled.scss'

export const RelatedProducts = () => {

    return (
        <div className='related-products'>
            <h1>Related Products</h1>
            <hr />
            <div className='related-items'>
                <Items />
            </div>
        </div>
    )
}
export default RelatedProducts;