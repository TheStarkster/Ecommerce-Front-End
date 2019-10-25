import React, { Component } from 'react'
import Card from './card'
import BrandStrip from './brandstrip'
import SearchBar from './searchbar'
import Navbar from './master/navbar'
import '../dist/styles/css/home.css'
import axios from 'axios'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ProductsArray: []
        }
        this.componentWillMount = () => {
            axios.get('http://3.87.22.103:2024/User-fetch-products')
                .then(response => {
                    this.setState({
                        ProductsArray: [...response.data.products]
                    })
                })
        }
    }
    RenderProductCards = () => {
        this.ProductCard = []
        this.state.ProductsArray.forEach(element => {
            this.ProductCard.push(
                <Card ProductName={element.name}
                    ProductPrice={element.price}
                    ProductBrand={element.brand}
                    ProductKeyFeatures={element.KeyFeatures}
                    ProductPrimaryFeatures={element.PrimaryFeatures}
                    ProductDescription={element.disc}
                    ProductImage={element.image}
                    ProductMrp={element.mrp}
                    ProductRDL={element.rdl}
                    ProductTags={element.tags}
                    history={this.props.history}
                    ProductID={element._id}
                >
                </Card>
            )
        });
        return this.ProductCard
    }
    render() {
        return (
            <div >
                <Navbar history={this.props.history}></Navbar>
                <div className="Poster">
                    <h1 style={{
                        backgroundColor: '#18c0c961',
                        fontFamily: 'Quicksand-Regular'
                    }}>
                        Welcome To <br /><i>DentalStall</i><br />
                        Your Solgan Goes Here!<br />
                    </h1>
                </div>
                <BrandStrip></BrandStrip>
                <SearchBar></SearchBar>
                <h2 style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%,0%)',
                    fontFamily: 'Quicksand-Regular',
                    color: '#868686',
                }}>Top Products</h2>
                <div className="Home-Root">
                    {this.RenderProductCards()}
                </div>
                <div className="mobile-cart">
                    <img src={require('../dist/assets/icons/icons8-shopping-cart-48.png')} alt="cart"></img>
                    <div className="mobile-cart-noti">0</div>
                </div>
            </div>
        )
    }
}
