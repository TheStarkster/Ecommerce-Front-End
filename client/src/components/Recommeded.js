import React from 'react'
import ItemsCarousel from 'react-items-carousel';

export default (props) => {
    const [activeItemIndex, setActiveItemIndex] = React.useState(0);
    const chevronWidth = 40;
    return (
        <div style={{ padding: `0 ${chevronWidth}px` }}>
            <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={props.NumberOfCard}
                gutter={20}
                >
                <div style={{ height: 185, background: '#EEE' }}>Recommended Product</div>
                <div style={{ height: 185, background: '#EEE' }}>Recommended Product</div>
                <div style={{ height: 185, background: '#EEE' }}>Recommended Product</div>
                <div style={{ height: 185, background: '#EEE' }}>Recommended Product</div>
                <div style={{ height: 185, background: '#EEE' }}>Recommended Product</div>
                <div style={{ height: 185, background: '#EEE' }}>Recommended Product</div>
                <div style={{ height: 185, background: '#EEE' }}>Recommended Product</div>
                <div style={{ height: 185, background: '#EEE' }}>Recommended Product</div>
                <div style={{ height: 185, background: '#EEE' }}>Recommended Product</div>
                <div style={{ height: 185, background: '#EEE' }}>Recommended Product</div>
                <div style={{ height: 185, background: '#EEE' }}>Recommended Product</div>
                <div style={{ height: 185, background: '#EEE' }}>Recommended Product</div>
            </ItemsCarousel>
        </div>
    );
};