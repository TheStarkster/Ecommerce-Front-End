import React, { Component } from 'react'
import '../dist/styles/css/card.css'
import { UserContext } from './master/context/user'

export default class Card extends Component {
    static contextType = UserContext
    render() {
        const { UserData } = this.context
        return (
            <div className="card" onClick={() => {
                this.props.history.push({
                    pathname: '/product',
                    state: {
                        data: {
                            ProductBrand: this.props.ProductBrand,
                            ProductDescription: this.props.ProductDescription,
                            ProductImage: this.props.ProductImage,
                            ProductKeyFeatures: this.props.ProductKeyFeatures,
                            ProductMrp: this.props.ProductMrp,
                            ProductName: this.props.ProductName,
                            ProductPrice: this.props.ProductPrice,
                            ProductPrimaryFeatures: this.props.ProductPrimaryFeatures,
                            ProductRDL: this.props.ProductRDL,
                            ProductTags: this.props.ProductTags,
                            ProductID: this.props.ProductID,
                            UserLoggedIn:UserData === undefined || {} || null ? false : true
                        }
                    }
                })
            }}>
                <img src={this.props.ProductImage} alt="Product"></img>
                <h3>{this.props.ProductName}</h3>
                <h5 style={{ color: "grey" }}>{this.props.ProductDescription}</h5>
                <div className="container">
                    <h5 className="Card-Price">Rs.{this.props.ProductPrice}</h5>
                    <span className="Stock-Status-Span">In Stock</span>
                </div>
            </div>
        )
    }
}
