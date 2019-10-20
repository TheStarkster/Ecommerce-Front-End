import React, { Component } from 'react'
import '../dist/styles/css/card.css'

export default class Card extends Component {
    render() {
        return (
            <div className="card">
                <img src="https://media.dentalkart.com/catalog/product/m/i/micro_mega_one_flare_1.jpg" alt="Product"></img>
                <h3>Product Name</h3>
                <h5 style={{color:"grey"}}>Product Brief</h5>
                <div className="container">
                    <h5>Price</h5>
                    <span className="Stock-Status-Span">Stock</span>
                </div>
            </div>
        )
    }
}
