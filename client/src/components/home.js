import React, { Component } from 'react'
import Card from './card'
import BrandStrip from './brandstrip'
import SearchBar from './searchbar'
import '../dist/styles/css/home.css'

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="Poster">
                    <h1 style={{
                        position:'relative',
                        fontFamily:'Quicksand-Regular',
                        textAlign:'center',
                        margin:'0px',
                        padding:'18px',
                        paddingBottom:'50px',
                        color:'#292929'
                    }}>
                        DentalStall Helps You, To Make People Smile!
                    </h1>
                </div>
                <BrandStrip></BrandStrip>
                <SearchBar></SearchBar>
                <h2 style={{
                    position: 'absolute',
                    left:'50%',
                    transform:'translate(-50%,0%)',
                    fontFamily: 'Quicksand-Regular',
                    color:'#868686',
                }}>Top Products</h2>
                <div className="Home-Root">
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                </div>
            </div>

        )
    }
}
