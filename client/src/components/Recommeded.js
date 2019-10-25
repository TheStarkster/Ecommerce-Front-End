import React from 'react'
import ItemsCarousel from 'react-items-carousel';
import '../dist/styles/css/recommended.css'

export default (props) => {
    const [activeItemIndex, setActiveItemIndex] = React.useState(0);
    const chevronWidth = 40;
    function RenderSimilarProducts() {
        var ProductArray = []
        props.Products.forEach(element => {
            console.log(element)
            ProductArray.push(
                <div style={{ height: 185, background: '#fff' }} className="Rec_Card">
                    <img src={element.image} className="Rec_ProductImage" width='120px' alt="Product"></img>
                    <div className="Rec_details">
                        <h3>{element.name}</h3>
                        <h6 style={{color:'grey'}}>{element.disc}</h6>
                        <s><h6>MRP: Rs.{element.mrp}</h6></s>
                        <div>
                            <h6>Rs.{element.price}</h6>
                            <span>In Stock</span>
                        </div>
                    </div>
                </div>
            )
        })
        return ProductArray
    }
    return (
        <div style={{ padding: `0 ${chevronWidth}px` }}>
            <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={props.NumberOfCard}
                gutter={20}>
                {RenderSimilarProducts()}
            </ItemsCarousel>
        </div>
    );
};