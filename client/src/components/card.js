import React, { Component } from 'react'
import '../dist/styles/css/card.css'

export default class Card extends Component {
    render() {
        return (
            <div className="card">
                <img src={this.props.ProductImage} alt="Product"></img>
                <h3>{this.props.ProductName}</h3>
                <h5 style={{color:"grey"}}>{this.props.ProductDescription}</h5>
                <div className="container">
                    <h5 className="Card-Price">Rs.{this.props.ProductPrice}</h5>
                    <span className="Stock-Status-Span">In Stock</span>
                </div>
            </div>
        )
    }
}
