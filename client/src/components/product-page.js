import React, { Component } from 'react'
import Navbar from './master/navbar'
import Recommended from './Recommeded'
import axios from 'axios'
import '../dist/styles/css/product-page.css'

export default class ProductPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            SimilarProducts: []
        }
        this.componentWillMount = () => {
            axios.post('http://3.87.22.103:2024/similar-product', {
                tags: this.props.location.state.data.ProductTags
            })
                .then(response => {
                    var i, Temp_SimilarProducts = []
                    for (i = 0; i < response.data.length; i++) {
                        if (response.data[i]._id !== this.props.location.state.data.ProductID) {
                            Temp_SimilarProducts.push(response.data[i])
                        }
                    }
                    this.setState({
                        SimilarProducts:Temp_SimilarProducts
                    })
                })
        }
    }
    RenderPrimaryFeatures() {
        this.PrimaryFeatureArray = []
        this.props.location.state.data.ProductPrimaryFeatures.forEach(element => {
            this.PrimaryFeatureArray.push(
                <li>
                    {element}
                </li>
            )
        })
        return this.PrimaryFeatureArray
    }
    RenderKeyFeatures() {
        this.ProductKeyFeatureArray = []
        this.props.location.state.data.ProductKeyFeatures.forEach(element => {
            this.ProductKeyFeatureArray.push(
                <li>
                    {element}
                </li>
            )
        })
        return this.ProductKeyFeatureArray
    }
    render() {
        return (
            <div>
                <Navbar history={this.props.history}></Navbar>
                <div className="Product-Page-Root">
                    <img src={this.props.location.state.data.ProductImage} alt="Product" className="product-image"></img>
                    By {this.props.location.state.data.ProductBrand}
                    <div className="Product-Detail">
                        <h3>{this.props.location.state.data.ProductName}</h3>
                        <h5>{this.props.location.state.data.ProductDescription}</h5>
                        <div className="small-container">
                            <h4>Rs.{this.props.location.state.data.ProductPrice}</h4>
                            <span className="Stock-Status-Span-Product">In Stock</span>
                        </div>
                        <div className="mrp-container">
                            <s>MRP: Rs.{this.props.location.state.data.ProductMrp}</s>
                        </div>
                    </div>
                    <button>Buy Now</button>
                    <button>Add To Cart</button>
                    <button>Add To Wishlist</button>
                    <div className="Primary-Features">
                        <div className="h4">Primary Features</div>
                        <div className="Feature-Root">
                            <ul>{this.RenderPrimaryFeatures()}</ul>
                        </div>
                    </div>
                    <div className="Primary-Features">
                        <div className="h4">Key Features</div>
                        <div className="Feature-Root">
                            <ul>{this.RenderKeyFeatures()}</ul>
                        </div>
                    </div>
                    <h3>Recommended For You</h3>
                    <div className="recommended-product-container">
                        <Recommended Products={this.state.SimilarProducts} NumberOfCard={2}></Recommended>
                    </div>
                </div>
                <div className="mobile-cart">
                    <img src={require('../dist/assets/icons/icons8-shopping-cart-48.png')} alt="cart"></img>
                    <div className="mobile-cart-noti">0</div>
                </div>
            </div>
        )
    }
}
