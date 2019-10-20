import React, { Component } from 'react'
import Card from './card'
import BrandStrip from './brandstrip'
import SearchBar from './searchbar'
import '../dist/styles/css/home.css'

export default class Home extends Component {
    render() {
        return (
            <div>
                <BrandStrip></BrandStrip>
                <SearchBar></SearchBar>
                <h2 style={{
                    position: 'absolute',
                    marginLeft: '18px',
                    fontFamily: 'Quicksand-Regular',
                    color:'#3e3e3e'
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
