import React, { Component } from 'react'
import Card from './card'
import BrandStrip from './brandstrip'
import SearchBar from './searchbar'
import Navbar from './navbar'
import '../dist/styles/css/home.css'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history}></Navbar>
                <div className="Poster">
                    <h1 style={{
                        backgroundColor:'#18c0c961',
                        fontFamily:'Quicksand-Regular'
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
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                </div>
                <div className="mobile-cart">
                    <img src={require('../dist/assets/icons/icons8-shopping-cart-48.png')} alt="cart"></img>
                    <div className="mobile-cart-noti">0</div>
                </div>
            </div>

        )
    }
}
